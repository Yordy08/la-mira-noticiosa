<template>
  <div class="container py-5">
    <!-- Si la noticia no existe -->
    <div v-if="!noticia" class="text-center text-danger">
      <p>❌ Noticia no encontrada.</p>
    </div>

    <!-- Detalle de la noticia -->
    <div v-else class="detalle-noticia">
      <!-- Imagen principal -->
      <img
        :src="noticia.foto"
        :alt="noticia.titular"
        class="img-fluid rounded shadow-sm mb-4"
        style="max-height: 400px; object-fit: cover;"
      />

      <!-- Titular -->

      <h1 class="fw-bold mb-3">{{ noticia.titular }}</h1>

      <!-- Fecha y categoría -->
      <div class="text-muted mb-2">
        <i class="fas fa-calendar-alt me-1"></i>
        {{ formatFecha(noticia.fechaPublicacion || noticia.fecha) }}
        <span v-if="noticia.categoria"> | <i class="fas fa-folder-open"></i> {{ noticia.categoria }}</span>
      </div>

      <hr />

      <!-- Descripción -->
    <!-- Descripción -->
<div class="lead" v-html="noticia.descripcion"></div>

      <!-- Sección compartir -->
      <div class="mt-4 d-flex align-items-center flex-wrap gap-3 position-relative compartir-wrapper">
        <!-- Botón de menú compartir -->
        <button @click="mostrarMenu = !mostrarMenu" class="btn btn-outline-primary btn-sm">
          <i class="fas fa-share-alt me-1"></i> Compartir
        </button>

        <!-- Menú desplegable -->
        <div v-if="mostrarMenu" class="compartir-menu-glass d-flex justify-content-around">
          <a :href="`https://wa.me/?text=${encodeURIComponent(titulo + ' - ' + url)}`" target="_blank" class="btn-share btn btn-success">
            <i class="fab fa-whatsapp"></i>
          </a>
          <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`" target="_blank" class="btn-share btn btn-primary">
            <i class="fab fa-facebook"></i>
          </a>
          <a :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`" target="_blank" class="btn-share btn btn-info">
            <i class="fab fa-twitter"></i>
          </a>
          <button @click.prevent="copiarEnlace" class="btn-share btn btn-dark">
            <i class="fas fa-link"></i>
          </button>
        </div>

        <!-- Redes visibles -->
        <div class="d-flex align-items-center gap-2 redes-visibles">
          <a href="https://www.facebook.com/lamiranoticias" target="_blank" class="btn-red btn btn-primary">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/lamiranoticias" target="_blank" class="btn-red btn btn-danger">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@lamiranoticias" target="_blank" class="btn-red btn btn-dark">
            <i class="fab fa-tiktok"></i>
          </a>
        </div>
      </div>

      <!-- Enlace copiado -->
      <small v-if="copiado" class="text-success d-block mt-2">✅ Enlace copiado</small>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useFetch, useHead } from '#app'
import { computed, ref } from 'vue'

const route = useRoute()
const slug = route.params.slug
const mostrarMenu = ref(false)
const copiado = ref(false)

const { data } = await useFetch('/api/noticias')
const noticias = computed(() => Array.isArray(data.value) ? data.value : data.value?.noticias || [])
const noticia = computed(() => noticias.value.find(n => n.slug === slug))
const url = computed(() => `https://lamiranoticias.com${route.fullPath}`)
const titulo = computed(() => noticia.value?.titular || 'Noticia')

const formatFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const copiarEnlace = async () => {
  try {
    await navigator.clipboard.writeText(url.value)
    copiado.value = true
    setTimeout(() => (copiado.value = false), 3000)
  } catch (err) {
    console.error('Error copiando enlace:', err)
  }
}

// SEO dinámico y JSON-LD
useHead(() => {
  if (!noticia.value) return {}

  const ldJsonId = 'ld-json-' + noticia.value.slug

  return {
    title: noticia.value.titular,
    meta: [
      { name: 'description', content: noticia.value.metaDescripcion || noticia.value.descripcion?.slice(0, 160) },
      { name: 'keywords', content: noticia.value.fraseClave || noticia.value.titular },
      { property: 'og:title', content: noticia.value.titular },
      { property: 'og:description', content: noticia.value.metaDescripcion || noticia.value.descripcion?.slice(0, 160) },
      { property: 'og:image', content: noticia.value.foto },
      { property: 'og:url', content: `https://lamiranoticias.com/noticias/${noticia.value.slug}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: noticia.value.titular },
      { name: 'twitter:description', content: noticia.value.metaDescripcion || noticia.value.descripcion?.slice(0, 160) },
      { name: 'twitter:image', content: noticia.value.foto }
    ],
    script: [
      {
        type: 'application/ld+json',
        id: ldJsonId,
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": noticia.value.titular,
          "image": [noticia.value.foto],
          "datePublished": noticia.value.fecha,
          "dateModified": noticia.value.creadoEn,
          "author": { "@type": "Organization", "name": "La Mira Noticias" },
          "publisher": {
            "@type": "Organization",
            "name": "La Mira Noticias",
            "logo": {
              "@type": "ImageObject",
              "url": "https://res.cloudinary.com/dxgbnimmk/image/upload/v1752428805/lamirapng_nwuwyw.png"
            }
          },
          "description": noticia.value.metaDescripcion || noticia.value.descripcion?.slice(0, 160)
        })
      }
    ],
    __dangerouslyDisableSanitizersByTagID: {
      [ldJsonId]: ['innerHTML']
    }
  }
})
</script>

<style scoped>
.detalle-noticia h1 {
  font-size: 2rem;
}
.detalle-noticia p.lead {
  font-size: 1.4rem;
  line-height: 1.8;
  color: #000000;
}

.compartir-wrapper {
  position: relative;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
}

.compartir-menu-glass {
  position: absolute;
  top: 100%;
  left: 0;
  right: auto;
  margin-top: 0.5rem;
  display: flex;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  gap: 1rem;
  z-index: 999;
  animation: fadeIn 0.25s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-share {
  width: 40px;
  height: 40px;
  font-size: 1.1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}
.btn-share:hover {
  transform: scale(1.1);
}

.redes-visibles .btn-red {
  width: 40px;
  height: 40px;
  font-size: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}
.redes-visibles .btn-red:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}
</style>
