<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFetch } from '#app'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'

// --- Hero Veri Modeli ---
const hero = ref({
  id: null,
  title: '',
  subtitle: '',
  description: '',
  primaryButton: '',
  primaryLink: '',
  secondaryButton: '',
  secondaryLink: '',
  image: ''
})

// --- TipTap Editor (Açıklama alanı için) ---
const editor = ref(null)

onMounted(async () => {
  // Editor'u başlat
  editor.value = new Editor({
    content: hero.value.description,
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline
    ],
    onUpdate: ({ editor }) => {
      hero.value.description = editor.getHTML()
    }
  })

  // API'den mevcut Hero verisini çek
  const { data, error } = await useFetch('/api/hero')
  if (!error.value && data.value.success && data.value.data) {
    hero.value = data.value.data
    // Editor içeriğini güncelle
    if (editor.value) {
      editor.value.commands.setContent(hero.value.description || '')
    }
  }
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// --- Form Gönderme İşlemi ---
const submitForm = async () => {
  try {
    // Eğer kayıt varsa PUT, yoksa POST metodu kullanılacak
    const method = hero.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/hero', {
      method,
      body: hero.value
    })
    if (response.success) {
      hero.value = response.data
      alert('Hero bölümü başarıyla kaydedildi.')
    } else {
      alert('Hata: ' + response.error)
    }
  } catch (err) {
    console.error(err)
    alert('Form gönderilirken bir hata oluştu.')
  }
}

// --- Dosya Yükleyici Event İşleyicisi ---
// FileUploader bileşeninden gelen URL'i hero.image alanına aktarıyoruz.
const updateImageUrl = (url) => {
  hero.value.image = url
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Hero Yönetim Paneli</h1>
    
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Başlık & Alt Başlık -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Başlık</label>
          <input 
            v-model="hero.title" 
            type="text" 
            class="w-full p-2 border rounded" 
            required 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Alt Başlık</label>
          <input 
            v-model="hero.subtitle" 
            type="text" 
            class="w-full p-2 border rounded" 
          />
        </div>
      </div>

      <!-- Açıklama (Rich Text Editor) -->
      <div>
        <label class="block mb-2 font-medium">Açıklama</label>
        <div class="border rounded p-2">
          <div v-if="editor" class="editor-toolbar mb-2">
            <button 
              type="button"
              @click.prevent="editor.chain().focus().toggleBold().run()" 
              :class="{ 'is-active': editor.isActive('bold') }"
              class="px-2 py-1 border rounded"
            >
              Kalın
            </button>
            <button 
              type="button"
              @click.prevent="editor.chain().focus().toggleItalic().run()" 
              :class="{ 'is-active': editor.isActive('italic') }"
              class="px-2 py-1 border rounded"
            >
              İtalik
            </button>
            <button 
              type="button"
              @click.prevent="editor.chain().focus().toggleUnderline().run()" 
              :class="{ 'is-active': editor.isActive('underline') }"
              class="px-2 py-1 border rounded"
            >
              Altı Çizili
            </button>
          </div>
          <editor-content :editor="editor" class="prose max-w-none" />
        </div>
      </div>

      <!-- Birincil Buton Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">Birincil Buton Metni</label>
          <input 
            v-model="hero.primaryButton" 
            type="text" 
            class="w-full p-2 border rounded" 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Birincil Buton Linki</label>
          <input 
            v-model="hero.primaryLink" 
            type="text" 
            class="w-full p-2 border rounded" 
          />
        </div>
      </div>

      <!-- İkincil Buton Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-2 font-medium">İkincil Buton Metni</label>
          <input 
            v-model="hero.secondaryButton" 
            type="text" 
            class="w-full p-2 border rounded" 
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">İkincil Buton Linki</label>
          <input 
            v-model="hero.secondaryLink" 
            type="text" 
            class="w-full p-2 border rounded" 
          />
        </div>
      </div>

      <!-- Görsel Ayarları -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <label class="block mb-2 font-medium">Görsel URL</label>
          <input 
            v-model="hero.image" 
            type="text" 
            class="w-full p-2 border rounded" 
            readonly 
          />
        </div>
        <div>
          <!-- FileUploader bileşeni; dosya yüklendikten sonra updateImageUrl tetiklenecek -->
          <FileUploader @file-uploaded="updateImageUrl" />
        </div>
      </div>

      <!-- Kaydet Butonu -->
      <div class="flex justify-end">
        <button 
          type="submit" 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {{ hero.id ? 'Güncelle' : 'Oluştur' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* TipTap Editor için temel stiller */
.ProseMirror {
  min-height: 200px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.ProseMirror:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

/* Editor Toolbar */
.editor-toolbar {
  display: flex;
  gap: 0.5rem;
}

.editor-toolbar button {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.editor-toolbar button.is-active {
  background-color: #bfdbfe;
  border-color: #3b82f6;
  color: #1e3a8a;
}
</style>
