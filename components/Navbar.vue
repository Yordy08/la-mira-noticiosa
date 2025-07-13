<template>
  <header
    class="bg-white border-bottom py-3 px-2"
    style="
      background-image: url('https://res.cloudinary.com/dxgbnimmk/image/upload/v1752432411/Flux_Dev_Create_a_vivid_banner_image_for_a_webpage_with_a_brig_3_1_vhujn6.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    "
  >
    <div class="container-fluid">
      <div class="row align-items-center g-3">
        <!-- Logo -->
    <div class="col-12 col-md-3 text-center text-md-start">
  <a href="/">
    <img
      src="https://res.cloudinary.com/dxgbnimmk/image/upload/b_rgb:FFFFFF/v1752428805/lamirapng_nwuwyw.png"
      alt="Logo La Mira"
      style="
        width: 140px;
        height: 140px;
        object-fit: cover;
        border: 4px solid white;
        border-radius: 50%;
        box-shadow: 0 0 15px 8px white;
      "
    />
  </a>
</div>



        <!-- Buscador -->
        <div class="col-12 col-md-6">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="🔍 Buscar productos"
              aria-label="Buscar productos"
            />
            <button class="btn btn-warning" type="button">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <!-- Info contacto -->
        <div class="col-12 col-md-3 text-center text-md-end">
          <div class="d-none d-md-block text-white">
            <small class="d-block">📞 Servicio al cliente</small>
            <strong>+012 345 6789</strong>
          </div>
    
        </div>
      </div>
    </div>
  </header>
</template>
