<template>
  <div class="error-page d-flex flex-column justify-content-center align-items-center text-center">
    <h1 class="error-code">505</h1>
    <p class="error-message">Servicio no disponible. Intenta recargar la página más tarde.</p>
    <router-link to="/" class="btn btn-primary btn-home">🏠 Volver al inicio</router-link>
  </div>
</template>

<script setup>
// Aquí puedes agregar cualquier lógica si quieres
</script>

<style scoped>
.error-page {
  height: 80vh; /* ocupa la mayor parte de la pantalla */
  background: linear-gradient(to right, #1e3c72, #2a5298);
  color: white;
  padding: 20px;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  margin-bottom: 20px;
}

.error-message {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.btn-home {
  padding: 10px 30px;
  font-size: 1.2rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}

.btn-home:hover {
  transform: scale(1.1);
  text-decoration: none;
}

@media (max-width: 576px) {
  .error-code {
    font-size: 5rem;
  }
  .error-message {
    font-size: 1.2rem;
  }
}
</style>
