<script setup lang="ts">
const config = useRuntimeConfig().public

useHead({
  title: 'Yazılarımız | Ege Eşya',
  meta: [
    { 
      name: 'description', 
      content: 'Sektör haberleri, uzman görüşleri ve güncel bilgiler. Eşya taşıma alanındaki en değerli içerikler burada.' 
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Güncel Yazılar ve Makaleler | Ege Eşya' },
    { 
      property: 'og:description', 
      content: 'Sektörle ilgili en yeni gelişmeler ve derinlemesine analizler' 
    },
    { 
      property: 'og:image', 
      content: `${config.siteUrl}/img/blog-og.webp` 
    },
    { property: 'og:url', content: `${config.siteUrl}/blog` },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Uzman Blog Yazıları | Şirket Adı' },
    { 
      name: 'twitter:description', 
      content: 'Sektörel bilgi birikimimizi paylaştığımız resmi blog sayfamız' 
    },
    { 
      name: 'twitter:image', 
      content: `${config.siteUrl}/img/blog-twitter.webp` 
    },
    { 
      name: 'twitter:image:alt', 
      content: 'Blog yazılarımızın kapak görseli' 
    },
    
    // Diğer SEO Meta
    { 
      name: 'keywords', 
      content: 'blog, makaleler, uzman görüşleri, haberler, parça eşya, ofis taşıma, acil nakliyat, ucuz eşya taşıma, nakliyat firmaları' 
    },
    { name: 'author', content: 'Şirket Adı' },
    { name: 'robots', content: 'index, follow' }
  ],

  link: [
    { 
      rel: 'canonical', 
      href: `${config.siteUrl}/blog` 
    },
    {
      rel: 'preload',
      href: '/img/blog-header.webp',
      as: 'image'
    }
  ],

  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Şirket Adı Blog",
        "url": `${config.siteUrl}/blog`,
        "description": "Sektörel gelişmeler ve uzman görüşleri",
        "publisher": {
          "@type": "Organization",
          "name": "Şirket Adı",
          "logo": {
            "@type": "ImageObject",
            "url": `${config.siteUrl}/logo.webp`
          }
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Ana Sayfa",
              "item": config.siteUrl
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog"
            }
          ]
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
    title="Blog Sayfası" 
    page="Yazılarımız" 
    imageUrl="/img/genel-ana-sayfa.JPG"
    link="/bolgelerimiz"
    linkName="Bölgelerimiz"  
  />
  <navbar-post />
</template>