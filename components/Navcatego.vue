<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <div class="container-fluid">
      <!-- Botón Toggle Responsive -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContenido"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Botón de Categorías -->
      <div class="dropdown me-3">
        <button class="btn btn-warning dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
          <i class="fas fa-bars me-1"></i> Categorías
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Política</a></li>
          <li><a class="dropdown-item" href="#">Internacional</a></li>
          <li><a class="dropdown-item" href="#">Cultura</a></li>
          <li><a class="dropdown-item" href="#">Deportes</a></li>
        </ul>
      </div>

      <!-- Links de Navegación -->
      <div class="collapse navbar-collapse" id="navbarContenido">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Noticias</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Destacadas</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Más</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Contacto</a></li>
              <li><a class="dropdown-item" href="#">Nosotros</a></li>
            </ul>
          </li>
        </ul>

        <!-- Íconos extras a la derecha -->
        <div class="d-flex align-items-center gap-3 text-white">
          <a href="#" class="text-white"><i class="fas fa-user"></i></a>
          <a href="#" class="text-white"><i class="fas fa-heart"></i></a>
          <a href="#" class="text-white"><i class="fas fa-bell"></i></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar .nav-link {
  transition: color 0.2s ease-in-out;
}
.navbar .nav-link:hover {
  color: #ffc107;
}
</style>
