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
        host: process.env.MAIL_HOST || "",
        port: Number(process.env.MAIL_PORT || 587),
              // @ts-ignore: Bu özellik tipi tarafından tanınmıyor ama STARTTLS için gerekli.
        secure: process.env.MAIL_SECURE === "true",
        auth: {
          user: process.env.MAIL_USER || "",
          pass: process.env.MAIL_PASSWORD || "",
        },

      },
      message: {
        from: process.env.MAIL_FROM || "",
        to: process.env.MAIL_TO || "",
      },
    },
    public: {
      mailFrom: process.env.MAIL_FROM || "",
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
