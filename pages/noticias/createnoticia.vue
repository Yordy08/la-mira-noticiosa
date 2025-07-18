<template>
  <div class="container py-5">
    <div class="card shadow-lg border-0 rounded-4 animate__animated animate__fadeIn">
      <div class="card-body p-5">
        <h2 class="mb-4 text-primary fw-bold d-flex align-items-center gap-2">
          <i class="fas fa-newspaper"></i> Crear Noticia
        </h2>

        <form @submit.prevent="enviarNoticia" class="row g-4">
          <!-- Imagen -->
          <div class="col-12">
            <label class="form-label">📷 Foto (subir imagen)</label>
            <input type="file" @change="subirImagen" accept="image/*" class="form-control" required />
            <div v-if="subiendoImagen" class="form-text text-info">Subiendo imagen...</div>
            <img v-if="foto" :src="foto" class="img-fluid rounded mt-3 border" style="max-height: 200px" />
          </div>

          <!-- Titular -->
          <div class="col-md-6">
            <label class="form-label">📝 Titular</label>
            <input v-model="titular" type="text" class="form-control" placeholder="Título de la noticia" required />
          </div>

          <!-- Slug -->
          <div class="col-md-6">
            <label class="form-label">🔗 Slug (SEO)</label>
            <input v-model="slug" type="text" class="form-control" readonly />
          </div>

          <!-- Frase clave -->
          <div class="col-md-6">
            <label class="form-label">🏷️ Frase clave (SEO)</label>
            <input v-model="fraseClave" type="text" class="form-control" placeholder="Ej: turismo en San Antero" />
          </div>

          <!-- Meta descripción -->
          <div class="col-md-6">
            <label class="form-label">📌 Meta descripción (SEO)</label>
            <input v-model="metaDescripcion" type="text" class="form-control" placeholder="Para Google y redes" />
          </div>

          <!-- Descripción con editor enriquecido -->
          <div class="col-12">
            <label class="form-label">🗒️ Descripción</label>

            <!-- Barra de herramientas -->
            <div class="btn-toolbar mb-2" role="toolbar">
              <div class="btn-group me-2" role="group">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('bold')"><b>B</b></button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('italic')"><i>I</i></button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('underline')"><u>U</u></button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('insertUnorderedList')">• Lista</button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('justifyLeft')">⯇</button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('justifyCenter')">≡</button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('justifyRight')">⯈</button>
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="execCmd('createLink')">🔗</button>
              </div>
            </div>

            <!-- Área editable -->
            <div
              id="editor"
              class="form-control bg-white"
              contenteditable="true"
              style="min-height: 150px;"
              @input="updateDescripcion"
            ></div>
          </div>

          <!-- Categoría -->
          <div class="col-md-6">
            <label class="form-label">📂 Categoría</label>
            <select v-model="categoria" class="form-select" required>
              <option disabled value="">Selecciona una categoría</option>
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
            </select>
          </div>

          <!-- Botón -->
          <div class="col-12 text-end">
            <button
              type="submit"
              class="btn btn-primary px-4"
              :disabled="subiendoImagen || enviandoNoticia"
            >
              <i class="fas fa-paper-plane me-2"></i>
              {{ enviandoNoticia ? 'Publicando...' : 'Publicar' }}
            </button>
          </div>

          <div v-if="mensaje" class="alert alert-success mt-4 animate__animated animate__fadeIn">
            {{ mensaje }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useFetch } from '#app'
import slugify from 'slugify'
import Swal from 'sweetalert2'

const foto = ref('')
const titular = ref('')
const descripcion = ref('')
const categoria = ref('')
const metaDescripcion = ref('')
const fraseClave = ref('')
const slug = ref('')
const mensaje = ref('')
const subiendoImagen = ref(false)
const enviandoNoticia = ref(false)

watch(titular, (nuevo) => {
  if (!nuevo) {
    slug.value = ''
    return
  }

  // Obtener solo las primeras 3 palabras significativas
  const palabras = nuevo
    .toLowerCase()
    .replace(/[^\w\sáéíóúüñ]/gi, '') // quitar signos
    .split(/\s+/)
    .filter(p => p.length > 0)
    .slice(0, 3) // solo 3 palabras

  // Crear slug con esas palabras
  slug.value = slugify(palabras.join(' '), { lower: true, strict: true })
})

watch(descripcion, (nuevoHtml) => {
  if (!nuevoHtml) return

  // Convertir HTML a solo texto
  const temp = document.createElement('div')
  temp.innerHTML = nuevoHtml
  const textoPlano = temp.innerText || temp.textContent || ''

  // Meta descripción SEO
  metaDescripcion.value = textoPlano.slice(0, 150)

  // Frase clave básica (la palabra más repetida)
  const palabras = textoPlano
    .toLowerCase()
    .replace(/[^\w\sáéíóúüñ]/gi, '') // quitar signos
    .split(/\s+/)
    .filter(p => p.length > 4) // palabras significativas

  const frecuencia = {}
  palabras.forEach(p => frecuencia[p] = (frecuencia[p] || 0) + 1)
  const fraseClaveMasComun = Object.entries(frecuencia)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || ''

  fraseClave.value = fraseClaveMasComun
})


const subirImagen = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  subiendoImagen.value = true
  const formData = new FormData()
  formData.append('image', file)

  try {
    const res = await fetch('/api/upload-image', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al subir imagen')
    foto.value = data.url

    Swal.fire({
      icon: 'success',
      title: 'Imagen subida correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error al subir imagen',
      text: err.message
    })
  } finally {
    subiendoImagen.value = false
  }
}
const execCmd = (comando) => {
  if (comando === 'createLink') {
    const url = prompt('Ingresa la URL del enlace:')
    if (url) document.execCommand(comando, false, url)
  } else {
    document.execCommand(comando, false, null)
  }
}

const updateDescripcion = () => {
  const editor = document.getElementById('editor')
  descripcion.value = editor.innerHTML
}


const enviarNoticia = async () => {
  if (!foto.value) {
    return Swal.fire({
      icon: 'warning',
      title: 'Falta imagen',
      text: 'Debes subir una imagen primero'
    })
  }

  enviandoNoticia.value = true

  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)

  const { error } = await useFetch('/api/noticias', {
    method: 'POST',
    body: {
      foto: foto.value,
      titular: titular.value,
      descripcion: descripcion.value,
      fecha: hoy,
      categoria: categoria.value,
      metaDescripcion: metaDescripcion.value,
      fraseClave: fraseClave.value,
      slug: slug.value,
    },
  })

  if (error.value) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: '❌ Error al crear la noticia'
    })
    enviandoNoticia.value = false
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Noticia publicada',
      text: '✅ Noticia creada exitosamente',
      showConfirmButton: false,
      timer: 2000
    })

    // Limpiar
    foto.value = ''
    titular.value = ''
    descripcion.value = ''
    categoria.value = ''
    metaDescripcion.value = ''
    fraseClave.value = ''
    slug.value = ''
    mensaje.value = ''
    enviandoNoticia.value = false
  }
}
</script>