import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import LatestVideosSection from "./latest-videos-section.vue";
import type { LatestVideo } from "../../types/types";

const latestVideosState = vi.hoisted(() => ({
  status: "loaded",
  videos: [] as LatestVideo[],
}));

vi.mock("../../composables/use-latest-videos/use-latest-videos", () => ({
  useLatestVideos: () => ({
    status: ref(latestVideosState.status),
    videos: ref(latestVideosState.videos),
    error: ref(null),
    load: vi.fn(),
  }),
}));

const createVideo = (id: string, title: string, publishedAt: string): LatestVideo => ({
  id,
  title,
  url: `https://www.youtube.com/watch?v=${id}`,
  thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  publishedAt,
});

describe("LatestVideosSection", () => {
  it("renders the latest videos label and four video links in provided order", () => {
    latestVideosState.status = "loaded";
    latestVideosState.videos = [
      createVideo("newest", "Newest upload", "2026-04-14T10:00:00+00:00"),
      createVideo("second", "Second upload", "2026-04-13T10:00:00+00:00"),
      createVideo("third", "Third upload", "2026-04-12T10:00:00+00:00"),
      createVideo("fourth", "Fourth upload", "2026-04-11T10:00:00+00:00"),
      createVideo("fifth", "Fifth upload", "2026-04-10T10:00:00+00:00"),
    ];

    const wrapper = mount(LatestVideosSection);
    const links = wrapper.findAll("a.latest-video-card");

    expect(wrapper.text()).toContain("Últimos videos");
    expect(links).toHaveLength(4);
    expect(links.map((link) => link.text())).toEqual([
      "Newest upload",
      "Second upload",
      "Third upload",
      "Fourth upload",
    ]);
  });

  it("renders thumbnails and corresponding YouTube links for each video", () => {
    latestVideosState.status = "loaded";
    latestVideosState.videos = [
      createVideo("newest", "Newest upload", "2026-04-14T10:00:00+00:00"),
      createVideo("second", "Second upload", "2026-04-13T10:00:00+00:00"),
      createVideo("third", "Third upload", "2026-04-12T10:00:00+00:00"),
      createVideo("fourth", "Fourth upload", "2026-04-11T10:00:00+00:00"),
    ];

    const wrapper = mount(LatestVideosSection);
    const links = wrapper.findAll("a.latest-video-card");
    const images = wrapper.findAll("img");

    expect(images).toHaveLength(4);
    expect(images[0]?.attributes("src")).toBe("https://i.ytimg.com/vi/newest/hqdefault.jpg");
    expect(links[0]?.attributes("href")).toBe("https://www.youtube.com/watch?v=newest");
    expect(links[0]?.attributes("aria-label")).toBe("Ver video: Newest upload");
  });

  it("renders a non-broken unavailable state without video anchors", () => {
    latestVideosState.status = "unavailable";
    latestVideosState.videos = [];

    const wrapper = mount(LatestVideosSection);

    expect(wrapper.findAll("a.latest-video-card")).toHaveLength(0);
    expect(wrapper.text()).toContain("Los videos recientes no están disponibles por ahora.");
  });
});
