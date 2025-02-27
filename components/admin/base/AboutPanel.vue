<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useFetch } from '#app'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'

// --- Hakkımızda Veri Modeli ---
const about = ref({
  id: null,
  title: '',
  subtitle: '',
  content: '',
  image: ''
})

// --- TipTap Editör Ayarları ---
const editor = ref(null)
onMounted(() => {
  editor.value = new Editor({
    content: about.value.content,
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Image.configure({ inline: true, allowBase64: true }),
    ],
    onUpdate: () => {
      about.value.content = editor.value.getHTML()
    }
  })
})
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// --- API'den Hakkımızda Verisini Çek ---
const { data: aboutData, error: aboutError, refresh } = useFetch('/api/about')
if (aboutData.value && aboutData.value.success) {
  about.value = { ...aboutData.value.data }
  if (editor.value) {
    editor.value.commands.setContent(about.value.content)
  }
}

// --- Modal Kontrolleri ---
const showEditModal = ref(false)
const showDeleteModal = ref(false)

// --- Görsel İşlemleri ---
// FileUploader bileşeninden gelen event ile görsel URL'sini güncelle
const updateImageUrl = (url) => {
  about.value.image = url
}
// Manuel resim ekleme: URL'yi prompt ile alır ve editöre ekler
const addImage = () => {
  let url = prompt("Eklemek istediğiniz resmin URL'sini giriniz:")
  if (url && editor.value) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

// --- Form Gönderimi ---
// Hakkımızda kaydı mevcutsa güncelleme (PUT), yoksa oluşturma (POST)
const submitForm = async () => {
  try {
    const method = about.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/about', {
      method,
      body: about.value
    })
    if (!response || !response.success) {
      throw new Error(response.error || 'Geçersiz API yanıtı')
    }
    about.value = { ...response.data }
    if (editor.value) {
      editor.value.commands.setContent(about.value.content)
    }
    showEditModal.value = false
  } catch (err) {
    console.error('Form Gönderim Hatası:', err)
    alert('İşlem başarısız: ' + err.message)
  }
}

// --- Silme İşlemi ---
const deleteAbout = async () => {
  try {
    const response = await $fetch('/api/about', { method: 'DELETE' })
    if (!response.success) {
      throw new Error(response.error)
    }
    about.value = { id: null, title: '', subtitle: '', content: '', image: '' }
    if (editor.value) {
      editor.value.commands.clearContent()
    }
    showDeleteModal.value = false
  } catch (err) {
    console.error('Silme Hatası:', err)
    alert('Hakkımızda kaydı silinirken hata oluştu: ' + err.message)
  }
}

const { data, pending, error } = useFetch('/api/about');

</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Başlık ve Düzenleme Butonu -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Hakkımızda Yönetim Paneli</h1>
      <button 
        @click="showEditModal = true"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Düzenle
      </button>
    </div>

    <!-- Hakkımızda Bilgileri -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row gap-6">
        <div class="md:w-1/3">
          <img 
            :src="data.data?.image || '/img/about.jpg'" 
            alt="Hakkımızda Görseli"
            class="w-full h-48 object-cover rounded"
          >
        </div>
        <div class="md:w-2/3">
          <h2 class="text-xl font-semibold mb-2">{{ data.data?.title }}</h2>
          <h3 class="text-lg mb-4">{{ data.data?.subtitle }}</h3>
          <div v-html="data.data?.content" class="text-gray-700"></div>
        </div>
      </div>
    </div>

    <!-- Düzenleme Modalı -->
    <div 
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Hakkımızda Düzenle</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Başlık ve Alt Başlık -->
          <div>
            <label class="block mb-2 font-medium">Başlık</label>
            <input 
              v-model="about.title" 
              type="text" 
              class="w-full p-2 border rounded"
              required
            >
          </div>
          <div>
            <label class="block mb-2 font-medium">Alt Başlık</label>
            <input 
              v-model="about.subtitle" 
              type="text" 
              class="w-full p-2 border rounded"
              required
            >
          </div>
          <!-- Görsel URL ve FileUploader -->
          <div>
            <label class="block mb-2 font-medium">Görsel URL</label>
            <input 
              v-model="about.image" 
              type="text" 
              class="w-full p-2 border rounded"
              required
            >
          </div>
          <div class="mb-4">
            <FileUploader @file-uploaded="updateImageUrl" />
          </div>
          <!-- İçerik Editörü -->
          <div>
            <label class="block mb-2 font-medium">İçerik</label>
            <div class="border rounded p-2 min-h-[200px]">
              <div v-if="editor" class="editor-toolbar flex flex-wrap gap-2 p-2 border-b">
                <button @click.prevent="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                  H1
                </button>
                <button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                  H2
                </button>
                <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                  H3
                </button>
                <button @click.prevent="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                  Kalın
                </button>
                <button @click.prevent="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                  İtalik
                </button>
                <button @click.prevent="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                  Altı Çizili
                </button>
                <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                  Madde Listesi
                </button>
                <button @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                  Numara Listesi
                </button>
                <button @click.prevent="addImage" type="button">
                  Resim Ekle
                </button>
              </div>
              <editor-content :editor="editor" class="ProseMirror" />
            </div>
          </div>
          <!-- Form Butonları -->
          <div class="flex justify-end space-x-3">
            <button 
              type="button"
              @click="showEditModal = false"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              İptal
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {{ about.id ? 'Güncelle' : 'Oluştur' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div 
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6">
        <h3 class="text-lg font-bold mb-4">Hakkımızda Kaydını Sil</h3>
        <p class="mb-4">Bu kaydı kalıcı olarak silmek istediğinize emin misiniz?</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            İptal
          </button>
          <button 
            @click="deleteAbout"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.editor-toolbar button {
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}
.editor-toolbar button:hover {
  background-color: #e5e7eb;
}
.editor-toolbar button.is-active {
  background-color: #dbeafe;
  color: #1d4ed8;
}
</style>
