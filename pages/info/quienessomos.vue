<template>
  <div class="quienes-somos-container py-5 text-white">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-bold text-danger">📌 ¿Quiénes Somos?</h2>
        <p class="text-white-50 fs-5">Conoce más sobre <strong>La Mira Noticiosa</strong>, nuestra historia, misión y visión.</p>
      </div>

      <div class="row g-5">
        <!-- Historia -->
        <div class="col-md-6">
          <div class="bg-dark p-4 rounded shadow-sm h-100">
            <h4 class="text-danger mb-3">📖 Nuestra Historia</h4>
            <p>
              <strong>La Mira Noticiosa</strong> nació con la firme intención de ofrecer una plataforma informativa
              que resalte la verdad, la voz ciudadana y la actualidad nacional e internacional. Desde nuestros
              inicios, hemos apostado por el periodismo independiente, valiente y comprometido con la comunidad.
            </p>
            <p>
              Día a día trabajamos para llevarte la mejor información con objetividad y responsabilidad,
              entendiendo que una sociedad bien informada es una sociedad más libre.
            </p>
          </div>
        </div>

        <!-- Misión y Visión -->
        <div class="col-md-6">
          <div class="bg-danger p-4 rounded shadow-sm h-100 text-white">
            <h4 class="mb-3">🎯 Misión</h4>
            <p>
              Informar con veracidad y agilidad sobre los hechos más relevantes de Colombia y el mundo,
              promoviendo una ciudadanía activa y consciente.
            </p>

            <h4 class="mt-4 mb-3">🚀 Visión</h4>
            <p>
              Convertirnos en uno de los medios digitales más confiables y leídos del país, siendo
              referentes por nuestra ética periodística y cercanía con la comunidad.
            </p>
          </div>
        </div>
      </div>

      <!-- Valores -->
      <div class="mt-5">
        <h4 class="text-danger text-center mb-4">💡 Nuestros Valores</h4>
        <div class="row g-3 text-center">
          <div class="col-md-3">
            <div class="bg-dark p-3 rounded shadow-sm h-100">
              <i class="fas fa-balance-scale fa-2x text-danger mb-2"></i>
              <h6 class="text-white">Veracidad</h6>
              <p class="text-white-50 small">Comprometidos con la verdad y la precisión en cada noticia.</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="bg-dark p-3 rounded shadow-sm h-100">
              <i class="fas fa-user-shield fa-2x text-danger mb-2"></i>
              <h6 class="text-white">Ética</h6>
              <p class="text-white-50 small">Manejamos la información con profesionalismo y responsabilidad.</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="bg-dark p-3 rounded shadow-sm h-100">
              <i class="fas fa-users fa-2x text-danger mb-2"></i>
              <h6 class="text-white">Compromiso</h6>
              <p class="text-white-50 small">Estamos al servicio de la comunidad informativa nacional.</p>
            </div>
          </div>
          <div class="col-md-3">
            <div class="bg-dark p-3 rounded shadow-sm h-100">
              <i class="fas fa-bullhorn fa-2x text-danger mb-2"></i>
              <h6 class="text-white">Independencia</h6>
              <p class="text-white-50 small">Publicamos sin sesgos, con total libertad editorial.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Equipo (opcional) -->
      <div class="mt-5 text-center">
        <h4 class="text-danger mb-3">🧑‍💻 Nuestro Equipo</h4>
        <p class="text-white-50">Somos un grupo de periodistas, diseñadores y desarrolladores que creemos en el poder de una noticia bien contada. Trabajamos desde distintas regiones de Colombia, conectando realidades y acercando voces.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// No requiere lógica por ahora, pero se puede extender para mostrar miembros del equipo, por ejemplo
</script>

<style scoped>
.quienes-somos-container {
  background: linear-gradient(to right, #000, #111);
}

.bg-dark {
  background-color: #1c1c1c !important;
}

h4 {
  font-weight: bold;
}
</style>
