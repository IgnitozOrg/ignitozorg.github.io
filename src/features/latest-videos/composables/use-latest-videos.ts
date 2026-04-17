import { onMounted, ref } from "vue";
import type { LatestVideo } from "../types";
import { getLatestVideos } from "../services/youtube-videos";

export type LatestVideosStatus = "loading" | "success" | "empty" | "error";

type LatestVideosLoader = () => Promise<LatestVideo[]>;

export function useLatestVideos(loader: LatestVideosLoader = getLatestVideos) {
  const status = ref<LatestVideosStatus>("loading");
  const videos = ref<LatestVideo[]>([]);
  const errorMessage = ref("");

  async function load() {
    status.value = "loading";
    errorMessage.value = "";

    try {
      const latestVideos = await loader();
      videos.value = latestVideos;
      status.value = latestVideos.length > 0 ? "success" : "empty";
    } catch (error) {
      videos.value = [];
      status.value = "error";
      errorMessage.value =
        error instanceof Error ? error.message : "No se pudieron cargar los videos.";
    }
  }

  onMounted(() => {
    void load();
  });

  return {
    errorMessage,
    load,
    status,
    videos,
  };
}
