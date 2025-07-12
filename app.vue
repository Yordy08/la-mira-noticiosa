<template>
  <div>
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="registrar">
      <input v-model="nombre" placeholder="Nombre" required />
      <input v-model="correo" placeholder="Correo" required type="email" />
      <input v-model="clave" placeholder="Contraseña" required type="password" />
      <button type="submit">Registrarse</button>
    </form>
    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
const clave = ref('')
const mensaje = ref('')

const registrar = async () => {
  try {
    const res = await fetch('/api/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre.value, correo: correo.value, clave: clave.value })
    })

    if (!res.ok) throw new Error(await res.text())

    const data = await res.json()
    mensaje.value = data.mensaje
  } catch (error) {
    mensaje.value = 'Error: ' + error.message
  }
}
</script>
