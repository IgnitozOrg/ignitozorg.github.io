import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";
import { useLatestVideos, type LatestVideosLoader } from "./use-latest-videos";
import type { LatestVideo } from "../../types/types";

const createVideo = (id: string): LatestVideo => ({
  id,
  title: `Video ${id}`,
  url: `https://www.youtube.com/watch?v=${id}`,
  thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  publishedAt: "2026-04-14T10:00:00+00:00",
});

const createHarness = (loader: LatestVideosLoader, immediate = true) =>
  defineComponent({
    setup() {
      return useLatestVideos({ loader, immediate });
    },
    template: "<div />",
  });

describe("useLatestVideos", () => {
  it("loads videos on mount by default", async () => {
    const loader = vi.fn<LatestVideosLoader>().mockResolvedValue([createVideo("newest")]);
    const wrapper = mount(createHarness(loader));

    await nextTick();
    await nextTick();

    expect(loader).toHaveBeenCalledOnce();
    expect(wrapper.vm.status).toBe("loaded");
    expect(wrapper.vm.videos).toEqual([createVideo("newest")]);
  });

  it("allows manual loading when immediate is disabled", async () => {
    const loader = vi.fn<LatestVideosLoader>().mockResolvedValue([]);
    const wrapper = mount(createHarness(loader, false));

    expect(loader).not.toHaveBeenCalled();

    await wrapper.vm.load();

    expect(loader).toHaveBeenCalledOnce();
    expect(wrapper.vm.status).toBe("unavailable");
    expect(wrapper.vm.videos).toEqual([]);
  });

  it("marks videos as unavailable when loading fails", async () => {
    const error = new Error("Feed unavailable");
    const loader = vi.fn<LatestVideosLoader>().mockRejectedValue(error);
    const wrapper = mount(createHarness(loader, false));

    await wrapper.vm.load();

    expect(wrapper.vm.status).toBe("unavailable");
    expect(wrapper.vm.videos).toEqual([]);
    expect(wrapper.vm.error).toBe(error);
  });
});
