<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { data: features } = await useFetch("/api/feature", {
  key: "features-data",
  transform: (data) => ({
    ...data,
    image: `${data.image}?auto=format,compress&w=1000&q=60`, // Daha düşük çözünürlük ve optimize kalite
  }),
});

onMounted(() => {
  if (!features.value) return;

  const ctx = gsap.context(() => {
    gsap.utils.toArray(".feature-text, .feature-image").forEach((el, index) => {
      gsap.from(el, {
        x: index % 2 === 0 ? -50 : 50, // Daha küçük kaydırma mesafesi
        opacity: 0,
        duration: 0.8, // Daha kısa süre
        ease: "power2.out", // Daha az karmaşık easing
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // Daha erken başlatma
          end: "bottom 10%", // Daha kısa animasyon aralığı
          scrub: 1, // Daha akıcı scrub
          markers: false,
        },
      });
    });
  });

  return () => ctx.revert(); // Temizlik
});
</script>

<template>
  <section
    class="container mx-auto py-16 px-4 lg:px-0 overflow-hidden"
    itemscope
    itemtype="https://schema.org/ItemList"
  >
    <meta itemprop="name" :content="features?.title" />
    <link itemprop="image" :href="features?.image" />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <!-- Metin Alanı -->
      <section
        class="feature-text space-y-6"
        aria-label="Özellikler Listesi"
      >
        <h6
          class="text-secondary uppercase font-medium text-base text-center lg:text-left"
          itemprop="alternativeHeadline"
        >
          {{ features?.subtitle }}
        </h6>

        <h2
          class="text-2xl md:text-3xl font-semibold mb-4 text-center lg:text-left"
          itemprop="headline"
        >
          {{ features?.title }}
        </h2>

        <!-- Özellikler Listesi -->
        <div
          v-for="(type, index) in features?.featureTypes"
          :key="index"
          :class="`feature-item-${index} flex items-start space-x-3 md:space-x-5`"
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
        >
          <meta itemprop="position" :content="index + 1" />

          <!-- İkon -->
          <div class="flex-shrink-0" aria-hidden="true">
            <svg
              v-if="index === 0"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-check-circle text-primary"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zM6.854 7.854a.5.5 0 0 1 .708 0L8 9.707l1.438-1.853a.5.5 0 1 1 .784.623l-1.75 2.25a.5.5 0 0 1-.783 0l-1.75-2.25a.5.5 0 0 1 .071-.708z"
              />
            </svg>

            <svg
              v-else-if="index === 1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-star-fill text-yellow-400"
              viewBox="0 0 16 16"
            >
              <path
                d="M3.612 15.443c-.46.213-.976-.081-1.05-.597L2.6 11.779l-4.32-.004c-.47-.002-.828-.399-.76-.867l.814-4.387-3.432-3.282c-.339-.33-.161-.886.312-.95l4.418-.634 1.685-4.237c.182-.459.648-.685 1.12-.563l3.42 1.186 3.42-1.186c.472-.122.938.104 1.12.563l1.685 4.237 4.418.634c.473.064.651.62.312.95l-3.432 3.282.814 4.387c.068.468-.29.865-.76.867l-4.32.004-1.012 2.067c-.074.516-.59.81-1.05.597l-4.307-2.478-4.307 2.478z"
              />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-heart-fill text-red-500"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 12s3-2.3 5-4.5C14.5 5 13 2 10 2c-1 0-2 1-2 1S7 2 6 2C3 2 1.5 5 3 7.5 5 10.7 8 12 8 12z"
              />
            </svg>
          </div>

          <!-- Özellik Başlık ve Açıklama -->
          <div itemprop="item" itemscope itemtype="https://schema.org/Thing">
            <h3 class="text-base md:text-lg font-semibold mb-1" itemprop="name">
              {{ type.title }}
            </h3>
            <p
              class="text-gray-600 text-sm md:text-base"
              itemprop="description"
            >
              {{ type.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Resim Alanı -->
      <section
        class="feature-image h-80 lg:h-96 overflow-hidden rounded-lg shadow-md"
        aria-label="Özellikler görseli"
      >
        <NuxtImg
          provider="imgix"
          class="w-full h-full object-cover"
          :src="features?.image"
          :title="features?.title"
          :alt="features?.subtitle"
          format="webp"
          quality="60"
          sizes="sm:640px md:768px lg:1000px xl:1000px"
          loading="lazy"
          decoding="async"
          width="1000"
          height="500" 
        />
      </section>
    </div>
  </section>
</template>

<style scoped>
.feature-item {
  min-height: 100px; /* CLS önleme */
}

@media (min-width: 768px) {
  .feature-item {
    @apply flex-row items-start text-left;
  }
}

.feature-text,
.feature-image {
  will-change: opacity, transform; /* Daha az özellik */
}

/* Reduce motion support */
@media (prefers-reduced-motion: reduce) {
  .feature-text,
  .feature-image {
    transition: none !important;
  }
}
</style>