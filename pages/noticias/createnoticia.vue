<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
    <h1 class="text-2xl font-bold mb-6">Crear Noticia</h1>
    <form @submit.prevent="enviarNoticia">
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-1">Foto (URL)</label>
        <input v-model="foto" type="text" class="input" placeholder="https://..." required />
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
        <label class="block text-sm font-semibold mb-1">Fecha</label>
        <input v-model="fecha" type="date" class="input" required />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-semibold mb-1">Categoría</label>
        <input v-model="categoria" type="text" class="input" placeholder="Ej. Política, Turismo, Salud..." required />
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Publicar Noticia
      </button>
    </form>

    <p v-if="mensaje" class="mt-4 text-green-600 font-medium">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

const foto = ref('')
const titular = ref('')
const descripcion = ref('')
const fecha = ref('')
const categoria = ref('')
const mensaje = ref('')

const enviarNoticia = async () => {
  const { data, error } = await useFetch('/api/noticias', {
    method: 'POST',
    body: {
      foto: foto.value,
      titular: titular.value,
      descripcion: descripcion.value,
      fecha: new Date(fecha.value),
      categoria: categoria.value
    }
  })

  if (error.value) {
    alert('❌ Error al crear la noticia')
  } else {
    mensaje.value = '✅ Noticia creada exitosamente'
    // Limpiar campos
    foto.value = ''
    titular.value = ''
    descripcion.value = ''
    fecha.value = ''
    categoria.value = ''
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
