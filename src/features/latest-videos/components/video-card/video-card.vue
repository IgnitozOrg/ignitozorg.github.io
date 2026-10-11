<script setup lang="ts">
import playIcon from "../../../../assets/icons/video-play.svg";
import type { LatestVideo } from "../../types";

defineProps<{ video: LatestVideo }>();
</script>

<template>
  <a
    class="video-card"
    :href="video.url"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`Ver ${video.title} en YouTube`"
  >
    <div class="video-card__media">
      <img
        class="video-card__thumbnail"
        :src="video.thumbnailUrl"
        :alt="video.title"
        loading="lazy"
      >
      <span class="video-card__play" aria-hidden="true"> <img :src="playIcon" alt=""> </span>
    </div>
    <p class="video-card__title">{{ video.title }}</p>
  </a>
</template>

<style scoped src="./video-card.css"></style>
