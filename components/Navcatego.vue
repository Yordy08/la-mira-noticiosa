<template>
  <nav class="navbar-css">
    <div class="navbar-container">
      <!-- Logo -->
      <NuxtLink to="/" class="logo" @click="cerrarMenu">
        La Mira Noticiosa
      </NuxtLink>

      <!-- Toggle Móvil -->
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="menu-icon">
        <i class="fas fa-bars"></i>
      </label>

      <!-- Menú principal -->
      <ul class="nav-links">
        <!-- Categorías -->
        <li class="dropdown">
          <a href="#">Categorías ▾</a>
          <ul class="dropdown-content">
            <li>
              <NuxtLink to="/categoria/politica" @click="cerrarMenu">
                Política
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categoria/internacional" @click="cerrarMenu">
                Internacional
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categoria/cultura" @click="cerrarMenu">
                Cultura
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/categoria/deportes" @click="cerrarMenu">
                Deportes
              </NuxtLink>
            </li>
          </ul>
        </li>

        <!-- Links -->
        <li>
          <NuxtLink to="/" @click="cerrarMenu">Inicio</NuxtLink>
        </li>
        
        <li>
          <NuxtLink to="/destacadas" @click="cerrarMenu">Destacadas</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/info/contac" @click="cerrarMenu">Contacto</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/info/quienessomos" @click="cerrarMenu">
            Nosotros
          </NuxtLink>
        </li>

        <!-- Dashboard -->
        <li v-if="isClient && usuario">
          <NuxtLink
            to="/admin"
            class="dashboard-btn"
            @click="cerrarMenu"
          >
            <i class="fas fa-chart-line me-2"></i>
            Dashboard
          </NuxtLink>
        </li>

        <!-- Cerrar sesión -->
        <li v-if="isClient && usuario">
          <button @click="cerrarSesion" class="btn-cerrar">
            Cerrar sesión
          </button>
        </li>
       
        <!-- Iconos -->
        <div class="extra-icons">
          <a href="https://www.facebook.com/LaMiraNoticiosaOficial/" target="_blank" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com/lamiranoticiosa/?hl=es-la" target="_blank" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.tiktok.com/@lamiranoticiosa?is_from_webapp=1&sender_device=pc" target="_blank" aria-label="TikTok">
            <i class="fab fa-tiktok"></i>
          </a>
          <a href="https://x.com/LaMiraNoticiosa" target="_blank" aria-label="Twitter">
            <i class="fab fa-x-twitter"></i>
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
  console.log('🔍 Usuario en localStorage:', data)

  if (data) {
    usuario.value = JSON.parse(data)
    console.log('🟢 Usuario activo:', usuario.value)
  }
})

const cerrarMenu = () => {
  const toggle = document.getElementById('menu-toggle')
  if (toggle) toggle.checked = false
}

const cerrarSesion = () => {
  console.log('🔴 Cerrando sesión:', usuario.value)

  localStorage.removeItem('usuario')
  usuario.value = null

  cerrarMenu()
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
