<template>
  <header class="header-con-desenfoque bg-white border-bottom py-3 px-2">
    <!-- Capa de desenfoque -->
    <div class="desenfoque"></div>

    <div class="container-fluid position-relative z-2">
      <div class="row align-items-center g-3">
        <!-- Logo -->
        <div class="col-12 col-md-3 text-center text-md-start">
          <a href="/" class="text-decoration-none">
            <img
              src="https://res.cloudinary.com/dxgbnimmk/image/upload/b_rgb:FFFFFF/v1752428805/lamirapng_nwuwyw.png"
              alt="Logo La Mira"
              style="
                width: 140px;
                height: 140px;
                object-fit: cover;
                border: 4px solid white;
                border-radius: 50%;
                box-shadow: 0 0 15px 8px white;
              "
            />
          </a>
        </div>

        <!-- Buscador -->
        <div class="col-12 col-md-6">
          <div class="input-group">
            <input
              v-model="filtro"
              @keyup.enter="buscarNoticias"
              type="text"
              class="form-control"
              placeholder="🔍 Buscar Noticias"
            />
            <button class="btn btn-rojo-borde" type="button" @click="buscarNoticias">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <!-- Info contacto -->
        <div class="col-12 col-md-3 text-center text-md-end">
  <div class="d-none d-md-block text-white">
    <small class="d-block">Noticias en la mira</small>
    <NuxtLink
  to="/destacadas"
  class="text-white fw-bold text-decoration-none"
>
  Ver Noticias Destacadas
</NuxtLink>

  </div>
</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const filtro = ref('')
const router = useRouter()

const buscarNoticias = () => {
  if (!filtro.value.trim()) return
  router.push(`/buscar?q=${encodeURIComponent(filtro.value)}`)
}
const categorias = [
  'Empleo'
]
</script>

<style scoped>
.header-con-desenfoque {
  position: relative;
  background-image: url('https://res.cloudinary.com/dxgbnimmk/image/upload/v1752432411/Flux_Dev_Create_a_vivid_banner_image_for_a_webpage_with_a_brig_3_1_vhujn6.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: clip;
}

.desenfoque {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

.btn-rojo-borde {
  background-color: #000000;
  color: #fff;
  border: 2px solid #ffffff;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.btn-rojo-borde:hover {
  background-color: #ff0000;
  border-color: #000000;
}
</style>
