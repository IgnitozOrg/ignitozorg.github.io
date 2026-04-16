import { parseYouTubeFeed } from "../../utils/feed-parser/feed-parser";
import type { LatestVideo } from "../../types/types";

export const LATEST_VIDEOS_FEED_URL =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCRHuQfhjw1c2JkxS6jAGfKg";

export interface FeedResponse {
  ok: boolean;
  status: number;
  text: () => Promise<string>;
}

export type FeedFetcher = (url: string) => Promise<FeedResponse>;

export interface FetchLatestVideosOptions {
  fetcher?: FeedFetcher;
  feedUrl?: string;
  limit?: number;
}

const defaultFetcher: FeedFetcher = (url) => fetch(url);

function sortNewestFirst(videos: LatestVideo[]): LatestVideo[] {
  return [...videos].sort(
    (firstVideo, secondVideo) =>
      Date.parse(secondVideo.publishedAt) - Date.parse(firstVideo.publishedAt),
  );
}

export async function fetchLatestVideos({
  fetcher = defaultFetcher,
  feedUrl = LATEST_VIDEOS_FEED_URL,
  limit = 4,
}: FetchLatestVideosOptions = {}): Promise<LatestVideo[]> {
  const response = await fetcher(feedUrl);

  if (!response.ok) {
    throw new Error(`Unable to fetch latest videos feed. Status: ${response.status}`);
  }

  const feedXml = await response.text();
  return sortNewestFirst(parseYouTubeFeed(feedXml)).slice(0, limit);
}
