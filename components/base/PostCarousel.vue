<script setup>
import { gsap } from "gsap";
import { ref, computed, onMounted } from "vue";

const { data, error } = await useFetch("/api/posts");

const posts = computed(() => {
  return data.value && data.value.success ? data.value.data : [];
});

const carouselRef = ref(null);

onMounted(() => {
  gsap.to(carouselRef.value, {
    x: "-50%",
    duration: 20,
    repeat: -1,
    ease: "linear",
    overwrite: true,
  });
});

function formatDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("tr-TR", options);
}
</script>

<template>
  <div class="container mx-auto py-20 px-5 lg:px-0 testimonial-section">
    <div class="text-center testimonial-heading">
      <h6 class="text-secondary uppercase font-semibold text-lg">Blog</h6>
      <h1 class="text-4xl font-bold mb-10">Yazılarımıza Göz Atın</h1>
    </div>
    <div class="carousel-wrapper">
      <div ref="carouselRef" class="carousel">
        <div v-for="(post, index) in posts" :key="index" class="carousel-card">
          <NuxtImg
            provider="imgix"
            format="webp"
            quality="50"
            loading="lazy"
            decoding="async"
            :src="post.image"
            class="carousel-img"
            :alt="post.title + 'görseli'"
          />
          <div class="carousel-content">
            <h6 class="carousel-title">{{ post.shortTitle }}</h6>
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

            <nuxt-link class="carousel-button" :to="`/${post.slug}`"
              >Read More</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  padding: 10px 0;
}

.carousel {
  display: flex;
  gap: 30px;
  will-change: transform;
}

.carousel-card {
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  min-width: 260px;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.carousel-card:hover {
  transform: translateY(-10px);
}

.carousel-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.carousel-content {
  padding: 12px;
  text-align: center;
}

.carousel-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.carousel-description {
  font-size: 0.85rem;
  color: #666;
  margin: 8px 0;
}

.carousel-button {
  display: inline-block;
  padding: 6px 12px;
  background: #007bff;
  color: white;
  font-size: 0.85rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s ease-in-out;
}

.carousel-button:hover {
  background: #0056b3;
}

@media (max-width: 768px) {
  .carousel {
    flex-wrap: nowrap;
    gap: 10px;
  }

  .carousel-card {
    min-width: 240px;
  }
}
</style>
