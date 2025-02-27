<script setup>
const { data, pending, error } = await useFetch("/api/about");

const {
  data: postData,
  pending: postPending,
  error: postError,
} = await useFetch("/api/posts");

const {
  data: regionData,
  pending: regionPending,
  error: regionError,
} = await useFetch("/api/regions");

const posts = computed(() => {
  return postData.value && postData.value.success ? postData.value.data : [];
});

const recentPosts = computed(() => posts.value.slice(4, 10));

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
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-10 gap-8">
      <!-- Hakkımızda İçerik Alanı (%70) -->
      <main class="md:col-span-7 bg-white p-6 rounded-lg shadow-lg">
        <template v-if="pending">
          <p class="text-gray-600">Yükleniyor...</p>
        </template>
        <template v-else-if="error">
          <p class="text-red-600">Veri alınırken bir hata oluştu!</p>
        </template>
        <template v-else-if="data?.success">
          <h1 class="text-4xl font-bold text-gray-800 mb-4 text-center">
            {{ data.data?.title }}
          </h1>
          <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center">
            {{ data.data?.subtitle }}
          </h2>
          <NuxtImg
            provider="imgix"
            loading="lazy"
            format="webp"
            quality="50"
            :src="data.data?.image || '/img/about.jpg'"
            :alt="data.data?.subtitle"
            class="w-full h-80 object-fit rounded-lg mb-8"
          />

          <div
            v-html="data.data?.content"
            class="text-gray-600 leading-relaxed"
          ></div>
        </template>
      </main>
      <!-- Blog ve Etiketler (%30) -->
      <aside class="md:col-span-3 bg-gray-100 p-6 rounded-lg shadow-lg">
        <section>
          <h3 class="text-2xl font-semibold text-primary mb-6">
            Son Blog Yazıları
          </h3>

          <template v-if="postPending">
            <p class="text-gray-600">Blog yazıları yükleniyor...</p>
          </template>
          <template v-else-if="postError">
            <p class="text-red-600">Blog verisi alınırken hata oluştu!</p>
          </template>
          <template v-else>
            <ul class="space-y-6 mb-10">
              <li v-for="post in recentPosts" :key="post.id">
                <NuxtLink
                  :to="`/${post.slug}`"
                  :aria-label="`${post.shortTitle} yazısını oku`"
                  class="text-black px-1 py-1 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition"
                >
                  {{ post.shortTitle }}
                </NuxtLink>
              </li>
            </ul>
          </template>
        </section>

        <section class="md:col-span-3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-semibold text-primary mb-6">
            Hizmet Bölgelerimiz
          </h3>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="(region, index) in recentRegions"
              :key="region.id"
              :to="`/${region.slug}`"
              :aria-label="`${region.shortTitle} Sayfası`"
              :class="regionColors[index % regionColors.length]"
              class="text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition"
            >
              {{ region.subtitle }}
            </NuxtLink>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>
