<template>
  <div class="form-container">
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="registrarUsuario">
      <input v-model="nombre" placeholder="Nombre" required />
      <input v-model="correo" type="email" placeholder="Correo" required />
      <input v-model="clave" type="password" placeholder="Contraseña" required />
      <button type="submit">Registrar</button>
    </form>

    <div v-if="mensaje" class="mensaje">
      {{ mensaje }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
const clave = ref('')
const mensaje = ref('')

const registrarUsuario = async () => {
  try {
    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre.value,
        correo: correo.value,
        clave: clave.value,
      }),
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.statusMessage || 'Error desconocido')

    mensaje.value = data.mensaje
  } catch (error) {
    mensaje.value = `Error: ${error.message}`
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
}
button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
}
.mensaje {
  margin-top: 10px;
  color: green;
}
</style>
