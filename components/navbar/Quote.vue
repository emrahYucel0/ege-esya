<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useMail, useFetch } from '#imports' // Nuxt composable'ları

// API'den quote verilerini çekiyoruz
const { data: quoteData} = await useFetch('/api/quote')

// Form verileri
const formData = ref({
  name: '',
  email: '',
  phone: '',
  note: '',
})

// Validasyon şeması
const schema = yup.object({
  name: yup.string().required('Adınızı giriniz.'),
  email: yup
    .string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .required('E-posta adresinizi giriniz.'),
  phone: yup
    .string()
    .required('Telefon numaranızı giriniz.')
    .matches(/^[0-9]+$/, 'Geçerli bir telefon numarası giriniz.'),
  note: yup.string().required('Özel notunuzu giriniz.'),
})

// Nuxt mail composable'ını kullanıyoruz
const mail = useMail()

// Form gönderimi
const onSubmit = async (values, { resetForm }) => {
  try {
    const response = await mail.send({
      from: "info@demomailtrap.com",
      subject: 'Yeni Teklif Talebi',
      text: `
        İsim: ${values.name}
        E-posta: ${values.email}
        Telefon: ${values.phone}
        Not: ${values.note}
      `,
    });

    console.log('Mail gönderildi:', response);
    alert('Form başarıyla gönderildi!');
    resetForm();
  } catch (error) {
    console.error('Mail gönderme hatası:', error.response?.body || error.message);
    alert(`Hata: ${error.response?.body || error.message}`);
  }
}

</script>

<template>
  <div class="container mx-auto py-20 px-5 lg:px-0">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <!-- Sol Taraf: Dinamik Metin ve İletişim Bilgileri -->
      <div class="quote-text">
        <h6 class="text-secondary uppercase font-semibold text-lg">
          {{ quoteData?.subtitle || 'Teklif Alın' }}
        </h6>
        <h2 class="text-4xl font-bold mb-5">
          {{ quoteData?.title || 'Ücretsiz Teklif İsteği!' }}
        </h2>
        <p class="text-gray-700 mb-5">
          {{ quoteData?.description || 'Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo erat amet.' }}
        </p>
        <div class="flex items-center space-x-4">
          <div class="bg-primary p-3 rounded-full text-white">
            <i class="fas fa-headphones fa-2x"></i>
          </div>
          <div>
            <h6 class="text-gray-600">
              {{ quoteData?.phoneLabel || 'Her türlü soru için bizi arayın!' }}
            </h6>
            <h3 class="text-primary text-2xl font-bold">
              {{ quoteData?.phone || '+012 345 6789' }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Sağ Taraf: Form -->
      <div class="quote-form bg-light p-8 rounded-lg shadow-lg">
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
          <div class="grid grid-cols-1 gap-6">
            <!-- Ad -->
            <div class="col-span-1">
              <Field
                name="name"
                type="text"
                class="w-full p-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Adınız"
                :class="{ 'border-2 border-red-500': errors.name }"
              />
              <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
            </div>

            <!-- E-posta -->
            <div class="col-span-1">
              <Field
                name="email"
                type="email"
                class="w-full p-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="E-posta Adresiniz"
                :class="{ 'border-2 border-red-500': errors.email }"
              />
              <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
            </div>

            <!-- Telefon -->
            <div class="col-span-1">
              <Field
                name="phone"
                type="text"
                class="w-full p-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Telefon Numaranız"
                :class="{ 'border-2 border-red-500': errors.phone }"
              />
              <ErrorMessage name="phone" class="text-red-500 text-sm mt-1" />
            </div>

            <!-- Özel Not -->
            <div class="col-span-1">
              <Field
                as="textarea"
                name="note"
                class="w-full p-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Özel Not"
                rows="4"
                :class="{ 'border-2 border-red-500': errors.note }"
              />
              <ErrorMessage name="note" class="text-red-500 text-sm mt-1" />
            </div>

            <!-- Gönder Butonu -->
            <div class="col-span-1">
              <button
                type="submit"
                class="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all"
              >
                Gönder
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style>
@media (max-width: 640px) {
  .quote-form {
    padding: 16px;
  }
  .quote-text {
    padding: 16px;
  }
}

.container {
  max-width: 80%;
  overflow-x: hidden;
}
</style>

