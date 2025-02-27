<script setup lang="ts">
useHead({
  title: 'Ana Sayfa - Ege Eşya',
  meta: [
    {  name:"description", content:"Profesyonel ve güvenilir eşya taşıma hizmetleri! Şehir içi ve şehirler arası nakliyat, asansörlü taşıma ve uygun fiyatlarla hızlı taşınma çözümleri." },
    { name: 'keywords', content: 'eşya taşıma, nakliyat, şehir içi nakliyat, şehirler arası nakliyat, asansörlü taşıma, evden eve nakliyat, güvenilir nakliye, uygun fiyatlı nakliyat, profesyonel taşıma, hızlı taşınma' },
    { name: 'Emrah Yücel', content: 'Ege Eşya' },
    
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Ana Sayfa  - Ege Eşya' },
    { property: 'og:description', content: 'Open Graph açıklaması' },
    { property: 'og:image', content: 'http://localhost:3000/img/genel-ana-sayfa.JPG' },
    { property: 'og:url', content: 'https://example.com/' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@twitter_handle' },
    { name: 'twitter:title', content: 'Ege Eşya Taşıma' },
    { name: 'twitter:description', content: 'Hızlı ve Güvenilir Taşımacılık' },
    { name: 'twitter:image', content: 'http://localhost:3000/img/genel-ana-sayfa.JPG' },
    
    // Diğer
    { name: 'robots', content: 'index, follow' },
    { name: 'revisit-after', content: '7 days' },
  ],

  htmlAttrs: {
    lang: 'tr'
  },

  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.png'
    }
  ],

  // Script etiketleri
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Ege Eşya',
        url: 'https://example.com',
        logo: 'https://example.com/logo.png',
        sameAs: [
          'https://facebook.com/example',
          'https://twitter.com/example',
          'https://linkedin.com/company/example'
        ]
      })
    }
  ],
})
</script>

<template>
  <main>
    <base-hero />
    <base-fact />
    <base-feature />
    <base-pricing />
    <base-testimonial />
  </main>
</template>