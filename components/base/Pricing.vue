<script setup>
import { ref, onMounted, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// API'den çekilen veriler için reaktif değişkenler
const pricingPlans = ref([]);
const pricingPlanInfo = ref({
  title: "",
  subtitle: "",
});

const fetchPricingPlans = async () => {
  try {
    const data = await $fetch("/api/price");
    pricingPlanInfo.value = {
      title: data.title,
      subtitle: data.subtitle,
    };

    const plans = [
      ...(data.basicFeatures || []).map((plan) => ({
        name: plan.planName,
        price: plan.price,
        features: (plan.basicPlanTypes || []).map((item) => item.description),
      })),
      ...(data.standardFeatures || []).map((plan) => ({
        name: plan.planName,
        price: plan.price,
        features: (plan.standardPlanTypes || []).map((item) => item.description),
      })),
      ...(data.advancedFeatures || []).map((plan) => ({
        name: plan.planName,
        price: plan.price,
        features: (plan.advancedPlanTypes || []).map((item) => item.description),
      })),
    ];

    pricingPlans.value = plans;
    await nextTick();
    startGSAPAnimation();
  } catch (error) {
    console.error("Pricing plans çekilirken hata oluştu:", error);
  }
};

const startGSAPAnimation = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.from(".price-item", {
    opacity: 0,
    y: 20, // Daha küçük kaydırma mesafesi
    duration: 0.6, // Daha kısa süre
    stagger: 0.2, // Daha hızlı sıralama
    scrollTrigger: {
      trigger: ".pricing-container",
      start: "top 85%", // Daha erken başlatma
      end: "top 60%", // Daha kısa animasyon aralığı
      toggleActions: "play none none none",
    },
  });
};

onMounted(fetchPricingPlans);
</script>

<template>
  <div class="container mx-auto py-16 px-4 lg:px-0 pricing-container">
    <div class="text-center">
      <h6
        class="text-secondary uppercase font-medium text-base"
      >
        {{ pricingPlanInfo.subtitle }}
      </h6>
      <h2
        class="text-3xl font-semibold mb-8"
      >
        {{ pricingPlanInfo.title }}
      </h2>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="(plan, index) in pricingPlans"
        :key="index"
        class="price-item bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <div class="border-b p-3 mb-3">
          <h3
            class="text-primary text-lg font-semibold mb-1"
          >
            {{ plan.name }}
          </h3>
          <p class="text-3xl font-semibold">{{ plan.price }}</p>
        </div>
        <div class="p-3">
          <p
            v-for="(feature, idx) in plan.features"
            :key="idx"
            class="flex items-center text-gray-600 mb-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              class="bi bi-check-circle-fill text-secondary mr-2"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>
            {{ feature }}
          </p>
          <NuxtLink
            to="/iletisim"
            :aria-label="`${plan.name} planı için iletişim sayfasına git`"
            class="inline-flex items-center px-3 py-1 mt-3 text-white bg-primary hover:bg-secondary rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Bize Yazın
          </NuxtLink>
        </div>
        <p class="text-xs text-gray-500 mt-3">
          *Lütfen Detaylı Fiyatlandırma İçin Bizimle İletişime Geçin*
        </p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.price-item {
  will-change: opacity, transform; /* Daha az özellik */
}

/* Reduce motion support */
@media (prefers-reduced-motion: reduce) {
  .price-item {
    transition: none !important;
  }
}
</style>