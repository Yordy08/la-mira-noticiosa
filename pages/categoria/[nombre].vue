<template>
  <div class="container py-4">
    <h2 class="mb-4 text-danger">
      🗂 Información:"{{ nombreCategoria }}"
    </h2>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-danger" role="status"></div>
    </div>

    <div v-else-if="filtradas.length === 0" class="alert alert-warning">
      No se encontraron noticias para esta categoría.
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" v-else>
      <div v-for="noticia in filtradas" :key="noticia.id" class="col">
        <div class="card h-100 shadow-sm">
          <img :src="noticia.foto" class="card-img-top" style="height: 180px; object-fit: cover;" />
          <div class="card-body">
  <h5 class="card-title">{{ noticia.titular }}</h5>
  <p class="card-text">{{ extraerTextoPlano(noticia.descripcion, 100) }}</p>

  <NuxtLink :to="`/noticias/${noticia.slug}`" class="btn btn-danger btn-sm">Leer más</NuxtLink>
</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useFetch } from '#app'

const route = useRoute()
const nombreCategoria = computed(() => decodeURIComponent(route.params.nombre))
const loading = ref(true)

const { data } = await useFetch('/api/noticias')
const noticias = computed(() => Array.isArray(data.value) ? data.value : data.value?.noticias || [])

const filtradas = computed(() =>
  noticias.value.filter(n => n.categoria?.toLowerCase() === nombreCategoria.value.toLowerCase())
)
const extraerTextoPlano = (html, maxLength = 100) => {
  if (!html) return ''
  const temp = document.createElement('div')
  temp.innerHTML = html
  const texto = temp.innerText || temp.textContent || ''
  return texto.slice(0, maxLength) + '...'
}

watch(() => route.params.nombre, () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 300)
})

loading.value = false
</script>
