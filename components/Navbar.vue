<template>
  <nav style="background-color: #333; padding: 1rem;">
    <ul style="list-style: none; display: flex; gap: 1rem; margin: 0; color: white;">
      <li><NuxtLink to="/">Inicio</NuxtLink></li>
      <li><NuxtLink to="/noticias/createnoticia">Crear Noticia</NuxtLink></li>
      <!-- Agrega más enlaces según los necesites -->
    </ul>
  </nav>
</template>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
