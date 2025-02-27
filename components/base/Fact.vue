<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// API'den çekilen Fact verisini tutan reaktif değişken
const fact = ref(null);

const { data, error } = await useFetch("/api/fact");

if (error.value) {
  console.error("Fact verisi alınırken hata oluştu:", error.value);
} else {
  fact.value = data.value;
}

onMounted(() => {
  // Daha hafif ScrollTrigger animasyonu
  gsap.utils.toArray(".animate-fade").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 30, // Daha küçük kaydırma mesafesi
      duration: 0.8, // Daha kısa süre
      ease: "power2.out", // Daha az karmaşık easing
      scrollTrigger: {
        trigger: el,
        start: "top 85%", // Daha erken başlatma
        end: "bottom 10%", // Daha kısa animasyon aralığı
        scrub: 1, // Daha akıcı scrub (true yerine sayı)
        markers: false,
      },
    });
  });
});
</script>

<template>
  <div class="container mx-auto py-16 px-4 lg:px-0 overflow-hidden">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      <!-- Sol Taraf: Metin ve İletişim Bilgileri -->
      <div class="space-y-5 lg:space-y-10 animate-fade">
        <h6
          class="text-secondary uppercase font-medium text-base lg:text-lg"
        >
          {{ fact?.subtitle || "Some Facts" }}
        </h6>
        <h2
          class="text-2xl lg:text-3xl font-semibold"
        >
          {{ fact?.title || "#1 Place To Manage All Of Your Shipments" }}
        </h2>
        <p
          class="text-gray-700 text-sm lg:text-base"
        >
          {{ fact?.description || "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit..." }}
        </p>
        <div class="flex items-center space-x-3">
          <div class="p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-headphones text-primary"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5"
              />
            </svg>
          </div>
          <div>
            <h6 class="text-gray-600 text-sm">
              {{ fact?.phoneLabel || "Call for any query!" }}
            </h6>
            <h3
              class="text-primary text-lg lg:text-xl font-semibold"
            >
              {{ fact?.phone || "+012 345 6789" }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Sağ Taraf: İstatistikler -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
        <div
          v-for="(stat, index) in fact?.statistics || []"
          :key="index"
          class="bg-secondary p-3 lg:p-5 rounded-lg shadow-md animate-fade"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-person-hearts text-primary"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 1.246c.832-.855 2.913.642 0 2.566-2.913-1.924-.832-3.421 0-2.566M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276ZM15 2.165c.555-.57 1.942.428 0 1.711-1.942-1.283-.555-2.281 0-1.71Z"
            />
          </svg>
          <h2
            class="text-white text-2xl lg:text-3xl font-semibold mb-1"
          >
            {{ stat.value || "1000" }}
          </h2>
          <p class="text-white text-sm lg:text-base">{{ stat.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  overflow-x: hidden;
}

/* Mobil cihazlar için optimizasyon */
@media (max-width: 640px) {
  .container {
    padding: 2rem 1rem; /* Daha dengeli padding */
  }

  h2 {
    font-size: 1.5rem; /* Daha küçük başlık */
  }

  p {
    font-size: 0.875rem;
  }

  .grid-cols-1 {
    gap: 1rem;
  }
}
</style>