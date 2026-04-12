<template>
  <div class="container py-4">

    <!-- Título -->
    <div class="mb-4">
      <h2 class="fw-bold">Enviar Noticias por SMS</h2>
      <p class="text-muted">
        Esta vista enviará el mensaje a todos los contactos registrados.
      </p>
    </div>

    <!-- Formulario -->
    <div class="card shadow-sm p-4">

      <div class="mb-3">
        <label class="form-label">Título</label>
        <input
          v-model="form.titulo"
          type="text"
          class="form-control"
          placeholder="Ej: Accidente en Montería"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Contexto corto</label>
        <textarea
          v-model="form.contexto"
          class="form-control"
          rows="4"
          placeholder="Escribe un resumen corto..."
        ></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">Slug de la noticia</label>
        <input
          v-model="form.slug"
          type="text"
          class="form-control"
          placeholder="accidente-en-monteria"
        >
      </div>

      <!-- Vista previa -->
      <div class="alert alert-info">
        <strong>Vista previa:</strong><br>

        {{ form.titulo }} -
        {{ form.contexto }}

        Leer completo en:

        https://tusitio.com/noticias/{{ form.slug }}
      </div>

      <button
        class="btn btn-success"
        @click="enviarSMS"
        :disabled="cargando"
      >
        {{ cargando ? 'Enviando...' : 'Enviar a Todos los Contactos' }}
      </button>

    </div>

    <!-- Resultado -->
    <div
      v-if="mensaje"
      class="alert alert-success mt-4"
    >
      {{ mensaje }}
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const cargando = ref(false)
const mensaje = ref('')

const form = ref({
  titulo: '',
  contexto: '',
  slug: ''
})

const enviarSMS = async () => {
  try {
    cargando.value = true
    mensaje.value = ''

    const payload = {
      titulo: form.value.titulo,
      contexto: form.value.contexto,
      slug: form.value.slug
    }

    const res = await $fetch('/api/contactos/enviar', {
      method: 'POST',
      body: payload
    })

    mensaje.value = res.mensaje

    form.value = {
      titulo: '',
      contexto: '',
      slug: ''
    }

  } catch (error) {
    alert('Error al enviar mensajes')
  } finally {
    cargando.value = false
  }
}
</script>