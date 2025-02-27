<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showScrollButton = ref(false)

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 100
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- WhatsApp Butonu -->
    <a href="https://wa.me/900000000000" target="_blank" class="whatsapp-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
        <path d="M13.6 2.4A7.8 7.8 0 0 0 8 0 8 8 0 0 0 .4 10.9L0 16l5.2-1.3a8 8 0 0 0 3.8 1 7.8 7.8 0 0 0 7.8-7.8c0-2.1-.8-4.1-2.2-5.5zM8 14.3c-1.3 0-2.6-.3-3.7-.9l-.3-.2-3 .8.8-2.9-.2-.3A6.6 6.6 0 0 1 1.4 8 6.6 6.6 0 0 1 8 1.4 6.6 6.6 0 0 1 14.6 8 6.6 6.6 0 0 1 8 14.3zm3.7-4.6c-.2-.1-1.3-.7-1.4-.8-.2-.1-.3-.2-.4 0l-.6.6c-.1.1-.3.1-.4 0-.1 0-.6-.2-1.1-.7-.4-.4-.7-.9-.8-1.1 0-.1 0-.3.1-.3l.5-.6c.1-.1.1-.2 0-.4-.1-.1-.3-.8-.4-1-.1-.2-.2-.2-.3-.2H6.1c-.1 0-.3 0-.4.2-.2.2-.5.5-.5 1.2 0 .6.5 1.3.6 1.4l.1.1a4.7 4.7 0 0 0 3.5 2.4c.4 0 .7 0 1-.3.3-.3.9-.8.9-1.3.1-.4 0-.5 0-.5z"/>
      </svg>
    </a>

    <!-- Sayfayı Yukarı Kaydırma Butonu -->
    <svg xmlns="http://www.w3.org/2000/svg" v-show="showScrollButton" @click="scrollToTop" width="16" height="16" fill="currentColor" class="bi bi-arrow-up scroll-to-top text-secondary" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
</svg>
  </div>
</template>


<style>

/* WhatsApp Butonu */
.whatsapp-button {
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 55px;
  height: 55px;
  background-color: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.whatsapp-button:hover {
  background-color: #1ebe5d;
  transform: scale(1.1);
}

/* Yukarı Çık Butonu */
.scroll-to-top {
  position: fixed;
  bottom: 30px; 
  right: 25px;
  width: 40px;
  height: 40px;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;
  opacity: 0.9;
  z-index: 999;
}

.scroll-to-top:hover {
  background-color: #444;
  transform: scale(1.1);
}

:root {
    --primary: #ff7b00;
    --secondary: #51CFED;
    --light: #F8F2F0;
    --dark: #060315;
}

/* 1️⃣ Genel Font Ailesi */
html {
  font-size: 16px; /* 1rem olarak baz alınır */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* 2️⃣ Genel Gövde Ayarları */
body {
  font-size: 18px; /* Varsayılan okunabilir boyut */
  line-height: 1.7; /* Daha iyi okunabilirlik */
  color: #333; /* Kontrast için koyu gri */
  background-color: #fff;
}

/* 3️⃣ Başlık Boyutları */
h1 { font-size: 2.5rem; font-weight: 700; line-height: 1.3; }
h2 { font-size: 2rem; font-weight: 700; line-height: 1.4; }
h3 { font-size: 1.75rem; font-weight: 600; line-height: 1.4; }
h4 { font-size: 1.5rem; font-weight: 600; }
h5 { font-size: 1.25rem; font-weight: 500; }
h6 { font-size: 1rem; font-weight: 500; }

/* 4️⃣ Paragraf ve Metin Stili */
p {
  font-size: 1.125rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}
strong { font-weight: 700; }
em { font-style: italic; }

/* 5️⃣ Bağlantı ve Buton Stili */
a {
  color: #ff7b00;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

button {
  font-size: 1.125rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
button:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(255, 123, 0, 0.5);
}

/* 6️⃣ Mobil Uyumluluk */
@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  p { font-size: 1rem; }
  .container{max-width: 80%;}
}

@media (min-width: 768px) {
  .mobile-call {
    display: none;
  }
}

/* Mobilde sadece bağlantıyı göster */
@media (max-width: 767px) {
  .phone {
    display: none;
  }
}

.btn-primary {
  background-color: #ff7b00;
  color: white;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s;
}
.btn-primary:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 20px rgba(255, 123, 0, 0.5);
}
.btn-secondary {
  background-color: white;
  color: #ff7b00;
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s;
}
.btn-secondary:hover {
  transform: scale(1.1);
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.5);
}

blockquote {
  position: relative;
  padding: 20px 30px;
  margin: 30px 0;
  font-size: 1.2rem;
  font-style: italic;
  color: #555;
  background-color: #f9f9f9;
  border-left: 5px solid #51CFED;
  border-radius: 8px;
}

blockquote p {
  margin: 0;
}

blockquote::before,
blockquote::after {
  content: '"';
  font-size: 2rem;
  color: #51CFED;
  position: absolute;
}

blockquote::before {
  top: 10px;
  left: 10px;
}

blockquote::after {
  bottom: 10px;
  right: 10px;
}

</style>
