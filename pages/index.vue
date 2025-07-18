<template>
  <div class="promo-container">
    <!-- Banner principal (clicable completo) -->
    <NuxtLink
      v-if="noticias[0]"
      :to="`/noticias/${noticias[0].slug}`"
      class="promo-main text-decoration-none"
    >
      <img :src="noticias[0].foto" :alt="noticias[0].titular" />
      <div class="text-box">
        <h2>{{ noticias[0].titular }}</h2>
        <p>{{ extraerTextoPlano(noticias[0].descripcion, 90) }}</p>
        <span class="btn-link">Leer más</span>
      </div>
    </NuxtLink>

    <!-- Noticias secundarias (cada una clicable) -->
    <div class="promo-side">
      <NuxtLink
        v-for="(noticia, index) in noticias.slice(1, 3)"
        :key="noticia.id"
        :to="`/noticias/${noticia.slug}`"
        class="promo-box text-decoration-none"
      >
        <img :src="noticia.foto" :alt="noticia.titular" />
        <div class="text-box small">
          <small>🟢 Última Noticia</small>
          <h3>{{ noticia.titular }}</h3>
          <span class="btn-mini">Leer más</span>
        </div>
      </NuxtLink>
    </div>
  </div>

  <!-- Sección por categorías -->
  <div class="container py-5">
    <NoticiasPorCategoria v-for="cat in categorias" :key="cat" :categoria="cat" />
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { computed } from 'vue'
import NoticiasPorCategoria from '@/components/NoticiasPorCategoria.vue'

const { data } = await useFetch('/api/noticias')

// ✅ Excluir noticias de la categoría "Empleo"
const todas = computed(() =>
  Array.isArray(data.value) ? data.value : data.value?.noticias || []
)

const noticias = computed(() =>
  [...todas.value]
    .filter(n => n.categoria?.toLowerCase() !== 'empleo')
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, 3)
)

// ✅ Categorías visibles
const categorias = [
  'Nacional', 'Internacional', 'Política', 'Economía', 'Salud', 'Educación', 'Cultura',
  'Deportes', 'Tecnología', 'Judicial', 'Medio Ambiente', 'Denuncias Ciudadanas',
  'Opinión', 'Viral', 'Turismo'
]

// ✅ Función segura para extraer texto plano del HTML (evita errores en SSR)
const extraerTextoPlano = (html, maxLength = 100) => {
  if (!html) return ''
  if (typeof window === 'undefined') {
    // Fallback simple para SSR
    return html.replace(/<[^>]*>/g, '').slice(0, maxLength) + '...'
  }
  const temp = document.createElement('div')
  temp.innerHTML = html
  const texto = temp.textContent || temp.innerText || ''
  return texto.slice(0, maxLength) + '...'
}
</script>


<style scoped>
.promo-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
  flex-direction: row;
}

.promo-main {
  flex: 2;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  min-height: 400px;
  transition: transform 0.2s ease;
}
.promo-main:hover {
  transform: scale(1.01);
}

.promo-side {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.promo-box {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  min-height: 190px;
  transition: transform 0.2s ease;
}
.promo-box:hover {
  transform: scale(1.01);
}

.promo-main img,
.promo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.text-box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  color: white;
  z-index: 2;
}

.text-box h2,
.text-box h3 {
  margin: 0 0 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
}

.text-box p {
  font-size: 0.95rem;
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: #ffffff;
}

.btn-link {
  background: #e50914;
  color: #fff;
  font-weight: bold;
  padding: 0.4rem 1rem;
  font-size: 0.95rem;
  border-radius: 4px;
  display: inline-block;
}

.text-box.small h3 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.text-box.small small {
  font-size: 0.8rem;
  display: inline-block;
  margin-bottom: 0.3rem;
}

.btn-mini {
  background: #e50914;
  color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 3px;
  display: inline-block;
}

@media (max-width: 768px) {
  .promo-container {
    flex-direction: column;
  }

  .promo-main,
  .promo-box {
    min-height: 300px;
  }

  .text-box {
    padding: 0.8rem;
  }

  .text-box h2,
  .text-box h3 {
    font-size: 1rem;
  }

  .text-box p {
    font-size: 0.85rem;
  }

  .btn-link {
    font-size: 0.85rem;
    padding: 0.3rem 0.8rem;
  }
}
</style>
