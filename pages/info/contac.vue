<template>
  <div class="contact-container py-5 text-white">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-bold text-danger">📬 Contáctanos</h2>
        <p class="text-white-50">
          Estamos aquí para ayudarte. ¡Escríbenos y te responderemos lo antes posible!
        </p>
      </div>

      <div class="row g-4">
        <!-- Formulario -->
        <div class="col-md-7">
          <div class="bg-dark p-4 rounded shadow-sm">
            <form @submit.prevent="enviarMensaje">
              <div class="mb-3">
                <label class="form-label text-white">Nombre</label>
                <input v-model="form.nombre" type="text" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label text-white">Correo electrónico</label>
                <input v-model="form.email" type="email" class="form-control" required />
              </div>

              <div class="mb-3">
                <label class="form-label text-white">Asunto</label>
                <input v-model="form.asunto" type="text" class="form-control" />
              </div>

              <div class="mb-3">
                <label class="form-label text-white">Mensaje</label>
                <textarea v-model="form.mensaje" rows="5" class="form-control" required></textarea>
              </div>

              <button type="submit" class="btn btn-danger px-4">Enviar mensaje</button>
            </form>
          </div>
        </div>

        <!-- Información de contacto -->
        <div class="col-md-5">
          <div class="bg-danger p-4 rounded shadow-sm h-100">
            <h5 class="text-white mb-3">
             <i class="fab fa-whatsapp me-2"></i> WhatsApp

            </h5>
            <p class="text-white-50 mb-4">+57 305 384 7585</p>

            <h5 class="text-white mb-3">
              <i class="fas fa-envelope me-2"></i> Correo
            </h5>
            <p class="text-white-50 mb-4">lamiranoticiosa@gmail.com</p>

            <h5 class="text-white mb-3">
              <i class="fas fa-map-marker-alt me-2"></i> Dirección
            </h5>
            <p class="text-white-50">San Antero, Córdoba, Colombia</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'

const form = ref({
  nombre: '',
  email: '',
  asunto: '',
  mensaje: ''
})

// 🔒 Cargar claves desde runtime config
const config = useRuntimeConfig()
const SERVICE_ID = config.public.emailjsServiceId
const TEMPLATE_ID = config.public.emailjsTemplateId
const PUBLIC_KEY = config.public.emailjsPublicKey

const enviarMensaje = async () => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        title: form.value.asunto,
        name: form.value.nombre,
        email: form.value.email,
        message: form.value.mensaje
      },
      PUBLIC_KEY
    )

    Swal.fire('✅ Enviado', 'Tu mensaje ha sido enviado con éxito.', 'success')
    form.value = { nombre: '', email: '', asunto: '', mensaje: '' }
  } catch (error) {
    console.error('❌ Error:', error)
    Swal.fire('❌ Error', 'No se pudo enviar el mensaje. Revisa tu configuración.', 'error')
  }
}
</script>

<style scoped>
.contact-container {
  background: linear-gradient(to right, #000, #111);
}

input,
textarea {
  background-color: #222;
  border: 1px solid #444;
  color: #fff;
}

input:focus,
textarea:focus {
  background-color: #111;
  border-color: #dc3545;
  color: #fff;
  box-shadow: none;
}
</style>
