<script setup lang="ts">
import { computed } from "vue";
import { useLatestVideos } from "../composables/use-latest-videos";

const { errorMessage, status, videos } = useLatestVideos();

const isLoading = computed(() => status.value === "loading");
const isEmpty = computed(() => status.value === "empty");
const hasError = computed(() => status.value === "error");
</script>

<template>
  <section class="latest-videos" aria-labelledby="latest-videos-title">
    <h2 class="latest-videos__title" id="latest-videos-title">Últimos videos</h2>

    <div v-if="isLoading" class="latest-videos__grid" aria-label="Cargando videos recientes">
      <div v-for="item in 4" :key="item" class="latest-videos__tile latest-videos__tile--loading">
        <span class="latest-videos__loading-mark" aria-hidden="true"></span>
      </div>
    </div>

    <div v-else-if="videos.length > 0" class="latest-videos__grid">
      <a
        v-for="video in videos"
        :key="video.id"
        class="latest-videos__tile latest-videos__tile--link"
        :href="video.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Ver ${video.title} en YouTube`"
      >
        <img
          class="latest-videos__thumbnail"
          :src="video.thumbnailUrl"
          :alt="video.title"
          loading="lazy"
        >
        <span class="latest-videos__sr-only">Ver {{ video.title }} en YouTube</span>
      </a>
    </div>

    <p v-else-if="isEmpty" class="latest-videos__message">
      Todavía no hay videos públicos recientes para mostrar.
    </p>

    <p v-else-if="hasError" class="latest-videos__message" role="status">
      No se pudieron cargar los últimos videos.
      <span v-if="errorMessage" class="latest-videos__message-detail">{{ errorMessage }}</span>
    </p>
  </section>
</template>

<style scoped src="./latest-videos-section.css"></style>
