import type { LatestVideo } from "../../types/types";

const YOUTUBE_THUMBNAIL_BASE_URL = "https://i.ytimg.com/vi";

function getElementsByLocalName(parent: ParentNode, localName: string): Element[] {
  return Array.from(parent.querySelectorAll("*")).filter(
    (element) => element.localName === localName,
  );
}

function getFirstText(parent: ParentNode, localName: string): string | undefined {
  return getElementsByLocalName(parent, localName)[0]?.textContent?.trim();
}

function getAlternateVideoUrl(entry: Element): string | undefined {
  return getElementsByLocalName(entry, "link")
    .find((link) => link.getAttribute("rel") === "alternate")
    ?.getAttribute("href")
    ?.trim();
}

function getThumbnailUrl(entry: Element, videoId: string): string {
  const feedThumbnailUrl = getElementsByLocalName(entry, "thumbnail")
    .find((thumbnail) => thumbnail.getAttribute("url"))
    ?.getAttribute("url")
    ?.trim();

  return (
    feedThumbnailUrl || `${YOUTUBE_THUMBNAIL_BASE_URL}/${encodeURIComponent(videoId)}/hqdefault.jpg`
  );
}

function isValidDate(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

export function parseYouTubeFeed(feedXml: string): LatestVideo[] {
  const document = new DOMParser().parseFromString(feedXml, "application/xml");
  const parserError = document.querySelector("parsererror");

  if (parserError) {
    throw new Error("Unable to parse latest videos feed XML.");
  }

  return getElementsByLocalName(document, "entry").flatMap((entry) => {
    const videoId = getFirstText(entry, "videoId");
    const title = getFirstText(entry, "title");
    const publishedAt = getFirstText(entry, "published");

    if (!videoId || !title || !publishedAt || !isValidDate(publishedAt)) {
      return [];
    }

    return [
      {
        id: videoId,
        title,
        url:
          getAlternateVideoUrl(entry) ||
          `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`,
        thumbnailUrl: getThumbnailUrl(entry, videoId),
        publishedAt,
      },
    ];
  });
}
