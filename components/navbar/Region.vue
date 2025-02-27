<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { data, error } = await useFetch('/api/regions')

const regions = computed(() => {
  return data.value && data.value.success ? data.value.data : []
})

// Arama için reaktif değişken.
const searchQuery = ref('')

// Arama kriterine göre filtrelenmiş bölgeler.
const filteredRegions = computed(() => {
  if (!searchQuery.value) return regions.value
  return regions.value.filter(region =>
    region.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Sayfalama ayarları
const currentPage = ref(1)
const itemsPerPage = 6  

// Filtrelenmiş veriyi sayfaya böl.
const paginatedRegions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredRegions.value.slice(start, end)
})

// Toplam sayfa sayısı
const totalPages = computed(() =>
  Math.ceil(filteredRegions.value.length / itemsPerPage)
)

// Sayfa değiştirme fonksiyonları
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Arama değiştiğinde, sayfa numarasını sıfırla.
watch(searchQuery, () => {
  currentPage.value = 1
})

onMounted(() => {
  gsap.from(".service-card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".services-container",
      start: "top 90%",
      end: "top 40%",
      toggleActions: "play none none none",
    },
  })
})
</script>

<template>
  <div class="container mx-auto py-20 px-5 lg:px-0 services-container">

    <div v-if="error" class="text-red-500">
      Hata: {{ error.message }}
    </div>

    <!-- Arama kutusu -->
    <div class="mb-6">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Arama yapın..." 
        class="w-full p-2 border rounded"
      />
    </div>

    <!-- Bölgelerin listesi -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="region in paginatedRegions" 
        :key="region.id" 
        class="service-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
      >
        <div class="overflow-hidden mb-4 rounded-lg">
          <NuxtImg
            provider="imgix"
            format="webp"
            quality="50"
            loading="lazy" 
            class="w-full h-64 object-fit transform hover:scale-105 transition-transform" 
            :src="region.image" 
            :alt="region.title" 
          />
        </div>
        <h3 class="text-xl font-bold mb-3">{{ region.title }}</h3>
        <p class="text-gray-600 mb-4">{{ region.excerpt }}</p>
        <NuxtLink 
          :to="`/${region.slug}`" 
          class="flex items-center text-primary hover:text-secondary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right text-primary w-8 h-8 mr-4" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg>
          <span>Devamı...</span>
        </NuxtLink>
      </div>
    </div>

    <div class="flex justify-center mt-8 space-x-4">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1" 
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Önceki
      </button>
      <span>Sayfa {{ currentPage }} / {{ totalPages }}</span>
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages" 
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Sonraki
      </button>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 80%;
  overflow-x: hidden;
}

.service-card h4 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
