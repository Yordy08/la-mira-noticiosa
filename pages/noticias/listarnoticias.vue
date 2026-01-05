<template>
  <div class="container py-5">
    <h2 class="mb-4 fw-bold text-primary">🗞️ Lista de Noticias</h2>

    <input v-model="filtro" type="text" class="form-control mb-4" placeholder="🔍 Buscar por titular..." />

    <div v-if="filtradas.length === 0" class="alert alert-warning">No hay noticias que coincidan...</div>

    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div v-for="noticia in filtradas" :key="noticia.id" class="col">
        <div class="card h-100 shadow-sm border-0">
          <img :src="noticia.foto" class="card-img-top" style="max-height: 200px; object-fit: cover" />
          <div class="card-body">
            <h5 class="card-title">{{ noticia.titular }}</h5>
            <p class="card-text">{{ extraerTextoPlano(noticia.descripcion, 100) }}</p>

            <p class="text-muted mb-1">
              <i class="fas fa-calendar-alt"></i> {{ formatFecha(noticia.fecha) }}
            </p>
            <span class="badge bg-secondary">{{ noticia.categoria }}</span>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" @click="abrirModal(noticia)">
              <i class="fas fa-edit me-1"></i> Editar
            </button>
            <button class="btn btn-sm btn-outline-danger" @click="eliminarNoticia(noticia)">
              <i class="fas fa-trash me-1"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal moderno -->
    <div v-if="mostrarModal" class="modal-glass">
      <div class="modal-inner animate__animated animate__fadeInDown">
        <form @submit.prevent="guardarCambios">
          <div class="modal-header-glass">
            <h5 class="text-white"><i class="fas fa-edit me-2"></i>Editar Noticia</h5>
            <button class="btn-close-white" type="button" @click="cerrarModal">×</button>
          </div>
          <div class="modal-body-glass">
            <label>Titular</label>
            <input v-model="editData.titular" class="form-control mb-3" required />

            <label>Descripción (puedes usar HTML)</label>
            <textarea
              v-model="editData.descripcion"
              rows="5"
              class="form-control mb-2"
              placeholder='Ejemplo: <p><strong>Noticia importante</strong> publicada en <a href="https://ejemplo.com" target="_blank">enlace</a>.</p>'
              required
            ></textarea>
            <small class="text-muted d-block mb-3">
              Puedes usar etiquetas como: <code>&lt;p&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;a href=""&gt;</code>.
            </small>

            <label>Frase clave</label>
            <input v-model="editData.fraseClave" class="form-control mb-3" />

            <label>Meta descripción</label>
            <input v-model="editData.metaDescripcion" class="form-control mb-3" />

            <label>Categoría</label>
            <select v-model="editData.categoria" class="form-select mb-3" required>
              <option>Nacional</option>
              <option>Internacional</option>
              <option>Política</option>
              <option>Economía</option>
              <option>Salud</option>
              <option>Educación</option>
              <option>Cultura</option>
              <option>Deportes</option>
              <option>Tecnología</option>
              <option>Judicial</option>
              <option>Medio Ambiente</option>
              <option>Denuncias Ciudadanas</option>
              <option>Opinión</option>
              <option>Viral</option>
              <option>Turismo</option>
              <option>Empleo</option>
            </select>

            <label>Actualizar imagen</label>
            <input type="file" @change="subirNuevaImagen" class="form-control mb-3" accept="image/*" />
            <img v-if="editData.foto" :src="editData.foto" class="img-fluid rounded shadow-sm mb-3" />
          </div>
          <div class="modal-footer-glass">
            <button type="button" class="btn btn-light" @click="cerrarModal">Cancelar</button>
            <button type="submit" class="btn btn-success">
              <i class="fas fa-save me-1"></i> Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '#app'
import Swal from 'sweetalert2'
import slugify from 'slugify'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  const data = localStorage.getItem('usuario')

  console.log('🔍 ListarNoticias.vue - usuario en localStorage:', data)

  if (!data) {
    console.log('🔴 Acceso denegado: no hay usuario logueado')
    router.push('/login')
  } else {
    const user = JSON.parse(data)
    console.log('🟢 Acceso permitido. Usuario activo:', user)
  }
})


const { data, refresh } = await useFetch('/api/noticias')
const noticias = computed(() => Array.isArray(data.value) ? data.value : data.value?.noticias || [])

const filtro = ref('')
const filtradas = computed(() =>
  noticias.value.filter(n => n.titular.toLowerCase().includes(filtro.value.toLowerCase()))
)

const formatFecha = (f) =>
  new Date(f).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

const mostrarModal = ref(false)
const editData = ref({
  id: null,
  titular: '',
  descripcion: '',
  fraseClave: '',
  metaDescripcion: '',
  categoria: '',
  foto: ''
})

const abrirModal = (noticia) => {
  editData.value = { ...noticia }
  mostrarModal.value = true
}
const cerrarModal = () => (mostrarModal.value = false)

const subirNuevaImagen = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await fetch('/api/upload-image', { method: 'POST', body: formData })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al subir imagen')
    editData.value.foto = data.url
    Swal.fire('Imagen subida correctamente', '', 'success')
  } catch (err) {
    console.error('❌ Error al subir imagen:', err)
    Swal.fire('Error', err.message, 'error')
  }
}

const guardarCambios = async () => {
  const slug = slugify(editData.value.titular, { lower: true, strict: true })

  try {
    const res = await fetch(`/api/noticias/${editData.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editData.value, slug })
    })
    if (!res.ok) throw new Error('Error al guardar cambios')
    await refresh()
    cerrarModal()
    Swal.fire('Noticia actualizada correctamente', '', 'success')
  } catch (err) {
    console.error('❌ Error al actualizar:', err)
    Swal.fire('Error', err.message, 'error')
  }
}

const extraerTextoPlano = (html, maxLength = 100) => {
  if (!html || !process.client) return '' // Evita error en SSR
  const temp = document.createElement('div')
  temp.innerHTML = html
  const texto = temp.textContent || temp.innerText || ''
  return texto.slice(0, maxLength) + '...'
}

const eliminarNoticia = async (noticia) => {
  const confirm = await Swal.fire({
    title: '¿Eliminar esta noticia?',
    text: 'Esto también eliminará la imagen en Cloudinary.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar'
  })

  if (!confirm.isConfirmed) return

  try {
    const res = await fetch(`/api/noticias/${noticia.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ public_id: getCloudinaryPublicId(noticia.foto) })
    })
    if (!res.ok) throw new Error('Error al eliminar noticia')
    await refresh()
    Swal.fire('Eliminado', 'Noticia y foto borradas', 'success')
  } catch (err) {
    console.error('❌ Error eliminando:', err)
    Swal.fire('Error', err.message, 'error')
  }
}

const getCloudinaryPublicId = (url) => {
  const parts = url.split('/')
  const filename = parts[parts.length - 1]
  return filename.split('.')[0]
}
</script>


<style scoped>
.modal-glass {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-inner {
  background: rgb(255, 255, 255);
  backdrop-filter: blur(16px);
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  padding: 1.5rem;
  box-shadow: 0 0 20px rgb(255, 255, 255);
}

.modal-header-glass {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-body-glass {
  max-height: 65vh;
  overflow-y: auto;
}

.modal-footer-glass {
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  gap: 0.5rem;
}

.btn-close-white {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: rgb(0, 0, 0);
  cursor: pointer;
}
</style>
