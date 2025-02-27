<script setup>
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;

const { data: postData, error: postError } = await useFetch(
  `/api/posts?slug=${slug}`
);
const { data: regionData, error: regionError } = await useFetch(
  `/api/regions?slug=${slug}`
);

const post = computed(() => {
  return postData.value && postData.value.success ? postData.value.data : null;
});

const region = computed(() => {
  return regionData.value && regionData.value.success
    ? regionData.value.data
    : null;
});

// Tüm post ve region verilerini çekiyoruz (navigasyon için)
const { data: allPostsData } = await useFetch("/api/posts");
const allPosts = computed(() =>
  allPostsData.value && allPostsData.value.success
    ? allPostsData.value.data
    : []
);

const { data: allRegionsData } = await useFetch("/api/regions");
const allRegions = computed(() =>
  allRegionsData.value && allRegionsData.value.success
    ? allRegionsData.value.data
    : []
);

// Sıralama: createdAt tarihine göre artan sırada sıralıyoruz
const sortedPosts = computed(() => {
  return [...allPosts.value].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
});

const sortedRegions = computed(() => {
  return [...allRegions.value].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
});

// Post için önceki ve sonraki içerik computed’ları
const previousPost = computed(() => {
  if (!post.value) return null;
  const index = sortedPosts.value.findIndex(
    (item) => item.slug === post.value.slug
  );
  return index > 0 ? sortedPosts.value[index - 1] : null;
});

const nextPost = computed(() => {
  if (!post.value) return null;
  const index = sortedPosts.value.findIndex(
    (item) => item.slug === post.value.slug
  );
  return index >= 0 && index < sortedPosts.value.length - 1
    ? sortedPosts.value[index + 1]
    : null;
});

// Region için önceki ve sonraki içerik computed’ları
const previousRegion = computed(() => {
  if (!region.value) return null;
  const index = sortedRegions.value.findIndex(
    (item) => item.slug === region.value.slug
  );
  return index > 0 ? sortedRegions.value[index - 1] : null;
});

const nextRegion = computed(() => {
  if (!region.value) return null;
  const index = sortedRegions.value.findIndex(
    (item) => item.slug === region.value.slug
  );
  return index >= 0 && index < sortedRegions.value.length - 1
    ? sortedRegions.value[index + 1]
    : null;
});

// Yönlendirme fonksiyonları
function goToPost(targetSlug) {
  // Post sayfaları için: yönlendirme URL yapısını ihtiyacınıza göre ayarlayın.
  router.push(`/${targetSlug}`);
}

function goToRegion(targetSlug) {
  // Region sayfaları için: yönlendirme URL yapısını ihtiyacınıza göre ayarlayın.
  router.push(`/${targetSlug}`);
}
</script>

<template>
  <div>
    <!-- Hata durumları -->
    <div v-if="postError || regionError" class="text-red-500">
      <div v-if="postError">Post Hatası: {{ postError.message }}</div>
      <div v-if="regionError">Region Hatası: {{ regionError.message }}</div>
    </div>

    <!-- Post içeriği -->
    <article
      v-if="post"
      class="flex flex-col items-center my-16 max-w-3xl mx-auto"
    >
      <NuxtImg
        provider="imgix"
        format="webp"
        quality="50"
        loading="lazy"
        decoding="async"
        :src="post.image"
        class="w-full h-auto rounded mb-6"
        :alt="post.shortTitle"
        :title="post.title"
      />
      <header>
        <h1 v-if="post.title" class="text-4xl font-bold mb-4">
          {{ post.title }}
        </h1>
      </header>
      <section>
        <div
          v-html="post.content"
          class="card shadow-lg rounded-lg overflow-hidden bg-white w-full"
        ></div>
        <div class="flex justify-between mt-8 w-full">
          <button
            v-if="previousPost"
            @click="goToPost(previousPost.slug)"
            class="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-square-fill w-10 h-10 mr-4"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"
                />
              </svg>
            </span>
            {{ previousPost.shortTitle }}
          </button>
          <button
            v-if="nextPost"
            @click="goToPost(nextPost.slug)"
            class="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          >
            {{ nextPost.shortTitle }}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right-square-fill w-10 h-10 ml-4"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </article>

    <article
      v-if="region"
      class="flex flex-col items-center my-16 max-w-3xl mx-auto"
    >
      <header>
        <h1 v-if="region.title" class="text-4xl font-bold mb-4">
          {{ region.title }}
        </h1>
        <NuxtImg
          provider="imgix"
          format="webp"
          quality="50"
          loading="lazy"
          decoding="async"
          :src="region.image"
          class="w-full h-auto rounded mb-6"
          :alt="region.shortTitle"
          :title="region.title"
        />
      </header>
      <section>
        <div
          v-html="region.content"
          class="card shadow-lg rounded-lg overflow-hidden bg-white w-full"
        ></div>
        <div class="flex justify-between mt-8 w-full">
          <button
            v-if="previousRegion"
            @click="goToRegion(previousRegion.slug)"
            class="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-square-fill w-10 h-10 mr-4"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"
                />
              </svg>
            </span>
            {{ previousRegion.shortTitle }}
          </button>
          <button
            v-if="nextRegion"
            @click="goToRegion(nextRegion.slug)"
            class="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
          >
            {{ nextRegion.shortTitle }}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right-square-fill w-10 h-10 ml-4"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1"
                />
              </svg>
            </span>
          </button>
        </div>
      </section>
    </article>
    <div v-if="!post && !region" class="text-center py-16">
      404 - İçerik bulunamadı
    </div>
  </div>
</template>
