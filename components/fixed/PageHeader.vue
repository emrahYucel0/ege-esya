<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

defineProps({
  title: { type: String, required: true },
  page: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  linkName: { type: String, required: true },
});

const headerRef = ref(null);
const titleRef = ref(null);
const navRef = ref(null);

// Daha hafif animasyon
const animateHeader = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(
    headerRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.8 } // Scale kaldırıldı, daha az CPU kullanımı
  )
    .from(titleRef.value, { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
    .from(navRef.value, { opacity: 0, y: 10, duration: 0.5 }, "-=0.4");
};

onMounted(() => {
  requestAnimationFrame(animateHeader); // Daha performanslı bir başlatma
});
</script>

<template>
  <div
    ref="headerRef"
    class="relative py-16 md:py-24 mb-20 flex items-center justify-center text-center text-white"
    :style="{
      backgroundImage: `linear-gradient(rgba(6, 3, 21, 0.4), rgba(6, 3, 21, 0.4)), url(${imageUrl}?auto=format,compress&w=1600&q=60)`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }"
    lang="tr"
  >
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div> <!-- Hafif bulanıklık -->

    <div class="container mx-auto px-4 overflow-hidden">
      <h3
        ref="titleRef"
        class="text-3xl md:text-5xl font-semibold text-white mb-5"
      >
        {{ title }}
      </h3>
      <nav
        ref="navRef"
        class="mt-3"
        aria-label="Breadcrumb"
      >
        <ol
          class="flex flex-wrap justify-center gap-2 text-base md:text-lg"
          itemscope
          itemtype="https://schema.org/BreadcrumbList"
        >
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <nuxt-link
              to="/"
              class="btn-link"
              aria-label="Anasayfaya geri dön"
            >
              AnaSayfa
            </nuxt-link>
            <meta
              itemprop="position"
              content="1"
            />
          </li>
          <span>/</span>
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <nuxt-link
              :to="link"
              class="btn-link"
              :aria-label="`${linkName} sayfasına git`"
            >
              {{ linkName }}
            </nuxt-link>
            <meta
              itemprop="position"
              content="2"
            />
          </li>
          <span>/</span>
          <li
            class="btn-link page"
            aria-current="page"
          >
            {{ page }}
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.btn-link {
  background-color: transparent;
  color: #ff7b00;
  font-size: 1rem; /* Daha küçük font boyutu */
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 6px;
  text-decoration: none;
  transition: color 0.2s ease-in-out; /* Daha hafif geçiş efekti */
}

.btn-link:hover {
  color: #ffa64d; /* Transform yerine renk değişikliği */
}

.page {
  color: white;
  font-weight: 500;
}
</style>