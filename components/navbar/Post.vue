<script setup>
import { ref, computed } from "vue";

// Aktif tab'ı kontrol etmek için state
const activeTab = ref("featured"); // Varsayılan: 'featured'

// Posts API'dan verileri çekiyoruz
const { data, error } = await useFetch("/api/posts");

// API'dan gelen yanıtın yapısından post listesini ayıklıyoruz
const posts = computed(() => {
  // data.value içi { success: true, data: regions } olacak.
  return data.value && data.value.success ? data.value.data : [];
});

// Öne Çıkan ve Son Eklenen postları filtreleme (örnek olarak ilk 10 post üzerinden)
const featuredPosts = computed(() => posts.value.slice(0, 6));
const recentPosts = computed(() => posts.value.slice(5, 10));

// Görüntülenecek postları aktif sekmeye göre belirliyoruz
const displayedPosts = computed(() =>
  activeTab.value === "featured"
    ? featuredPosts.value.slice(0, 3)
    : recentPosts.value.slice(0, 2)
);

// Tarih formatlama fonksiyonu (modeldeki tarih alanı 'createdAt')
function formatDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("tr-TR", options);
}

// Post'a ait detay sayfası linkini oluşturma (slug değeri kullanılarak)
function generatePath(post) {
  return `/${post.slug}`;
}

const {
  data: regionData,
  pending: regionPending,
  error: regionError,
} = await useFetch("/api/regions");

const regions = computed(() => {
  return regionData.value && regionData.value.success
    ? regionData.value.data
    : [];
});

const recentRegions = computed(() => regions.value.slice(0, 10));

// Bölge etiketleri için renk skalası
const regionColors = [
  "bg-gradient-to-r from-blue-500 to-blue-700",
  "bg-gradient-to-r from-green-500 to-green-700",
  "bg-gradient-to-r from-red-500 to-red-700",
  "bg-gradient-to-r from-purple-500 to-purple-700",
  "bg-gradient-to-r from-yellow-500 to-yellow-700",
  "bg-gradient-to-r from-indigo-500 to-indigo-700",
];
</script>

<template>
  <div class="container mx-auto px-4 my-6">
    <div class="flex flex-wrap justify-center -mx-2">
      <!-- %70 Alan -->
      <div class="w-full lg:w-7/12 px-2">
        <!-- Featured Posts -->
        <h2 class="mb-4 text-primary uppercase">Öne Çıkan Yazılar</h2>
        <div class="flex flex-wrap -mx-2">
          <!-- Sol %50 -->
          <div class="w-full lg:w-6/12 px-2">
            <div class="card shadow-lg mb-5">
              <NuxtImg
                provider="imgix"
                format="webp"
                quality="50"
                loading="lazy"
                :src="featuredPosts[0]?.image"
                class="w-full h-48 object-fit"
                alt="Featured Image"
              />
              <div class="p-4">
                <h5 class="text-lg font-bold">{{ featuredPosts[0]?.title }}</h5>
                <div class="flex my-3">
                  <div class="flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-fill me-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                      />
                    </svg>
                    {{ featuredPosts[0]?.author }}
                  </div>
                  <div class="flex items-center text-sm text-gray-600 mx-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar me-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                      />
                    </svg>
                    {{ formatDate(featuredPosts[0]?.createdAt) }}
                  </div>
                </div>
                <p class="text-sm">{{ featuredPosts[0]?.excerpt }}</p>
                <nuxt-link
                  class="btn-primary"
                  :to="generatePath(featuredPosts[0])"
                >
                  Devamı...
                </nuxt-link>
              </div>
            </div>
          </div>
          <!-- Sağ %50 (Scrollbar ile diğer postlar) -->
          <div
            class="w-full lg:w-6/12 px-2 overflow-y-auto"
            style="max-height: 550px"
          >
            <div
              v-for="(post, index) in posts"
              :key="index"
              class="flex mb-3 items-center"
            >
              <NuxtImg
                provider="imgix"
                format="webp"
                quality="50"
                loading="lazy"
                :src="post.image"
                class="w-24 h-24 object-fit rounded me-3"
                alt="Post Image"
              />
              <div>
                <nuxt-link :to="generatePath(post)" class="post-link">
                  <h6 class="text-sm font-bold">{{ post.title }}</h6>
                </nuxt-link>
                <div class="flex items-center text-sm text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-calendar me-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                    />
                  </svg>
                  {{ formatDate(post.createdAt) }}
                </div>
                <div class="flex items-center text-sm text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person-fill me-1"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                    />
                  </svg>
                  {{ post.author }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Recent Posts -->
        <h2 class="mt-20 mb-4 text-primary uppercase">Son Eklenen Yazılar</h2>
        <div class="flex flex-wrap -mx-2">
          <div
            v-for="(post, index) in recentPosts"
            :key="index"
            class="w-full lg:w-6/12 px-2 mb-4"
          >
            <div class="card shadow-lg">
              <NuxtImg
                provider="imgix"
                format="webp"
                quality="50"
                loading="lazy"
                :src="post.image"
                class="w-full h-64 object-fit"
                alt="Post Image"
              />
              <div class="p-4">
                <h5 class="text-lg font-bold">{{ post.title }}</h5>
                <div class="flex my-3">
                  <div class="flex items-center text-sm text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-person-fill me-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                      />
                    </svg>
                    {{ post.author }}
                  </div>
                  <div class="flex items-center text-sm text-gray-600 mx-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-calendar me-1"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                      />
                    </svg>
                    {{ formatDate(post.createdAt) }}
                  </div>
                </div>
                <p class="text-sm">{{ post.excerpt }}</p>
                <nuxt-link
                  class="inline-flex items-center px-4 py-2 mt-4 text-white bg-primary hover:bg-secondary rounded-md transition-all"
                  :to="generatePath(post)"
                >
                  Read More
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- %30 Alan -->
      <div class="w-full lg:w-3/12 px-2 mt-5 lg:mt-0">
        <h2 class="mt-5 mb-4 text-secondary uppercase">
          En Çok Okunan Yazılar
        </h2>
        <div class="btn-group w-full mb-3">
          <button
            class="btn btn-outline-primary w-1/2"
            :class="{ 'bg-primary text-white': activeTab === 'featured' }"
            @click="activeTab = 'featured'"
          >
            Öne Çıkan
          </button>
          <button
            class="btn btn-outline-primary w-1/2"
            :class="{ 'bg-primary text-white': activeTab === 'recent' }"
            @click="activeTab = 'recent'"
          >
            Son Eklenen
          </button>
        </div>
        <div
          v-for="(post, index) in displayedPosts"
          :key="index"
          class="card mb-4 shadow-sm"
        >
          <NuxtImg
            provider="imgix"
            format="webp"
            quality="50"
            loading="lazy"
            :src="post.image"
            class="w-full h-48 object-fit"
            :alt="post.title"
          />
          <div class="p-4">
            <nuxt-link :to="generatePath(post)" class="post-link">
              <h5 class="text-sm font-bold">{{ post.title }}</h5>
            </nuxt-link>
            <div class="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-calendar me-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                />
              </svg>
              {{ formatDate(post.createdAt) }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-fill me-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
                />
              </svg>
              {{ post.author }}
            </div>
          </div>
        </div>
        <div class="md:col-span-3 bg-gray-100 p-6 rounded-lg shadow-lg mt-10">
          <h3 class="text-2xl font-semibold text-primary mb-6">
            Hizmet Bölgelerimiz
          </h3>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="(region, index) in recentRegions"
              :key="region.id"
              :to="`/${region.slug}`"
              :class="regionColors[index % regionColors.length]"
              class="text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition"
            >
              {{ region.subtitle }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-link h5,
.post-link h6 {
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
}

.post-link h5:hover,
.post-link h6:hover {
  box-shadow: 0px 4px 20px rgba(255, 123, 0, 0.5);
  cursor: pointer;
}

@media (min-width: 992px) {
  .container {
    max-width: 100% !important;
  }
}

@media (max-width: 767.98px) {
  .card {
    height: auto !important;
  }

  .overflow-y-auto {
    max-height: none !important;
  }

  .btn-group {
    flex-direction: column;
  }

  .btn-group .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
