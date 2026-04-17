import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LatestVideosSection from "./latest-videos-section.vue";

const serviceMocks = vi.hoisted(() => ({
  getLatestVideos: vi.fn(),
}));

vi.mock("../services/youtube-videos", () => serviceMocks);

const videos = [
  {
    id: "video-1",
    title: "Ignitoz video one",
    thumbnailUrl: "https://img.youtube.com/video-1/maxres.jpg",
    publishedAt: "2026-04-17T10:00:00Z",
    url: "https://www.youtube.com/watch?v=video-1",
  },
  {
    id: "video-2",
    title: "Ignitoz video two",
    thumbnailUrl: "https://img.youtube.com/video-2/maxres.jpg",
    publishedAt: "2026-04-16T10:00:00Z",
    url: "https://www.youtube.com/watch?v=video-2",
  },
];

describe("LatestVideosSection", () => {
  beforeEach(() => {
    serviceMocks.getLatestVideos.mockReset();
  });

  it("renders the loading state while videos are being requested", () => {
    serviceMocks.getLatestVideos.mockReturnValue(new Promise(() => undefined));

    const wrapper = mount(LatestVideosSection);

    expect(wrapper.find("h2").text()).toBe("Últimos videos");
    expect(wrapper.find('[aria-label="Cargando videos recientes"]').exists()).toBe(true);
    expect(wrapper.findAll(".latest-videos__tile--loading")).toHaveLength(4);
  });

  it("renders fetched thumbnails and links to the corresponding YouTube videos", async () => {
    serviceMocks.getLatestVideos.mockResolvedValue(videos);

    const wrapper = mount(LatestVideosSection);
    await flushPromises();

    const links = wrapper.findAll("a.latest-videos__tile");
    const images = wrapper.findAll("img.latest-videos__thumbnail");

    expect(links).toHaveLength(2);
    expect(links[0]?.attributes("href")).toBe("https://www.youtube.com/watch?v=video-1");
    expect(links[0]?.attributes("target")).toBe("_blank");
    expect(links[0]?.attributes("rel")).toBe("noopener noreferrer");
    expect(images[0]?.attributes("src")).toBe("https://img.youtube.com/video-1/maxres.jpg");
    expect(images[0]?.attributes("alt")).toBe("Ignitoz video one");
    expect(images[1]?.attributes("src")).toBe("https://img.youtube.com/video-2/maxres.jpg");
  });

  it("renders an empty state without fake video links", async () => {
    serviceMocks.getLatestVideos.mockResolvedValue([]);

    const wrapper = mount(LatestVideosSection);
    await flushPromises();

    expect(wrapper.text()).toContain("Todavía no hay videos públicos recientes para mostrar.");
    expect(wrapper.find("a.latest-videos__tile").exists()).toBe(false);
    expect(wrapper.find("img.latest-videos__thumbnail").exists()).toBe(false);
  });

  it("renders an understandable error state without fake video links", async () => {
    serviceMocks.getLatestVideos.mockRejectedValue(new Error("YouTube API key is not configured."));

    const wrapper = mount(LatestVideosSection);
    await flushPromises();

    expect(wrapper.text()).toContain("No se pudieron cargar los últimos videos.");
    expect(wrapper.text()).toContain("YouTube API key is not configured.");
    expect(wrapper.find("a.latest-videos__tile").exists()).toBe(false);
    expect(wrapper.find("img.latest-videos__thumbnail").exists()).toBe(false);
  });
});
