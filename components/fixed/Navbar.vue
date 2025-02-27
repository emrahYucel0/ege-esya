<script setup>
import { gsap } from "gsap";

const navbar = ref(null);
const isMenuOpen = ref(false);
const navbarData = ref(null);

const { data } = await useFetch("/api/navbar");
if (data.value) navbarData.value = data.value;

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.classList.toggle(isMenuOpen.value);
  if (isMenuOpen.value) {
    document.querySelector(".mobile-menu").focus();
  }
};

onMounted(() => {
  const handleScroll = () => {
    if (window.innerWidth > 991) {
      gsap.to(navbar.value, {
        top: window.scrollY > 100 ? "0" : "-100px",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Debounce fonksiyonu ile resize optimizasyonu
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleResize = debounce(() => {
    if (window.innerWidth >= 1024) isMenuOpen.value = false;
  }, 200);

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);

  // ESC tuşu ile menü kapatma
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
  });
});
</script>

<template>
  <nav
    ref="navbar"
    class="bg-white/95 backdrop-blur-sm shadow-lg border-t-4 border-primary sticky top-0 lg:top-[-100px] z-50 transition-all duration-300"
    aria-label="Ana navigasyon"
    lang="tr"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="flex items-center h-20 justify-between">
        <!-- Logo -->
        <nuxt-link
          to="/"
          class="z-50 flex-shrink-0 flex items-center px-4 py-2 bg-gradient-to-r from-primary to-black rounded-lg shadow-md hover:shadow-xl transition-all"
          aria-label="Ana sayfaya dön"
        >
          <span class="text-white text-xl sm:text-2xl font-bold tracking-tight">
            {{ navbarData?.title || "EGE" }}
            <span class="text-yellow-300">{{ navbarData?.subtitle || "EŞYA" }}</span>
          </span>
        </nuxt-link>

        <!-- Desktop Menu -->
        <div class="hidden xl:flex flex-1 justify-center mx-8">
          <div class="flex items-center gap-x-6 flex-nowrap" role="navigation" aria-label="Ana menü">
            <nuxt-link
              v-for="(link, index) in [
                { to: '/', text: 'Anasayfa', aria: 'Ana sayfaya git' },
                { to: '/hakkimizda', text: 'Hakkımızda', aria: 'Hakkımızda sayfası' },
                { to: '/bolgelerimiz', text: 'Bölgelerimiz', aria: 'Hizmet bölgelerimiz' },
                { to: '/blog', text: 'Blog', aria: 'Blog yazıları' },
                { to: '/iletisim', text: 'İletişim', aria: 'İletişim bilgileri' },
              ]"
              :key="index"
              :to="link.to"
              class="relative py-2 px-3 text-gray-700 hover:text-primary font-semibold transition-colors group text-base"
              active-class="text-primary"
              :aria-label="link.aria"
              :aria-current="$route.path === link.to ? 'page' : undefined"
            >
              {{ link.text }}
              <span
                class="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform transition-all duration-300 scale-x-0"
                :class="{ 'scale-x-100': $route.path === link.to, 'group-hover:scale-x-75': $route.path !== link.to }"
              ></span>
            </nuxt-link>
          </div>
        </div>

        <!-- Desktop Phone -->
        <div class="hidden xl:flex items-center space-x-3 border-l border-gray-200 pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-primary shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <a
            :href="`tel:${navbarData?.phone}`"
            class="text-gray-700 hover:text-primary font-semibold transition-colors text-base"
            :aria-label="`Bizi arayın: ${navbarData?.phone || '+90 345 6789'}`"
          >
            {{ navbarData?.phone || "+90 345 6789" }}
          </a>
        </div>

        <!-- Burger Menu -->
        <button
          @click="toggleMenu"
          class="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          :aria-label="isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'"
          :aria-expanded="isMenuOpen"
          tabindex="0"
        >
          <svg
            class="w-8 h-8 text-gray-700 transition-transform duration-300"
            :class="{ 'rotate-90': isMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile/Tablet Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-screen"
        leave-from-class="opacity-100 max-h-screen"
        leave-to-class="opacity-0 max-h-0"
      >
        <div
          v-show="isMenuOpen"
          class="xl:hidden bg-white overflow-hidden mobile-menu"
          role="navigation"
          aria-label="Mobil menü"
          tabindex="-1"
        >
          <div class="py-4 space-y-2 border-t border-gray-200">
            <nuxt-link
              v-for="(link, index) in [
                { to: '/', text: 'Anasayfa', aria: 'Ana sayfaya git' },
                { to: '/hakkimizda', text: 'Hakkımızda', aria: 'Hakkımızda sayfası' },
                { to: '/bolgelerimiz', text: 'Bölgelerimiz', aria: 'Hizmet bölgelerimiz' },
                { to: '/blog', text: 'Blog', aria: 'Blog yazıları' },
                { to: '/iletisim', text: 'İletişim', aria: 'İletişim bilgileri' },
              ]"
              :key="index"
              :to="link.to"
              class="block mx-4 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors relative overflow-hidden"
              :class="{ 'text-primary bg-primary/10': $route.path === link.to }"
              :aria-label="link.aria"
              :aria-current="$route.path === link.to ? 'page' : undefined"
              @click="isMenuOpen = false"
            >
              <span class="relative z-10">{{ link.text }}</span>
              <div
                v-if="$route.path === link.to"
                class="absolute inset-y-0 left-0 w-1 bg-primary animate-indicator"
              ></div>
            </nuxt-link>

            <!-- Mobile Contact -->
            <div class="pt-4 mt-4 border-t border-gray-200 mx-4">
              <a
                :href="`tel:${navbarData?.phone}`"
                class="flex items-center space-x-3 px-4 py-3 text-primary font-semibold hover:bg-gray-50 rounded-lg transition-colors"
                :aria-label="`Bizi arayın: ${navbarData?.phone || '+90 345 6789'}`"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{{ navbarData?.phone || "+90 345 6789" }}</span>
              </a>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style>
@keyframes indicator {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-indicator {
  animation: indicator 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* iPad Optimizasyonları */
@media (min-width: 768px) and (max-width: 1279px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  [aria-label="Ana navigasyon"] {
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.98);
  }
}

@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>