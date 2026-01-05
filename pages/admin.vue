<template>
  <div class="admin-container">
    <div class="admin-box">
      <h1 class="titulo">Panel de Administración</h1>

      <!-- 🔐 SOLO SI HAY USUARIO -->
      <div v-if="usuario" class="botones">
        <NuxtLink to="/noticias/createnoticia" class="btn-admin crear">
          ➕ Crear Noticias
        </NuxtLink>

        <NuxtLink to="/noticias/listarnoticias" class="btn-admin listar">
          📋 Listar Noticias
        </NuxtLink>
      </div>

      <!-- 🚫 SI NO HAY USUARIO -->
      <p v-else class="no-auth">
        ⚠️ Debes iniciar sesión para acceder al panel
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const usuario = ref(null)
const router = useRouter()

onMounted(() => {
  const data = localStorage.getItem('usuario')

  console.log('🔍 Admin.vue - usuario en localStorage:', data)

  if (data) {
    usuario.value = JSON.parse(data)
    console.log('🟢 Usuario autorizado:', usuario.value)
  } else {
    console.log('🔴 No hay usuario, redirigiendo a login')
    router.push('/login')
  }
})
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #000, #111);
  padding: 2rem;
}

.admin-box {
  background: #1a1a1a;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.titulo {
  color: white;
  margin-bottom: 2rem;
}

.botones {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.btn-admin {
  padding: 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.btn-admin.crear {
  background-color: #dc3545;
}
.btn-admin.crear:hover {
  background-color: #b02a37;
  transform: scale(1.03);
}

.btn-admin.listar {
  background-color: #0d6efd;
}
.btn-admin.listar:hover {
  background-color: #0a58ca;
  transform: scale(1.03);
}

.no-auth {
  color: #ffc107;
  font-weight: bold;
}
</style>
