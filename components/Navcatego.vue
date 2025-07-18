<template>
  <nav class="navbar-css">
    <div class="navbar-container">
      <!-- Logo -->
      
      <NuxtLink to="/" class="logo">La Mira Noticiosa</NuxtLink>


      <!-- Toggle Móvil -->
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="menu-icon"><i class="fas fa-bars"></i></label>

      <!-- Menú principal -->
      <ul class="nav-links">
        <!-- Dropdown de categorías -->
        <li class="dropdown">
          <a href="#">Categorías ▾</a>
          <ul class="dropdown-content">
            <li><a href="#">Política</a></li>
            <li><a href="#">Internacional</a></li>
            <li><a href="#">Cultura</a></li>
            <li><a href="#">Deportes</a></li>
          </ul>
        </li>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Noticias</a></li>
        <li><a href="#">Destacadas</a></li>
        <li><a href="#">Contacto</a></li>
        <li><a href="#">Nosotros</a></li>
      </ul>

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

    </div>
  </nav>
</template>

<style scoped>
/* Estructura */
.navbar-css {
  background-color: #222;
  color: white;
  font-family: sans-serif;
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

/* Logo */
.logo {
  text-decoration: none; /* Quita subrayado */
  font-weight: bold;
  font-size: 1.5rem;
  color: #ff0000;
  cursor: pointer;
}



/* Icono de menú móvil */
.menu-icon {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
}
#menu-toggle {
  display: none;
}

/* Menú */
.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}
.nav-links li a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  transition: color 0.3s;
}
.nav-links li a:hover {
  color: #ffc107;
}

/* Dropdown */
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
.dropdown-content li a {
  padding: 0.5rem;
  display: block;
}
.dropdown:hover .dropdown-content {
  display: flex;
}

/* Iconos extras */
.extra-icons {
  display: flex;
  gap: 0.8rem;
  

  
}
.extra-icons a {
  color: white;
  font-size: 1.2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }

  .nav-links {
    display: none;
    width: 100%;
    flex-direction: column;
    margin-top: 1rem;
    background: #222;
  }

  #menu-toggle:checked + .menu-icon + .nav-links {
    display: flex;
  }

  .nav-links li {
    text-align: center;
  }

  .extra-icons {
    margin-top: 1rem;
    justify-content: center;
    width: 100%;
  }
}
</style>
