import { onMounted, ref } from "vue";
import { fetchLatestVideos } from "../../services/feed-service/feed-service";
import type { LatestVideo } from "../../types/types";

export type LatestVideosStatus = "loading" | "loaded" | "unavailable";
export type LatestVideosLoader = () => Promise<LatestVideo[]>;

export interface UseLatestVideosOptions {
  loader?: LatestVideosLoader;
  immediate?: boolean;
}

export function useLatestVideos({
  loader = fetchLatestVideos,
  immediate = true,
}: UseLatestVideosOptions = {}) {
  const status = ref<LatestVideosStatus>("loading");
  const videos = ref<LatestVideo[]>([]);
  const error = ref<unknown>(null);

  const load = async () => {
    status.value = "loading";
    error.value = null;

    try {
      const latestVideos = await loader();
      videos.value = latestVideos;
      status.value = latestVideos.length > 0 ? "loaded" : "unavailable";
    } catch (caughtError) {
      videos.value = [];
      error.value = caughtError;
      status.value = "unavailable";
    }
  };

  onMounted(() => {
    if (immediate) {
      void load();
    }
  });

  return {
    status,
    videos,
    error,
    load,
  };
}
