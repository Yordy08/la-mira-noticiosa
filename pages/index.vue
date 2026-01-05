<template>
  <div class="promo-container">
    <!-- Banner principal -->
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

    <!-- Noticias secundarias -->
    <div class="promo-side">
      <NuxtLink
        v-for="noticia in noticias.slice(1, 3)"
        :key="noticia._id || noticia.id"
        :to="`/noticias/${noticia.slug}`"
        class="promo-box text-decoration-none"
      >
        <img :src="noticia.foto" :alt="noticia.titular" />
        <div class="text-box small">
          <small>🟢 Última Noticia</small>
          <h3>{{ noticia.titular }}</h3>
          <p class="small-text" style="color: white">
            {{ extraerTextoPlano(noticia.descripcion, 80) }}
          </p>
          <span class="btn-mini">Leer más</span>
        </div>
      </NuxtLink>
    </div>
  </div>

  <!-- Sección por categorías -->
  <div class="container py-6">
    <NoticiasPorCategoria
      v-for="cat in categorias"
      :key="cat"
      :categoria="cat"
    />
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { computed } from 'vue'
import NoticiasPorCategoria from '@/components/NoticiasPorCategoria.vue'

/* =============================
   🔥 CARGA DE NOTICIAS
============================= */
const { data } = await useFetch('/api/noticias')

/* =============================
   NORMALIZAR RESPUESTA
============================= */
const todas = computed(() => {
  if (Array.isArray(data.value)) return data.value
  if (Array.isArray(data.value?.noticias)) return data.value.noticias
  return []
})

/* =============================
   ⏱️ FECHA REAL (creadoEn)
============================= */
const timestamp = (n) =>
  n?.creadoEn ? new Date(n.creadoEn).getTime() : 0

/* =============================
   📰 NOTICIAS MÁS RECIENTES
============================= */
const noticias = computed(() => {
  return [...todas.value]
    .filter(n => n.categoria?.toLowerCase() !== 'empleo')
    .sort((a, b) => timestamp(b) - timestamp(a))
    .slice(0, 3)
})

/* =============================
   📂 CATEGORÍAS
============================= */
const categorias = [
  'Nacional',
  'Internacional',
  'Política',
  'Economía',
  'Salud',
  'Educación',
  'Cultura',
  'Deportes',
  'Tecnología',
  'Judicial',
  'Medio Ambiente',
  'Denuncias Ciudadanas',
  'Opinión',
  'Viral',
  'Turismo'
]

/* =============================
   🧼 TEXTO PLANO (SSR SAFE)
============================= */
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
<style scoped>
.promo-container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

/* =========================
   BANNER PRINCIPAL
========================= */
.promo-main {
  flex: 2;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 620px; /* 🔒 altura fija */
  flex-shrink: 0;
}

.promo-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* =========================
   NOTICIAS SECUNDARIAS
========================= */
.promo-side {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 🔒 CARD FIJO */
.promo-box {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 300px; /* 🔥 NO se estira */
  flex-shrink: 0;
}

/* 🔒 IMAGEN FIJA */
.promo-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* =========================
   TEXTO
========================= */
.text-box {
  position: absolute;
  bottom: 0;
  inset-inline: 0;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  color: white;
}

.text-box h2,
.text-box h3 {
  margin: 0 0 0.4rem;
  font-weight: bold;
}

/* 🔒 Limitar texto para que NO estire */
.text-box p {
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 🔥 máximo 3 líneas */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* =========================
   BOTONES
========================= */
.btn-link,
.btn-mini {
  background: #e50914;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  font-size: 0.8rem;
  display: inline-block;
}

/* =========================
   RESPONSIVE
========================= */
@media (max-width: 768px) {
  .promo-container {
    flex-direction: column;
  }

  /* =========================
     ALTURAS MÁS COMPACTAS
  ========================= */
  .promo-main {
    height: 260px;
  }

  .promo-box {
    height: 200px;
  }

  /* =========================
     OVERLAY MÁS LIGERO
  ========================= */
  .text-box {
    padding: 0.6rem;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0.15)
    );
    backdrop-filter: none; /* 🔥 evita que opaque la imagen */
  }

  /* =========================
     TEXTO OPTIMIZADO
  ========================= */
  .text-box h2,
  .text-box h3 {
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }

  /* 🔥 Ocultar texto largo en móvil */
  .text-box p {
    display: none;
  }

  .btn-link,
  .btn-mini {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
  }
}


</style>