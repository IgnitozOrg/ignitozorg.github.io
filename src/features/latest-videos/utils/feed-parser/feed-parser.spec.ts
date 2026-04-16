import { describe, expect, it } from "vitest";
import { parseYouTubeFeed } from "./feed-parser";

const createFeed = (entries: string) => `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns="http://www.w3.org/2005/Atom">
  ${entries}
</feed>`;

describe("parseYouTubeFeed", () => {
  it("extracts normalized video items from Atom entries", () => {
    const videos = parseYouTubeFeed(
      createFeed(`
        <entry>
          <yt:videoId>abc123</yt:videoId>
          <title>First video</title>
          <link rel="alternate" href="https://www.youtube.com/watch?v=abc123" />
          <published>2026-04-12T10:00:00+00:00</published>
          <media:group>
            <media:thumbnail url="https://i.ytimg.com/vi/abc123/hqdefault.jpg" />
          </media:group>
        </entry>
      `),
    );

    expect(videos).toEqual([
      {
        id: "abc123",
        title: "First video",
        url: "https://www.youtube.com/watch?v=abc123",
        thumbnailUrl: "https://i.ytimg.com/vi/abc123/hqdefault.jpg",
        publishedAt: "2026-04-12T10:00:00+00:00",
      },
    ]);
  });

  it("derives a YouTube thumbnail when the feed entry does not include one", () => {
    const videos = parseYouTubeFeed(
      createFeed(`
        <entry>
          <yt:videoId>missing-thumb</yt:videoId>
          <title>Fallback thumbnail</title>
          <link rel="alternate" href="https://www.youtube.com/watch?v=missing-thumb" />
          <published>2026-04-13T10:00:00+00:00</published>
        </entry>
      `),
    );

    expect(videos[0]?.thumbnailUrl).toBe("https://i.ytimg.com/vi/missing-thumb/hqdefault.jpg");
  });

  it("skips entries that are missing required video metadata", () => {
    const videos = parseYouTubeFeed(
      createFeed(`
        <entry>
          <title>No video id</title>
          <published>2026-04-13T10:00:00+00:00</published>
        </entry>
      `),
    );

    expect(videos).toEqual([]);
  });
});
