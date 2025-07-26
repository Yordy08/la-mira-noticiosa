<template>
  <div class="bg-light py-5">
    <div class="container">
      <h2 class="text-danger fw-bold text-center mb-4">📰 Noticias Destacadas</h2>
      <p class="text-center text-muted mb-5">
          ¡Enhorabuena! Estas son las noticias con mayor impacto.
      </p>

      <div class="row g-4">
        <div v-for="noticia in destacadas" :key="noticia.id" class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm">
            <img
              :src="noticia.foto"
              class="card-img-top"
              :alt="noticia.titular"
              style="max-height: 200px; object-fit: cover"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-dark fw-bold">
                {{ noticia.titular }}
              </h5>
              <p class="card-text text-muted small mb-2">
                {{ extraerTextoPlano(noticia.descripcion, 120) }}
              </p>
              <NuxtLink
                :to="`/noticias/${noticia.slug}`"
                class="btn btn-outline-danger btn-sm mt-auto"
              >
                Leer más
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { computed } from 'vue'

const { data } = await useFetch('/api/noticias')

// Categorías visibles
const categorias = [
  'Nacional', 'Internacional', 'Política', 'Economía', 'Salud', 'Educación',
  'Cultura', 'Deportes', 'Tecnología', 'Judicial', 'Medio Ambiente',
  'Denuncias Ciudadanas', 'Opinión', 'Viral', 'Turismo'
]

const todas = computed(() =>
  Array.isArray(data.value) ? data.value : data.value?.noticias || []
)

const destacadas = computed(() => {
  const resultado = []
  for (const categoria of categorias) {
    const noticiasDeCategoria = todas.value
      .filter(n => n.categoria?.toLowerCase() === categoria.toLowerCase())
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    if (noticiasDeCategoria.length > 0) {
      resultado.push(noticiasDeCategoria[0])
    }
  }
  return resultado
})

// Extrae texto plano del HTML (seguro para SSR)
const extraerTextoPlano = (html, maxLength = 100) => {
  if (!html) return ''
  if (typeof window === 'undefined') {
    return html.replace(/<[^>]*>/g, '').slice(0, maxLength) + '...'
  }
  const temp = document.createElement('div')
  temp.innerHTML = html
  const texto = temp.textContent || temp.innerText || ''
  return texto.slice(0, maxLength) + '...'
}
</script>
