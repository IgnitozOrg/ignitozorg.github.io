<script setup lang="ts">
const {
  href,
  variant = "accent",
  target,
  rel,
  ariaLabel,
} = defineProps<{
  href: string;
  variant?: "accent" | "ghost";
  target?: string;
  rel?: string;
  ariaLabel?: string;
}>();
</script>

<template>
  <!-- biome-ignore lint/a11y/useAnchorContent: Link text is provided by component slot content. -->
  <a
    :href="href"
    :target="target"
    :rel="rel"
    :aria-label="ariaLabel"
    class="btn"
    :class="`btn--${variant}`"
  >
    <slot />
  </a>
</template>

<style scoped src="./base-button.css"></style>
