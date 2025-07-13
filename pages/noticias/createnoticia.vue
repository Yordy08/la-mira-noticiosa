<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
    <h1 class="text-2xl font-bold mb-6">Crear Noticia</h1>

    <form @submit.prevent="enviarNoticia">
      <!-- Subir imagen -->
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">Foto (subir imagen)</label>
        <input type="file" @change="subirImagen" accept="image/*" class="input" required />
        <p v-if="subiendoImagen" class="text-sm text-gray-500">Subiendo imagen...</p>
        <img v-if="foto" :src="foto" alt="Vista previa" class="mt-2 rounded-md max-h-40" />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">Titular</label>
        <input v-model="titular" type="text" class="input" placeholder="Título de la noticia" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">Descripción</label>
        <textarea v-model="descripcion" class="input" rows="4" placeholder="Contenido de la noticia" required></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">Meta descripción</label>
        <input v-model="metaDescripcion" type="text" class="input" placeholder="Resumen para Google y redes" required />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">Frase clave objetivo</label>
        <input v-model="fraseClave" type="text" class="input" placeholder="Ej: turismo en San Antero" />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-semibold mb-1">Categoría</label>
        <select v-model="categoria" class="input" required>
          <option disabled value="">Selecciona una categoría</option>
          <option>Nacional</option>
          <option>Internacional</option>
          <option>Política</option>
          <option>Economía</option>
          <option>Salud</option>
          <option>Educación</option>
          <option>Cultura</option>
          <option>Deportes</option>
          <option>Tecnología</option>
          <option>Judicial</option>
          <option>Medio Ambiente</option>
          <option>Denuncias Ciudadanas</option>
          <option>Opinión</option>
          <option>Viral</option>
          <option>Turismo</option>
        </select>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" :disabled="subiendoImagen">
        Publicar Noticia
      </button>
    </form>

    <p v-if="mensaje" class="mt-4 text-green-600 font-medium">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'
import slugify from 'slugify'

const foto = ref('')
const titular = ref('')
const descripcion = ref('')
const categoria = ref('')
const metaDescripcion = ref('')
const fraseClave = ref('')
const mensaje = ref('')
const subiendoImagen = ref(false)

const subirImagen = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  subiendoImagen.value = true
  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al subir imagen')
    foto.value = data.url
  } catch (err) {
    alert('❌ Error al subir imagen')
  } finally {
    subiendoImagen.value = false
  }
}

const enviarNoticia = async () => {
  if (!foto.value) return alert('Debes subir una imagen primero')
  const slug = slugify(titular.value, { lower: true, strict: true })

  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const { data, error } = await useFetch('/api/noticias', {
    method: 'POST',
    body: {
      foto: foto.value,
      titular: titular.value,
      descripcion: descripcion.value,
      fecha: hoy,
      categoria: categoria.value,
      metaDescripcion: metaDescripcion.value,
      fraseClave: fraseClave.value,
      slug: slug,
    },
  })

  if (error.value) {
    alert('❌ Error al crear la noticia')
  } else {
    mensaje.value = '✅ Noticia creada exitosamente'
    foto.value = ''
    titular.value = ''
    descripcion.value = ''
    categoria.value = ''
    metaDescripcion.value = ''
    fraseClave.value = ''
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
}
</style>
