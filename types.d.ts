import { Modal } from 'bootstrap'

const abrirModal = () => {
  const modalEl = document.getElementById('modalEditar')
  if (modalEl) {
    const modal = new Modal(modalEl)
    modal.show()
  }
}
