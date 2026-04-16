<script setup lang="ts">
import { computed } from "vue";
import { useLatestVideos } from "../../composables/use-latest-videos/use-latest-videos";

const { status, videos } = useLatestVideos();

const visibleVideos = computed(() => videos.value.slice(0, 4));
const hasVideos = computed(() => status.value === "loaded" && visibleVideos.value.length > 0);
const statusMessage = computed(() =>
  status.value === "loading"
    ? "Cargando videos recientes..."
    : "Los videos recientes no están disponibles por ahora.",
);
</script>

<template>
  <section class="latest-videos" aria-labelledby="latest-videos-title">
    <div class="latest-videos-header">
      <p class="latest-videos-kicker">Contenido reciente</p>
      <h2 id="latest-videos-title" class="latest-videos-title">Últimos videos</h2>
    </div>

    <div v-if="hasVideos" class="latest-videos-grid">
      <a
        v-for="video in visibleVideos"
        :key="video.id"
        class="latest-video-card"
        :href="video.url"
        target="_blank"
        rel="noreferrer"
        :aria-label="`Ver video: ${video.title}`"
      >
        <span class="latest-video-thumb" aria-hidden="true">
          <img :src="video.thumbnailUrl" :alt="video.title" loading="lazy" decoding="async">
        </span>
        <span class="latest-video-title">{{ video.title }}</span>
      </a>
    </div>

    <div v-else class="latest-videos-fallback">
      <div class="latest-videos-grid" aria-hidden="true">
        <article
          v-for="placeholderIndex in 4"
          :key="placeholderIndex"
          class="latest-video-card latest-video-card--placeholder"
        >
          <span class="latest-video-thumb latest-video-thumb--placeholder" />
          <span class="latest-video-title latest-video-title--placeholder" />
        </article>
      </div>
      <p class="latest-videos-status" role="status" aria-live="polite">{{ statusMessage }}</p>
    </div>
  </section>
</template>

<style scoped src="./latest-videos-section.css"></style>
