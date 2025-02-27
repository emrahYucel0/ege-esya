// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    "@prisma/nuxt",
    'nuxt-mail'
  ],

  ssr: true, 
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'tr'
      },
    },
  },

  runtimeConfig: {
    mail: {
      smtp: {
        host: "live.smtp.mailtrap.io",
        port: 587,
              // @ts-ignore: Bu özellik tipi tarafından tanınmıyor ama STARTTLS için gerekli.
        secure: false,
        auth: {
          user: "***REMOVED***", // Kullanıcı adı düzeltildi
          pass: "***REMOVED***",
        },

      },
      message: {
        from: "hello@demomailtrap.com",
        to: "<REMOVED_EMAIL>",
      },
    },
    public: {
      mailFrom: "info@demomailtrap.com",
    },
  },

  image: {
    imgix: {
      baseURL: '/'
    },
    quality: 70,
    format: ['webp'],
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  },
  
})
