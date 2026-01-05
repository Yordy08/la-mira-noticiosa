<template>
  <header class="header-con-desenfoque bg-white border-bottom py-3 px-2">
    <!-- Capa de desenfoque -->
    <div class="desenfoque"></div>

    <div class="container-fluid position-relative z-2">
      <div class="row align-items-center g-3">

        <!-- LOGO -->
        <div class="col-12 col-md-3 text-center text-md-start">
          <NuxtLink to="/" class="text-decoration-none">
            <img
              src="https://res.cloudinary.com/dxgbnimmk/image/upload/v1767576011/592362856_1608730623429973_850172643014552373_n_pe6erk.jpg"
              alt="Logo La Mira"
              class="logo-img"
            />
          </NuxtLink>
        </div>

        <!-- BUSCADOR -->
        <div class="col-12 col-md-6">
          <div class="input-group">
            <input
              v-model="filtro"
              @keyup.enter="buscarNoticias"
              type="text"
              class="form-control"
              placeholder="🔍 Buscar Noticias"
            />
            <button
              class="btn btn-rojo-borde"
              type="button"
              @click="buscarNoticias"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <!-- FRASE DEL DÍA -->
        <div class="col-12 col-md-3 text-center text-md-end">
          <div class="d-none d-md-block text-white frase-dia">
            <small class="d-block fw-bold">Frase del día</small>
            <span class="fst-italic">
              {{ fraseDelDia }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

/* ==========================
   BUSCADOR
========================== */
const filtro = ref('')
const router = useRouter()

const buscarNoticias = () => {
  if (!filtro.value.trim()) return
  router.push(`/buscar?q=${encodeURIComponent(filtro.value)}`)
}

/* ==========================
   FRASE DEL DÍA
========================== */
const fraseDelDia = ref('Cargando frase del día...')

const obtenerFraseDelDia = async () => {
  try {
    const res = await fetch('https://zenquotes.io/api/today')
    const data = await res.json()

    if (Array.isArray(data) && data.length > 0) {
      fraseDelDia.value = `"${data[0].q}"`
    }
  } catch (error) {
    console.error('❌ Error obteniendo frase:', error)
    fraseDelDia.value =
      'Cada día es una nueva oportunidad para avanzar.'
  }
}

onMounted(() => {
  obtenerFraseDelDia()
})
</script>

<style scoped>
/* ==========================
   HEADER
========================== */
.header-con-desenfoque {
  position: relative;
  background-image: url('https://res.cloudinary.com/dxgbnimmk/image/upload/v1752432411/Flux_Dev_Create_a_vivid_banner_image_for_a_webpage_with_a_brig_3_1_vhujn6.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.desenfoque {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* ==========================
   LOGO
========================== */
.logo-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border: 4px solid white;
  border-radius: 50%;
  box-shadow: 0 0 15px 8px white;

  margin-left: 60px; /* 👈 mueve a la derecha */
}


/* ==========================
   BOTÓN BUSCAR
========================== */
.btn-rojo-borde {
  background-color: #000;
  color: #fff;
  border: 2px solid #fff;
  transition: all 0.3s ease;
}

.btn-rojo-borde:hover {
  background-color: #ff0000;
  border-color: #000;
}

/* ==========================
   FRASE DEL DÍA
========================== */
.frase-dia {
  font-size: 0.9rem;
  line-height: 1.4;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
}
</style>
