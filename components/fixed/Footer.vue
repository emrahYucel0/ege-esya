<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const footer = ref(null);
const footerData = ref(null);

const fetchFooterData = async () => {
  try {
    const response = await fetch("/api/footer");
    if (response.ok) {
      footerData.value = await response.json();
    }
  } catch (error) {
    console.error("Footer verisi çekilirken hata oluştu:", error);
  }
};

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.from(footer.value, {
    opacity: 0,
    y: 20, // Daha küçük kaydırma mesafesi
    duration: 0.6, // Daha kısa süre
    ease: "power2.out", // Hafif easing
  });

  fetchFooterData();
});
</script>

<template>
  <footer ref="footer" class="relative bg-dark text-light pt-10 mt-20" lang="tr">
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Address & Social Links Section -->
        <div itemscope itemtype="https://schema.org/Organization">
          <h4 class="text-base font-semibold mb-2 text-secondary">Adres</h4>
          <p class="mb-2 flex items-start" v-if="footerData">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              class="mr-2 flex-shrink-0 mt-1"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zM12 2C8.134 2 5 5.134 5 9c0 4.833 7 13 7 13s7-8.167 7-13c0-3.866-3.134-7-7-7z"
              />
            </svg>
            <span itemprop="address" class="flex-1">{{ footerData.address }}</span>
          </p>
          <p class="mb-2 flex items-center" v-if="footerData">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              class="mr-2 flex-shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.09 4.18 2 2 0 014 2h3a2 2 0 012 1.72 12.05 12.05 0 00.7 2.81 2 2 0 01-.45 2.11l-1.27 1.27a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.05 12.05 0 002.81.7A2 2 0 0122 16.92z"
              />
            </svg>
            <span itemprop="telephone">{{ footerData.phone }}</span>
          </p>
          <p class="mb-2 flex items-center" v-if="footerData">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              class="mr-2 flex-shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                ry="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l9 6 9-6"
              />
            </svg>
            <span itemprop="email" class="truncate">{{ footerData.email }}</span>
          </p>
          <div
            class="flex flex-wrap gap-2 pt-2"
            v-if="footerData && footerData.socialLinks?.length"
          >
            <a
              v-for="social in footerData.socialLinks"
              :key="social.id"
              :href="social.url"
              class="w-8 h-8 flex items-center justify-center border border-light rounded-full text-light hover:text-primary hover:border-primary transition-colors"
              :aria-label="`Bizi ${social.name} üzerinde takip et`"
            >
              <svg
                v-if="social.name.toLowerCase() === 'twitter'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3a4.48 4.48 0 00-4.48 4.48c0 .35.04.69.11 1.02A12.8 12.8 0 013 4.14a4.48 4.48 0 001.39 6A4.5 4.5 0 012.8 9.5v.06A4.48 4.48 0 004.48 14a4.5 4.5 0 01-2 .08 4.48 4.48 0 004.18 3.12A9 9 0 012 19.54a12.72 12.72 0 006.88 2"
                />
              </svg>
              <svg
                v-else-if="social.name.toLowerCase() === 'facebook'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
              <svg
                v-else-if="social.name.toLowerCase() === 'youtube'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M23.5 6.2c-.3-1.1-1.1-2-2.2-2.3C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.4c-1.1.3-1.9 1.2-2.2 2.3C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 2 2.2 2.3 2 .4 9.3.4 9.3.4s7.3 0 9.3-.4c1.1-.3 1.9-1.2 2.2-2.3.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6 3.5-6 3.5z"
                />
              </svg>
              <svg
                v-else-if="social.name.toLowerCase() === 'instagram'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1s.8 1 .9 1.6c.2.5.4 1.2.5 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6s-1 .8-1.6.9c-.5.2-1.2.4-2.4.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1.1-.5-1.6-1s-.8-1-.9-1.6c-.2-.5-.4-1.2-.5-2.4-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6s1-.8 1.6-.9c.5-.2 1.2-.4 2.4-.5 1.2-.1 1.6-.1 4.8-.1zm0 2.2c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6 5.6-2.5 5.6-5.6-2.5-5.6-5.6-5.6zm0 9.2c-2 0-3.6-1.6-3.6-3.6s1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6zm5.8-9.5c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3z"
                />
              </svg>
              <svg
                v-else-if="social.name.toLowerCase() === 'linkedin'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.5 18H6.3V9.8h2.2V18zm-1.1-9.5c-.7 0-1.3-.6-1.3-1.3s.6-1.3 1.3-1.3 1.3.6 1.3 1.3-.6 1.3-1.3 1.3zm11.1 9.5h-2.2v-4.8c0-1.2-.4-2-1.5-2s-1.7.8-1.7 2v4.8h-2.2V9.8h2.2v1.2c.3-.5 1-1.2 2.2-1.2 1.6 0 2.8 1 2.8 3.2V18z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links Section -->
        <div>
          <h4 class="text-base font-semibold mb-2 text-secondary">Hızlı Linkler</h4>
          <template v-if="footerData && footerData.quickLinks?.length">
            <a
              v-for="link in footerData.quickLinks"
              :key="link.id"
              :href="link.url"
              class="block mb-1 text-light hover:text-primary transition-colors"
            >
              {{ link.name }}
            </a>
          </template>
          <template v-else>
            <a href="#" class="block mb-1 text-light hover:text-primary transition-colors">Hakkımızda</a>
            <a href="#" class="block mb-1 text-light hover:text-primary transition-colors">İletişim</a>
            <a href="#" class="block mb-1 text-light hover:text-primary transition-colors">Hizmetlerimiz</a>
            <a href="#" class="block mb-1 text-light hover:text-primary transition-colors">Şartlar ve Koşullar</a>
            <a href="#" class="block mb-1 text-light hover:text-primary transition-colors">Destek</a>
          </template>
        </div>

        <!-- Region Links Section -->
        <div>
          <h4 class="text-base font-semibold mb-2 text-secondary">Bölge Linkleri</h4>
          <template v-if="footerData && footerData.regionLinks?.length">
            <a
              v-for="link in footerData.regionLinks"
              :key="link.id"
              :href="link.url"
              class="block mb-1 text-light hover:text-primary transition-colors"
            >
              {{ link.name }}
            </a>
          </template>
        </div>

        <!-- Blog Links Section -->
        <div>
          <h4 class="text-base font-semibold mb-2 text-secondary">Blog Linkleri</h4>
          <template v-if="footerData && footerData.blogLinks?.length">
            <a
              v-for="link in footerData.blogLinks"
              :key="link.id"
              :href="link.url"
              class="block mb-1 text-light hover:text-primary transition-colors"
            >
              {{ link.name }}
            </a>
          </template>
        </div>
      </div>
    </div>

    <!-- Copyright Section -->
    <div class="border-t border-gray-700 py-3">
      <div class="container mx-auto px-4 text-center md:text-left">
        <div class="flex flex-col md:flex-row justify-between items-center gap-2">
          <p class="mb-0 text-sm">
            © <a href="#" class="hover:text-primary transition-colors">Ege Eşya</a>, Tüm Hakları Saklıdır
          </p>
          <p v-if="footerData" class="text-secondary mb-0 text-sm">{{ footerData.copyright }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  will-change: opacity, transform; /* Daha az özellik */
}

/* Mobil uyum için optimizasyon */
.container {
  max-width: 100%;
  overflow-x: hidden;
}

.grid {
  gap: 1.25rem; /* Daha küçük boşluk */
}

.w-8.h-8 {
  width: 2rem; /* 32px */
  height: 2rem;
}

.w-5.h-5 {
  width: 1rem; /* 16px */
  height: 1rem;
}

.flex-wrap.gap-2 {
  gap: 0.5rem;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .text-lg {
    font-size: 0.875rem; /* Daha küçük başlık */
  }

  .mb-2 {
    margin-bottom: 0.5rem; /* Boşlukları azalttık */
  }

  .pt-10 {
    padding-top: 2.5rem; /* Üst boşluğu azalttık */
  }

  .py-6 {
    padding-top: 1.5rem; /* İç boşlukları azalttık */
    padding-bottom: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  footer {
    transition: none !important;
  }
}
</style>