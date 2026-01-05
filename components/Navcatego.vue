<template>
  <nav class="navbar-css">
    <div class="navbar-container">
      <!-- Logo -->
    <NuxtLink to="/" class="logo">
  La Mira Noticiosa
</NuxtLink>


      <!-- Toggle Móvil -->
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="menu-icon">
        <i class="fas fa-bars"></i>
      </label>

      <!-- Menú principal -->
      <ul class="nav-links">
        <li class="dropdown">
          <a href="#">Categorías ▾</a>
          <ul class="dropdown-content">
            <li><NuxtLink to="/categoria/politica">Política</NuxtLink></li>
            <li><NuxtLink to="/categoria/internacional">Internacional</NuxtLink></li>
            <li><NuxtLink to="/categoria/cultura">Cultura</NuxtLink></li>
            <li><NuxtLink to="/categoria/deportes">Deportes</NuxtLink></li>
          </ul>
        </li>

        <li><NuxtLink to="/">Inicio</NuxtLink></li>
        <li><NuxtLink to="/noticias">Noticias</NuxtLink></li>
        <li><NuxtLink to="/destacadas">Destacadas</NuxtLink></li>
        <li><NuxtLink to="info/contac">Contacto</NuxtLink></li>
        <li><NuxtLink to="info/quienessomos">Nosotros</NuxtLink></li>

        <!-- 🔐 SOLO SI HAY USUARIO LOGUEADO -->
        <li v-if="isClient && usuario">
          <button @click="cerrarSesion" class="btn-cerrar">
            Cerrar sesión
          </button>
        </li>

        <li>
        <NuxtLink
  v-if="usuario"
  to="/admin"
  class="dashboard-btn"
>
  <i class="fas fa-chart-line me-2"></i>
  <span>Dashboard</span>
</NuxtLink>
        </li>

        <!-- Iconos extra -->
      <div class="extra-icons">
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://tiktok.com" target="_blank" aria-label="TikTok">
          <i class="fab fa-tiktok"></i>
        </a>
      </div>
      </ul>

      


    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref(null)
const isClient = ref(false)
const router = useRouter()

onMounted(() => {
  isClient.value = true

  const data = localStorage.getItem('usuario')

  console.log('🔍 Al montar componente, localStorage usuario:', data)

  if (data) {
    usuario.value = JSON.parse(data)
    console.log('🟢 Usuario activo detectado:', usuario.value)
  } else {
    console.log('⚪ No hay ningún usuario logueado')
  }
})

const cerrarSesion = () => {
  console.log(
    '🔴 Antes de cerrar sesión:',
    JSON.parse(localStorage.getItem('usuario'))
  )

  localStorage.removeItem('usuario')

  console.log(
    '🗑️ Después de cerrar sesión:',
    localStorage.getItem('usuario')
  )

  usuario.value = null

  console.log('✅ Estado usuario en Vue después del logout:', usuario.value)

  router.push('/login')
}
</script>


<style scoped>
/* ===== ESTRUCTURA ===== */
.navbar-css {
  background-color: #222;
  color: white;
  font-family: sans-serif;
  min-height: 64px;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.7rem 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

/* ===== LOGO ===== */
.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff0000;
  text-decoration: none; 
  cursor: pointer;
}



/* ===== MENÚ MÓVIL ===== */
.menu-icon {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
}
#menu-toggle {
  display: none;
}

/* ===== LINKS ===== */
.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
}

.nav-links li a:hover {
  color: #ffc107;
}

/* ===== BOTÓN CERRAR ===== */
.btn-cerrar {
  background: #ff0000;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cerrar:hover {
  background: #c80000;
}

/* ===== DROPDOWN ===== */
.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background: #333;
  display: none;
  flex-direction: column;
  min-width: 150px;
  z-index: 100;
}

.dropdown:hover .dropdown-content {
  display: flex;
}

/* ===== ICONOS ===== */
.extra-icons {
  display: flex;
  gap: 0.8rem;
}

.extra-icons a {
  color: white;
  font-size: 1.2rem;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }

  .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    background: #222;
    margin-top: 1rem;
  }

  #menu-toggle:checked + .menu-icon + .nav-links {
    display: flex;
  }

  .nav-links li {
    text-align: center;
  }

  .extra-icons {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>
