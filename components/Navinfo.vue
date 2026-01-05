<template>
  <!-- Escritorio -->
  <div class="bg-light border-bottom py-2 px-3 d-none d-md-flex justify-content-between align-items-center small flex-wrap">
    <!-- Sección de categorías -->
    <div class="d-flex flex-wrap gap-2">
      <NuxtLink
        v-for="categoria in categorias"
        :key="categoria"
        :to="`/categoria/${encodeURIComponent(categoria)}`"
        class="categoria-link text-decoration-none text-dark px-2 py-1 rounded"
      >
        {{ categoria }}
      </NuxtLink>
    </div>

    <!-- Otras opciones -->
    <div class="d-flex flex-wrap gap-3">
      <NuxtLink style="color: black;" to="info/contac">Contactanos</NuxtLink>
    </div>
  </div>

  <!-- Móvil -->
  <div class="bg-light border-bottom py-2 px-3 d-md-none text-center small">
    <div class="categorias-scroll">
      <div class="d-flex flex-nowrap gap-2">
        <NuxtLink
          v-for="categoria in categorias"
          :key="categoria"
          :to="`/categoria/${encodeURIComponent(categoria)}`"
          class="categoria-link text-decoration-none text-dark px-2 py-1 rounded d-inline-block"
        >
          {{ categoria }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const categorias = [
  'Nacional', 'Internacional', 'Política', 'Economía', 'Salud', 'Educación',
  'Cultura', 'Deportes', 'Tecnología', 'Judicial', 'Medio Ambiente',
  'Denuncias Ciudadanas', 'Opinión', 'Viral', 'Turismo'
]
</script>

<style scoped>
a:hover {
  color: #ff0000 !important;
}


.categoria-link:hover {
  background-color: #ff0000;
  color: white !important;
}

.categorias-scroll {
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
}

.categoria-link {
  display: inline-flex;
  flex-shrink: 0;
  font-size: clamp(0.85rem, 1vw, 1rem);
}

</style>
