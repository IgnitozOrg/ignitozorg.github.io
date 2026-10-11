import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VideoCard from "./video-card.vue";

describe("VideoCard", () => {
  it.each([
    "First video",
    "A very long video title ".repeat(20),
  ])("renders independently with title %s", (title) => {
    const video = {
      id: title,
      title,
      thumbnailUrl: "https://example.com/thumbnail.jpg",
      url: "https://www.youtube.com/watch?v=example",
      publishedAt: "2026-10-11",
    };
    const wrapper = mount(VideoCard, { props: { video } });
    expect(wrapper.get(".video-card__title").text()).toBe(title.trim());
    expect(wrapper.attributes("aria-label")).toBe(`Ver ${title} en YouTube`);
    expect(wrapper.attributes("href")).toBe(video.url);
    expect(wrapper.attributes("target")).toBe("_blank");
    expect(wrapper.attributes("rel")).toBe("noopener noreferrer");
    expect(wrapper.get(".video-card__thumbnail").attributes("src")).toBe(video.thumbnailUrl);
    expect(wrapper.get(".video-card__play").attributes("aria-hidden")).toBe("true");
  });
});
