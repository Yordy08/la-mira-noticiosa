<template>
  <div v-if="noticiasFiltradas.length">
    <h3 class="mb-3 text-danger border-bottom pb-1">{{ categoria }}</h3>
    <div class="row row-cols-1 row-cols-md-3 g-4 mb-5">
      <div v-for="noticia in noticiasFiltradas" :key="noticia.id" class="col">
        <NuxtLink :to="`/noticias/${noticia.slug}`" class="text-decoration-none">
          <div class="card h-100 shadow-sm hover-shadow">
            <img :src="noticia.foto" class="card-img-top" style="object-fit: cover; height: 180px" />
            <div class="card-body">
              <h5 class="card-title text-dark">{{ noticia.titular }}</h5>
              <p class="card-text">{{ extraerTextoPlano(noticia.descripcion, 100) }}</p>
              <p class="btn btn-outline-danger btn-sm mt-2">Leer más</p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFetch } from '#app'

const props = defineProps({
  categoria: String
})

const { data } = await useFetch('/api/noticias')

const noticias = computed(() =>
  Array.isArray(data.value) ? data.value : data.value?.noticias || []
)

const noticiasFiltradas = computed(() =>
  noticias.value
    .filter(n => n.categoria?.toLowerCase() === props.categoria.toLowerCase())
    .slice(0, 6)
)

const extraerTextoPlano = (html, maxLength = 100) => {
  if (!html) return ''
  if (typeof window === 'undefined') {
    // ✅ Modo servidor (SSR): eliminar etiquetas con regex
    return html.replace(/<[^>]*>/g, '').slice(0, maxLength) + '...'
  }
  // ✅ Modo cliente: usar DOM
  const temp = document.createElement('div')
  temp.innerHTML = html
  const texto = temp.textContent || temp.innerText || ''
  return texto.slice(0, maxLength) + '...'
}
</script>

<style scoped>
.card:hover {
  transform: scale(1.01);
  transition: transform 0.2s ease;
  cursor: pointer;
}

.card-title {
  font-size: 1.1rem;
}

.card-body p.btn {
  pointer-events: none; /* Para que el botón no capture el click, sino el NuxtLink */
  margin-bottom: 0;
}
</style>
