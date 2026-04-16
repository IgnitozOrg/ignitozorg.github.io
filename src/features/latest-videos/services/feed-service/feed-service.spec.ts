import { describe, expect, it, vi } from "vitest";
import { fetchLatestVideos, LATEST_VIDEOS_FEED_URL, type FeedFetcher } from "./feed-service";

const createFeed = (entries: string) => `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns="http://www.w3.org/2005/Atom">
  ${entries}
</feed>`;

const createEntry = (videoId: string, title: string, publishedAt: string) => `
  <entry>
    <yt:videoId>${videoId}</yt:videoId>
    <title>${title}</title>
    <link rel="alternate" href="https://www.youtube.com/watch?v=${videoId}" />
    <published>${publishedAt}</published>
    <media:group>
      <media:thumbnail url="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" />
    </media:group>
  </entry>
`;

describe("fetchLatestVideos", () => {
  it("fetches the public feed and returns the four newest videos first", async () => {
    const fetcher = vi.fn<FeedFetcher>().mockResolvedValue({
      ok: true,
      status: 200,
      text: async () =>
        createFeed(`
          ${createEntry("oldest", "Oldest", "2026-04-10T10:00:00+00:00")}
          ${createEntry("newest", "Newest", "2026-04-14T10:00:00+00:00")}
          ${createEntry("middle", "Middle", "2026-04-12T10:00:00+00:00")}
          ${createEntry("second-newest", "Second Newest", "2026-04-13T10:00:00+00:00")}
          ${createEntry("fifth", "Fifth", "2026-04-09T10:00:00+00:00")}
        `),
    });

    const videos = await fetchLatestVideos({ fetcher });

    expect(fetcher).toHaveBeenCalledWith(LATEST_VIDEOS_FEED_URL);
    expect(videos.map((video) => video.id)).toEqual([
      "newest",
      "second-newest",
      "middle",
      "oldest",
    ]);
  });

  it("throws when the feed request fails", async () => {
    const fetcher = vi.fn<FeedFetcher>().mockResolvedValue({
      ok: false,
      status: 503,
      text: async () => "",
    });

    await expect(fetchLatestVideos({ fetcher })).rejects.toThrow(
      "Unable to fetch latest videos feed. Status: 503",
    );
  });
});
