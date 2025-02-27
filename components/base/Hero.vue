<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { gsap } from "gsap";

// API'den verileri çek
const { data: heroContent } = await useFetch("/api/hero", {
  key: "hero-data",
  transform: (data) => ({
    ...data,
    image: `${data.image}?auto=format,compress&w=1920&q=60`, // Daha optimize bir görüntü boyutu ve kalitesi
  }),
});

const heroImage = ref(null);

// Intersection Observer
const setupObserver = () => {
  if (heroImage.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.src;
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "100px" } // Görüş alanına girmeden önce yüklemeyi başlat
    );
    observer.observe(heroImage.value);
  }
};

// Veri yüklendiğinde observer'ı kur
watch(
  () => heroContent.value,
  (newVal) => {
    if (newVal?.data) {
      nextTick(setupObserver);
    }
  },
  { immediate: true }
);

// Daha hafif GSAP animasyonu
const animateSlide = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(
    ".hero-image",
    { opacity: 0 },
    { opacity: 1, duration: 0.8 } // Ölçeklendirme kaldırıldı, daha az CPU kullanımı
  )
    .from(".hero-content", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
    .from(
      ".hero-btns",
      { opacity: 0, y: 20, duration: 0.5 }, // Esneklik animasyonu kaldırıldı
      "-=0.4"
    );
};

onMounted(() => {
  if (heroContent.value?.data) {
    requestAnimationFrame(animateSlide);
  }
});
</script>

<template>
  <section
    v-if="heroContent?.data"
    class="relative w-full h-screen overflow-hidden"
    itemscope
    itemtype="https://schema.org/WPHeader"
    lang="tr"
  >
    <div class="relative w-full h-full">
      <NuxtImg
        v-if="heroContent.data.image"
        ref="heroImage"
        provider="imgix"
        :src="heroContent.data.image"
        alt="Anasayfa Görseli"
        :title="heroContent.data.title"
        format="webp"
        quality="60" 
        sizes="sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        preload
        decoding="async"
        fetchpriority="high"
        class="absolute top-0 left-0 w-full h-full object-cover hero-image" 
        :data-src="heroContent.data.image"
      />

      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        aria-hidden="true"
      />

      <!-- İçerik -->
      <header
        class="absolute inset-0 flex items-center justify-center text-white px-6"
      >
        <div class="max-w-2xl text-center hero-content">
          <meta itemprop="headline" :content="heroContent.data.title" />

          <p
            class="text-xl font-medium uppercase tracking-wide mb-3 text-primary"
            itemprop="alternativeHeadline"
          >
            {{ heroContent.data.subtitle }}
          </p>

          <h1
            id="hero-title"
            class="text-4xl md:text-5xl font-bold mb-4"
            itemprop="name"
          >
            {{ heroContent.data.title }}
          </h1>

          <p id="hero-description" class="text-lg mb-6" itemprop="description">
            {{ heroContent.data.description }}
          </p>

          <div
            class="flex space-x-4 justify-center hero-btns"
            aria-label="Yönlendirme Butonları"
          >
            <nuxt-link
              v-if="heroContent.data.primaryButton"
              :to="heroContent.data.primaryLink"
              class="btn-primary"
              :aria-label="heroContent.data.primaryButton + ' butonu'"
              aria-labelledby="hero-title"
              prefetch
              tabindex="0"
            >
              {{ heroContent.data.primaryButton }}
            </nuxt-link>

            <nuxt-link
              v-if="heroContent.data.secondaryButton"
              :to="heroContent.data.secondaryLink"
              class="btn-secondary"
              :aria-label="heroContent.data.secondaryButton + ' butonu'"
              aria-labelledby="hero-title"
              prefetch
              tabindex="0"
            >
              {{ heroContent.data.secondaryButton }}
            </nuxt-link>
          </div>
        </div>
      </header>
    </div>
  </section>
</template>

<style scoped>
.hero-image {
  will-change: opacity; /* Daha az CSS özelliği */
}

@media (prefers-reduced-motion: reduce) {
  .hero-image,
  .hero-content,
  .hero-btns {
    transition: none !important;
  }
}
</style>