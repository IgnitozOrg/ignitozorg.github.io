import type { LatestVideo, LatestVideosErrorCode } from "../types";

const YOUTUBE_API_BASE_URL = "https://www.googleapis.com/youtube/v3";
const IGNITOZ_CHANNEL_HANDLE = "@Ignitoz";
const VIDEO_COUNT = 4;

type Fetcher = typeof fetch;

type GetLatestVideosOptions = {
  apiKey?: string;
  channelHandle?: string;
  fetcher?: Fetcher;
};

type YouTubeThumbnail = {
  url?: unknown;
};

type YouTubePlaylistItem = {
  snippet?: {
    title?: unknown;
    publishedAt?: unknown;
    resourceId?: {
      videoId?: unknown;
    };
    thumbnails?: Record<string, YouTubeThumbnail>;
  };
};

type YouTubeItemsResponse<T> = {
  items?: T[];
};

export class LatestVideosError extends Error {
  constructor(
    message: string,
    public readonly code: LatestVideosErrorCode,
  ) {
    super(message);
    this.name = "LatestVideosError";
  }
}

export async function getLatestVideos(
  options: GetLatestVideosOptions = {},
): Promise<LatestVideo[]> {
  const apiKey = options.apiKey ?? import.meta.env.VITE_YOUTUBE_API_KEY;
  const fetcher = options.fetcher ?? fetch;
  const channelHandle = options.channelHandle ?? IGNITOZ_CHANNEL_HANDLE;

  if (!apiKey?.trim()) {
    throw new LatestVideosError("YouTube API key is not configured.", "missing-api-key");
  }

  const uploadsPlaylistId = await resolveUploadsPlaylistId(fetcher, apiKey, channelHandle);
  const playlistItems = await fetchPlaylistItems(fetcher, apiKey, uploadsPlaylistId);

  return playlistItems
    .map(normalizePlaylistItem)
    .filter((video): video is LatestVideo => video !== null);
}

async function resolveUploadsPlaylistId(
  fetcher: Fetcher,
  apiKey: string,
  channelHandle: string,
): Promise<string> {
  const url = buildYouTubeUrl("channels", {
    part: "contentDetails",
    forHandle: channelHandle,
    key: apiKey,
  });
  const data = await fetchYouTubeJson<YouTubeItemsResponse<unknown>>(fetcher, url);

  if (!Array.isArray(data.items)) {
    throw new LatestVideosError("YouTube channel response was not valid.", "malformed-response");
  }

  const firstChannel = data.items[0] as
    | { contentDetails?: { relatedPlaylists?: { uploads?: unknown } } }
    | undefined;
  const uploadsPlaylistId = firstChannel?.contentDetails?.relatedPlaylists?.uploads;

  if (typeof uploadsPlaylistId !== "string" || uploadsPlaylistId.length === 0) {
    throw new LatestVideosError(
      "Ignitoz uploads playlist could not be resolved.",
      "malformed-response",
    );
  }

  return uploadsPlaylistId;
}

async function fetchPlaylistItems(fetcher: Fetcher, apiKey: string, playlistId: string) {
  const url = buildYouTubeUrl("playlistItems", {
    part: "snippet",
    playlistId,
    maxResults: String(VIDEO_COUNT),
    key: apiKey,
  });
  const data = await fetchYouTubeJson<YouTubeItemsResponse<YouTubePlaylistItem>>(fetcher, url);

  if (!Array.isArray(data.items)) {
    throw new LatestVideosError("YouTube playlist response was not valid.", "malformed-response");
  }

  return data.items;
}

async function fetchYouTubeJson<T>(fetcher: Fetcher, url: URL): Promise<T> {
  const response = await fetcher(url);

  if (!response.ok) {
    throw new LatestVideosError("YouTube request failed.", "api-error");
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new LatestVideosError("YouTube response could not be parsed.", "malformed-response");
  }
}

function normalizePlaylistItem(item: YouTubePlaylistItem): LatestVideo | null {
  const snippet = item.snippet;
  const videoId = snippet?.resourceId?.videoId;
  const title = snippet?.title;
  const publishedAt = snippet?.publishedAt;
  const thumbnailUrl = selectThumbnailUrl(snippet?.thumbnails);

  if (
    typeof videoId !== "string" ||
    typeof title !== "string" ||
    typeof publishedAt !== "string" ||
    typeof thumbnailUrl !== "string"
  ) {
    return null;
  }

  return {
    id: videoId,
    title,
    publishedAt,
    thumbnailUrl,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

function selectThumbnailUrl(thumbnails: Record<string, YouTubeThumbnail> | undefined) {
  if (!thumbnails) {
    return undefined;
  }

  for (const key of ["maxres", "standard", "high", "medium", "default"]) {
    const url = thumbnails[key]?.url;

    if (typeof url === "string" && url.length > 0) {
      return url;
    }
  }

  return undefined;
}

function buildYouTubeUrl(path: string, params: Record<string, string>) {
  const url = new URL(`${YOUTUBE_API_BASE_URL}/${path}`);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  return url;
}
