<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="login-box p-4 rounded shadow">
      <h2 class="text-center text-danger mb-4">🔐 Iniciar Sesión</h2>

      <form @submit.prevent="iniciarSesion">
        <div class="mb-3">
          <label class="form-label text-white">Correo electrónico</label>
          <input
            v-model="correo"
            type="email"
            class="form-control"
            required
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div class="mb-3">
          <label class="form-label text-white">Contraseña</label>
          <input
            v-model="clave"
            type="password"
            class="form-control"
            required
            placeholder="********"
          />
        </div>

        <button :disabled="cargando" type="submit" class="btn btn-danger w-100">
          {{ cargando ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const correo = ref('')
const clave = ref('')
const cargando = ref(false)
const error = ref('')

const iniciarSesion = async () => {
  cargando.value = true
  error.value = ''

  const { data, error: fetchError } = await useFetch('/api/login', {
    method: 'POST',
    body: {
      correo: correo.value,
      clave: clave.value
    }
  })

  if (fetchError.value) {
    error.value = fetchError.value.data?.error || 'Error en el servidor'
    cargando.value = false
    return
  }

  if (data.value?.ok) {
    // ✅ GUARDA USUARIO
    localStorage.setItem(
      'usuario',
      JSON.stringify(data.value.usuario)
    )

    // ✅ EVENTO GLOBAL (clave)
    window.dispatchEvent(new Event('usuario-logueado'))

    await Swal.fire(
      '✅ Bienvenido',
      `Hola ${data.value.usuario.nombre}`,
      'success'
    )

    navigateTo('/admin')
  } else {
    error.value = data.value?.error || 'Datos incorrectos'
  }

  cargando.value = false
}
</script>


<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(to right, #000, #111);
  padding: 2rem;
}

.login-box {
  max-width: 400px;
  width: 100%;
  background-color: #1a1a1a;
  color: white;
}

input {
  background-color: #222;
  border: 1px solid #444;
  color: white;
}

input:focus {
  background-color: #111;
  border-color: #dc3545;
  color: white;
  box-shadow: none;
}
</style>
