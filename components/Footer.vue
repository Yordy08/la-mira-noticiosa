<template>
  <footer class="footer">
    <div class="footer-container">

      <!-- Marca -->
      <div class="footer-brand">
        <h3>🗞️ La Mira Noticiosa</h3>
        <p>
          Información clara, veraz y al momento.
          Nuestro compromiso es mantenerte informado con responsabilidad.
        </p>
      </div>

      <!-- Enlaces -->
      <div class="footer-links">
        <h4>Pautar con La Mira Noticiosa</h4>

        <NuxtLink to="info/contac">Contacto</NuxtLink>
      </div>

      <!-- Redes -->
      <div class="footer-social">
        <h4>Síguenos</h4>
        <div class="social-icons">
          <a href="https://www.facebook.com/LaMiraNoticiosaOficial/" target="_blank" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/lamiranoticiosa/?hl=es-la" target="_blank" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://x.com/LaMiraNoticiosa" target="_blank" aria-label="Twitter">
            <i class="fab fa-x-twitter"></i>
          </a>
        </div>
      </div>

    </div>

    <!-- Línea inferior -->
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} La Mira Noticiosa · Todos los derechos reservados
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(180deg, #0b0b0b, #000);
  color: #ddd;
  padding: 3rem 1.5rem 1.5rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.footer-brand h3 {
  color: #ff2d2d;
  margin-bottom: 0.5rem;
}

.footer-brand p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #bbb;
}

.footer-links h4,
.footer-social h4 {
  margin-bottom: 1rem;
  color: #fff;
}

.footer-links a {
  display: block;
  color: #bbb;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ff2d2d;
}

.social-icons {
  display: flex;
  gap: 0.8rem;
}

.social-icons a {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  color: #fff;
  border-radius: 50%;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.social-icons a:hover {
  background: #ff2d2d;
  transform: translateY(-3px);
}

.footer-bottom {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.85rem;
  color: #888;
  border-top: 1px solid #222;
  padding-top: 1rem;
}
</style>
