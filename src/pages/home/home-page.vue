<script setup lang="ts">
import BaseButton from "../../components/base-button/base-button.vue";
</script>

<template>
  <div class="landing-shell">
    <header class="landing-header">
      <nav class="landing-nav" aria-label="Principal">
        <a class="landing-brand" href="/" aria-label="Ignitoz, ir al inicio">
          <span class="landing-brand-text">IGNITOZ</span>
        </a>

        <BaseButton
          href="https://www.youtube.com/@Ignitoz?sub_confirmation=1"
          target="_blank"
          rel="noreferrer"
          aria-label="Suscríbete a Ignitoz en YouTube"
        >
          Suscríbete
        </BaseButton>
      </nav>
    </header>

    <main class="landing-main">
      <section class="landing-hero" aria-labelledby="landing-title">
        <div class="landing-hero-inner">
          <h1 class="landing-hero-title" id="landing-title">
            IA, herramientas, código, modelos e
            <span class="landing-accent">innovación</span>
          </h1>

          <p class="landing-hero-description">
            En el canal comparto mi experiencia e información sobre herramientas, programación,
            modelos de IA y experimentación aplicada.
          </p>

          <div class="landing-actions">
            <BaseButton
              variant="ghost"
              href="https://www.youtube.com/@Ignitoz"
              target="_blank"
              rel="noreferrer"
              aria-label="Ver canal de Ignitoz en YouTube"
            >
              <span>Ver canal</span>
              <span class="landing-channel-icon" aria-hidden="true">→</span>
            </BaseButton>
          </div>

        </div>
      </section>
    </main>
  </div>
</template>

<style scoped src="./home-page.css"></style>
