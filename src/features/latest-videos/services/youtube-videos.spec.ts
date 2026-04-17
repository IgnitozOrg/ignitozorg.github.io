import { describe, expect, it, vi } from "vitest";
import { getLatestVideos, type LatestVideosError } from "./youtube-videos";

const apiKey = "test-api-key";

function createResponse(body: unknown, ok = true) {
  return {
    ok,
    json: vi.fn(async () => body),
  } as unknown as Response;
}

function createRejectingJsonResponse() {
  return {
    ok: true,
    json: vi.fn(async () => {
      throw new Error("Invalid JSON");
    }),
  } as unknown as Response;
}

function createPlaylistItem(
  videoId: string,
  overrides: {
    title?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url: string }>;
  } = {},
) {
  return {
    snippet: {
      title: overrides.title ?? `Video ${videoId}`,
      publishedAt: overrides.publishedAt ?? "2026-04-17T10:00:00Z",
      resourceId: {
        videoId,
      },
      thumbnails: overrides.thumbnails ?? {
        medium: { url: `https://img.youtube.com/${videoId}/medium.jpg` },
        high: { url: `https://img.youtube.com/${videoId}/high.jpg` },
      },
    },
  };
}

function createChannelResponse(playlistId = "UUignitozUploads") {
  return {
    items: [
      {
        contentDetails: {
          relatedPlaylists: {
            uploads: playlistId,
          },
        },
      },
    ],
  };
}

describe("getLatestVideos", () => {
  it("resolves the channel uploads playlist and returns normalized newest videos", async () => {
    const fetcherMock = vi
      .fn()
      .mockResolvedValueOnce(createResponse(createChannelResponse()))
      .mockResolvedValueOnce(
        createResponse({
          items: [
            createPlaylistItem("video-1", {
              title: "Newest video",
              thumbnails: {
                default: { url: "https://img.youtube.com/video-1/default.jpg" },
                maxres: { url: "https://img.youtube.com/video-1/maxres.jpg" },
              },
            }),
            createPlaylistItem("video-2", {
              title: "Second video",
              publishedAt: "2026-04-16T09:00:00Z",
            }),
          ],
        }),
      );

    const videos = await getLatestVideos({
      apiKey,
      fetcher: fetcherMock as unknown as typeof fetch,
    });

    const channelUrl = fetcherMock.mock.calls[0]?.[0] as URL;
    const playlistUrl = fetcherMock.mock.calls[1]?.[0] as URL;

    expect(channelUrl.pathname).toBe("/youtube/v3/channels");
    expect(channelUrl.searchParams.get("part")).toBe("contentDetails");
    expect(channelUrl.searchParams.get("forHandle")).toBe("@Ignitoz");
    expect(channelUrl.searchParams.get("key")).toBe(apiKey);
    expect(playlistUrl.pathname).toBe("/youtube/v3/playlistItems");
    expect(playlistUrl.searchParams.get("part")).toBe("snippet");
    expect(playlistUrl.searchParams.get("playlistId")).toBe("UUignitozUploads");
    expect(playlistUrl.searchParams.get("maxResults")).toBe("4");
    expect(videos).toEqual([
      {
        id: "video-1",
        title: "Newest video",
        thumbnailUrl: "https://img.youtube.com/video-1/maxres.jpg",
        publishedAt: "2026-04-17T10:00:00Z",
        url: "https://www.youtube.com/watch?v=video-1",
      },
      {
        id: "video-2",
        title: "Second video",
        thumbnailUrl: "https://img.youtube.com/video-2/high.jpg",
        publishedAt: "2026-04-16T09:00:00Z",
        url: "https://www.youtube.com/watch?v=video-2",
      },
    ]);
  });

  it("allows fewer than four real videos without adding filler content", async () => {
    const fetcherMock = vi
      .fn()
      .mockResolvedValueOnce(createResponse(createChannelResponse()))
      .mockResolvedValueOnce(createResponse({ items: [createPlaylistItem("only-video")] }));

    const videos = await getLatestVideos({
      apiKey,
      fetcher: fetcherMock as unknown as typeof fetch,
    });

    expect(videos).toHaveLength(1);
    expect(videos[0]?.id).toBe("only-video");
  });

  it("returns an empty list when the uploads playlist has no items", async () => {
    const fetcherMock = vi
      .fn()
      .mockResolvedValueOnce(createResponse(createChannelResponse()))
      .mockResolvedValueOnce(createResponse({ items: [] }));

    await expect(
      getLatestVideos({ apiKey, fetcher: fetcherMock as unknown as typeof fetch }),
    ).resolves.toEqual([]);
  });

  it("rejects when the API key is missing", async () => {
    await expect(getLatestVideos({ apiKey: "" })).rejects.toMatchObject({
      code: "missing-api-key",
    } satisfies Partial<LatestVideosError>);
  });

  it("rejects when YouTube returns an error response", async () => {
    const fetcherMock = vi.fn().mockResolvedValueOnce(createResponse({ error: {} }, false));

    await expect(
      getLatestVideos({ apiKey, fetcher: fetcherMock as unknown as typeof fetch }),
    ).rejects.toMatchObject({
      code: "api-error",
    } satisfies Partial<LatestVideosError>);
  });

  it("rejects malformed channel responses", async () => {
    const fetcherMock = vi.fn().mockResolvedValueOnce(createResponse({ items: [{}] }));

    await expect(
      getLatestVideos({ apiKey, fetcher: fetcherMock as unknown as typeof fetch }),
    ).rejects.toMatchObject({
      code: "malformed-response",
    } satisfies Partial<LatestVideosError>);
  });

  it("rejects malformed playlist responses", async () => {
    const fetcherMock = vi
      .fn()
      .mockResolvedValueOnce(createResponse(createChannelResponse()))
      .mockResolvedValueOnce(createResponse({}));

    await expect(
      getLatestVideos({ apiKey, fetcher: fetcherMock as unknown as typeof fetch }),
    ).rejects.toMatchObject({
      code: "malformed-response",
    } satisfies Partial<LatestVideosError>);
  });

  it("rejects JSON parsing failures", async () => {
    const fetcherMock = vi.fn().mockResolvedValueOnce(createRejectingJsonResponse());

    await expect(
      getLatestVideos({ apiKey, fetcher: fetcherMock as unknown as typeof fetch }),
    ).rejects.toMatchObject({
      code: "malformed-response",
    } satisfies Partial<LatestVideosError>);
  });
});
