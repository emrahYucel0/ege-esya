<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { useFetch } from '#app'

const testimonials = ref([])
const sectionTitle = ref('')
const sectionSubtitle = ref('')

// API'den verileri çekme
const fetchTestimonials = async () => {
  try {
    const { data } = await useFetch('/api/testimonial')
    if (data.value) {
      sectionTitle.value = data.value.title
      sectionSubtitle.value = data.value.subtitle
      testimonials.value = data.value.testimonialDetails
    }
  } catch (error) {
    console.error('Veri çekme hatası:', error)
  }
}

const currentIndex = ref(0)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  animateSlide()
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
  animateSlide()
}

const animateSlide = () => {
  gsap.fromTo(
    '.testimonial-item',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
  )
}

fetchTestimonials()

onMounted(async () => {
  animateSlide()

})
</script>

<template>
  <div class="container mx-auto py-20 px-5 lg:px-0">
    <div class="text-center mb-10">
      <h6 class="text-secondary uppercase font-semibold text-lg">{{ sectionSubtitle }}</h6>
      <h2 class="text-4xl font-bold">{{ sectionTitle }}</h2>
    </div>

    <!-- Carousel -->
    <div class="relative w-full max-w-3xl mx-auto overflow-hidden">
      <div class="flex transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">

        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-item flex-shrink-0 w-full p-6 bg-white shadow-lg rounded-lg text-center">
          <!-- Ortak SVG Görsel -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-quote-fill w-10 h-10 mx-auto text-primary mb-10" viewBox="0 0 16 16">
            <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M7.194 6.766a1.7 1.7 0 0 0-.227-.272 1.5 1.5 0 0 0-.469-.324l-.008-.004A1.8 1.8 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.5 2.5 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.5 2.5 0 0 0-.228-.4 1.7 1.7 0 0 0-.227-.273 1.5 1.5 0 0 0-.469-.324l-.008-.004A1.8 1.8 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/>
          </svg>
          <p class="text-gray-600">{{ testimonial.description }}</p>
          <div class="flex justify-center items-center mt-4">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill w-14 h-14 rounded-full border-2 border-indigo-500" viewBox="0 0 16 16">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
            </svg>

            <div class="ml-4">
              <h5 class="font-semibold text-lg">{{ testimonial.name }}</h5>
              <p class="text-sm text-gray-500">{{ testimonial.profession }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <button @click="prevSlide" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-indigo-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-indigo-600">
        ❮
      </button>
      <button @click="nextSlide" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-indigo-500 text-white px-3 py-2 rounded-full shadow-md hover:bg-indigo-600">
        ❯
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Carousel kaydırma efekti */
.testimonial-item {
  min-width: 100%;
}
</style>
