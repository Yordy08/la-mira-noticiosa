<template>
  <div class="container py-4">

    <!-- Encabezado -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Gestión de Contactos</h2>

      <button
        class="btn btn-primary"
        @click="mostrarCrear = true"
      >
        Nuevo Contacto
      </button>
    </div>

    <!-- Buscador -->
    <div class="mb-3">
      <input
        v-model="busqueda"
        type="text"
        class="form-control"
        placeholder="Buscar contacto..."
      >
    </div>

    <!-- Tabla -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover">

        <thead class="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th width="180">Acciones</th>
          </tr>
        </thead>

        <tbody>

          <tr
            v-for="item in filtrados"
            :key="item.id"
          >
            <td>{{ item.nombre }}</td>
            <td>{{ item.telefono }}</td>
            <td>
              <span
                class="badge"
                :class="item.estado === 'activo'
                  ? 'bg-success'
                  : 'bg-danger'"
              >
                {{ item.estado }}
              </span>
            </td>

            <td>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="editar(item)"
              >
                Editar
              </button>

              <button
                class="btn btn-danger btn-sm"
                @click="eliminar(item.id)"
              >
                Eliminar
              </button>
            </td>
          </tr>

          <tr v-if="filtrados.length === 0">
            <td
              colspan="4"
              class="text-center"
            >
              No hay contactos
            </td>
          </tr>

        </tbody>

      </table>
    </div>

  </div>

  <!-- MODAL CREAR -->
  <div
    v-if="mostrarCrear"
    class="fondo-modal"
  >
    <div class="modal-box">

      <h4 class="mb-3">Nuevo Contacto</h4>

      <input
        v-model="form.nombre"
        class="form-control mb-3"
        placeholder="Nombre"
      >

      <input
        v-model="form.telefono"
        class="form-control mb-3"
        placeholder="Teléfono"
      >

      <div class="text-end">
        <button
          class="btn btn-secondary me-2"
          @click="mostrarCrear = false"
        >
          Cerrar
        </button>

        <button
          class="btn btn-primary"
          @click="guardar"
        >
          Guardar
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL EDITAR -->
  <div
    v-if="mostrarEditar"
    class="fondo-modal"
  >
    <div class="modal-box">

      <h4 class="mb-3">Editar Contacto</h4>

      <input
        v-model="editForm.nombre"
        class="form-control mb-3"
        placeholder="Nombre"
      >

      <input
        v-model="editForm.telefono"
        class="form-control mb-3"
        placeholder="Teléfono"
      >

      <select
        v-model="editForm.estado"
        class="form-select mb-3"
      >
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>

      <div class="text-end">
        <button
          class="btn btn-secondary me-2"
          @click="mostrarEditar = false"
        >
          Cerrar
        </button>

        <button
          class="btn btn-success"
          @click="actualizar"
        >
          Actualizar
        </button>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const contactos = ref([])
const busqueda = ref('')

const mostrarCrear = ref(false)
const mostrarEditar = ref(false)

const form = ref({
  nombre: '',
  telefono: ''
})

const editForm = ref({
  id: '',
  nombre: '',
  telefono: '',
  estado: 'activo'
})

const cargar = async () => {
  contactos.value = await $fetch('/api/contactos')
}

const guardar = async () => {
  await $fetch('/api/contactos', {
    method: 'POST',
    body: form.value
  })

  form.value = {
    nombre: '',
    telefono: ''
  }

  mostrarCrear.value = false
  cargar()
}

const editar = (item) => {
  editForm.value = { ...item }
  mostrarEditar.value = true
}

const actualizar = async () => {
  await $fetch(`/api/contactos/${editForm.value.id}`, {
    method: 'PUT',
    body: editForm.value
  })

  mostrarEditar.value = false
  cargar()
}

const eliminar = async (id) => {
  if (!confirm('¿Eliminar contacto?')) return

  await $fetch(`/api/contactos/${id}`, {
    method: 'DELETE'
  })

  cargar()
}

const filtrados = computed(() => {
  return contactos.value.filter(item =>
    item.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
    item.telefono.includes(busqueda.value)
  )
})

onMounted(() => {
  cargar()
})
</script>

<style scoped>
.fondo-modal {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.6);
  width: 100%;
  height: 100%;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-box {
  background: white;
  width: 420px;
  padding: 25px;
  border-radius: 10px;
}

.table td,
.table th {
  vertical-align: middle;
}
</style>