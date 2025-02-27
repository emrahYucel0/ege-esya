<script setup lang="ts">
useHead({
  title: 'Bölgelerimiz | Ege Eşya',
  meta: [
    { 
      name: 'description', 
      content: '20+ lokasyonda hizmet veriyoruz. İstanbul, İzmir ve Bursa başta olmak üzere tüm bölgelerde uzman ekibimizle yanınızdayız.' 
    },
    // Open Graph
    { property: 'og:title', content: 'Hizmet Bölgelerimiz | Ege Eşya' },
    { 
      property: 'og:description', 
      content: 'Türkiye genelinde 20+ lokasyonda premium hizmet anlayışı' 
    },
    { 
      property: 'og:image', 
      content: `${useRuntimeConfig().public.siteUrl}/img/bolgelerimiz-og.webp` 
    },
    { property: 'og:url', content: `${useRuntimeConfig().public.siteUrl}/bolgelerimiz` },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Hizmet Alanlarımız | Şirket Adı' },
    { 
      name: 'twitter:description', 
      content: 'Size en yakın lokasyonu bulun ve hizmetlerimizden yararlanın' 
    },
    { 
      name: 'twitter:image', 
      content: `${useRuntimeConfig().public.siteUrl}/img/bolgelerimiz-twitter.webp` 
    },
    { 
      name: 'twitter:image:alt', 
      content: 'Türkiye haritası üzerinde hizmet bölgelerimizin gösterimi' 
    },
    
    // Diğer SEO Meta
    { 
      name: 'keywords', 
      content: 'bölgelerimiz, hizmet alanları, lokasyonlar, şubeler, ofis konumları, çanakkale, izmir, bursa, denizli, istanbul' 
    },
    { name: 'Emrah Yücel', content: 'Ege Eşya' },
    { name: 'robots', content: 'index, follow' }
  ],
  
  link: [
    { 
      rel: 'canonical', 
      href: `${useRuntimeConfig().public.siteUrl}/bolgelerimiz` 
    },
    {
      rel: 'preload',
      href: '/img/bolgelerimiz-map.webp',
      as: 'image'
    }
  ],
  
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Bölgesel Hizmetler",
        "provider": {
          "@type": "Organization",
          "name": "Ege Eşya",
          "logo": `${useRuntimeConfig().public.siteUrl}/logo.webp`
        },
        "areaServed": [
          { "@type": "City", "name": "İstanbul" },
          { "@type": "City", "name": "Bursa" },
          { "@type": "City", "name": "İzmir" }
        ],
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": `${useRuntimeConfig().public.siteUrl}/iletisim`
        }
      })
    }
  ],
  
  htmlAttrs: {
    lang: 'tr'
  }
})
</script>

<template>
  <fixed-page-header   
    title="Bölgelerimiz Sayfası" 
    page="Bölgelerimiz" 
    imageUrl="/img/genel-ana-sayfa.JPG"
    link="/blog"
    linkName="Blog"  
  />
  <navbar-region />
  <base-post-carousel />
</template>