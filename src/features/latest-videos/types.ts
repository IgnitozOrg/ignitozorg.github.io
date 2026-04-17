export type LatestVideo = {
  id: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  url: string;
};

export type LatestVideosErrorCode = "missing-api-key" | "api-error" | "malformed-response";
