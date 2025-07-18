<template>
  <div class="container py-5">
    <h2 class="mb-4 text-primary">🔍 Resultados para: "{{ route.query.q }}"</h2>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-warning" role="status"></div>
    </div>

    <div v-else-if="filtradas.length === 0" class="alert alert-warning">
      No se encontraron noticias.
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="noticia in filtradas" :key="noticia.id" class="col">
        <div class="card-modern h-100 shadow-sm">
          <div class="card-img-wrapper">
            <img :src="noticia.foto" class="card-img-top" />
          </div>
          <div class="card-body">
            <h5 class="card-title text-dark fw-bold">{{ noticia.titular }}</h5>
            <p class="card-text text-muted">{{ noticia.descripcion.slice(0, 100) }}...</p>
            <NuxtLink :to="`/noticias/${noticia.slug}`" class="btn btn-primary btn-sm">
                Leer más
             </NuxtLink>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '#app'

const route = useRoute()
const loading = ref(true)

const { data, refresh } = await useFetch('/api/noticias')
const noticias = computed(() => Array.isArray(data.value) ? data.value : data.value?.noticias || [])

const filtradas = computed(() =>
  noticias.value.filter(n =>
    n.titular.toLowerCase().includes((route.query.q || '').toLowerCase())
  )
)

watch(() => route.query.q, () => {
  loading.value = true
  setTimeout(() => loading.value = false, 200)
})

loading.value = false
</script>

<style scoped>
.card-modern {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-modern:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-img-wrapper {
  height: 200px;
  overflow: hidden;
}
.card-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card-modern:hover img {
  transform: scale(1.05);
}

.card-title {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
</style>
