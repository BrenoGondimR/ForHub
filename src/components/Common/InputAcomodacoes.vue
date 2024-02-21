<template>
  <b-col lg="7" class="search-section">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Pesquisar endereço, cidade ou região" aria-label="Search" style="border-radius: 12px; z-index: 1; padding: 0 30px;">
      <span class="input-group-append">
        <button class="btn btn-primary" type="button">
          <i class="pi pi-search" style="margin: auto"></i>
        </button>
      </span>
    </div>
  </b-col>
</template>

<style>
.search-section {
  position: relative;
  margin: 0 auto;
}

.input-group {
  border-radius: 10px;
  height: 65px; /* Altura do input group */
}

.search-section .input-group .form-control {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 100%; /* Faz o input ter a mesma altura do input group */
}

#input-search{
  height: 65px;
  background-color: white;
  margin: auto;
  display: flex;
  width: 35px;
  border: none;
  z-index: 20;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.search-section .input-group-append {
  position: absolute;
  right: 0; /* Ajustado para 0 para alinhar com o canto direito do input */
  top: 0; /* Alinha com o topo do input */
  height: 100%; /* Faz o botão ter a mesma altura do input group */
}

.search-section .btn-primary {
  border-radius: 12px;
  color: white;
  font-family: "Poppins", sans-serif;
  border: none;
  background-color: #1AA3E5;
  display: flex;
  z-index: 20;
  align-items: center;
  justify-content: center;
  height: 75%;
  padding: 0 20px;
  margin-top: 8px;
  margin-right: 10px;
}

/* Ajustes para responsividade */
@media (max-width: 992px) {
  .search-section .input-group {
    width: 100%;
  }
}
</style>
<script setup>
</script>