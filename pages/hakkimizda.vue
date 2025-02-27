<script setup lang="ts">
useHead({
  title: 'Hakkımızda | Ege Eşya',
  meta: [
    { 
      name: 'description', 
      content: '20 yılı aşkın deneyimimizle taşımacılık alanında hizmet veriyoruz. Misyonumuz ve vizyonumuz hakkında detaylı bilgi.'
    },
    // Open Graph
    { property: 'og:title', content: 'Hakkımızda | Ege Eşya' },
    { 
      property: 'og:description', 
      content: 'Profesyonel ekibimiz ve sektör deneyimimizle hakkımızda daha fazla bilgi edinin' 
    },
    { 
      property: 'og:image', 
      content: 'http://localhost:3000/img/genel-ana-sayfa.JPG' // Mutlaka absolute URL kullanın
    },
    { property: 'og:url', content: 'https://example.com/hakkimizda' },
    
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Hakkımızda | Şirket Adı' },
    { 
      name: 'twitter:description', 
      content: 'Şirket profili ve temel değerlerimiz' 
    },
    { 
      name: 'twitter:image', 
      content: 'http://localhost:3000/img/genel-ana-sayfa.JPG' 
    },
    { 
      name: 'twitter:image:alt', 
      content: 'Şirket binamız ve ekibimizin genel görünümü' 
    },
    
    // Diğer SEO Meta
    { name: 'robots', content: 'index, follow' },
    { 
      name: 'keywords', 
      content: 'hakkımızda, şirket tarihçesi, misyon, vizyon, ekibimiz, iletişim' 
    },
    { name: 'Emrah Yücel', content: 'Ege Eşya' }
  ],
  
  link: [
    { 
      rel: 'canonical', 
      href: 'https://example.com/hakkimizda' 
    },
    // Sosyal Medya için Favicon
    { 
      rel: 'apple-touch-icon', 
      href: '/apple-touch-icon.png', 
      sizes: '180x180' 
    }
  ],
  
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Hakkımızda",
        "description": "Şirketimizin tarihçesi ve temel değerleri",
        "publisher": {
          "@type": "Organization",
          "name": "Ege Eşya",
          "logo": {
            "@type": "ImageObject",
            "url": "https://example.com/logo.png"
          }
        }
      })
    }
  ],
  
  htmlAttrs: {
    lang: 'tr'
  }
})

// Runtime config için nuxt.config.ts'de tanımlayın
const config = useRuntimeConfig()
</script>

<template>
  <fixed-page-header     
    title="Hakkımızda Sayfası" 
    page="Hakkımızda" 
    imageUrl="/img/genel-ana-sayfa.JPG"
    link="/iletisim"
    linkName="İletişim"  
  />
  <navbar-about />
</template>