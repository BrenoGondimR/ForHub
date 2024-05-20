<template>
  <nav v-if="$route.path !== '/login' && $route.path !== '/register'" class="navbar navbar-expand-lg navbar-light bg-light" style="border-bottom: 1px solid #E5E8EB">
    <div class="container-fluid" style="justify-content: space-between; padding: 0 35px 0 35px">
      <router-link class="navbar-brand d-flex align-items-center" to="/" style="gap: 10px">
        <img class="logo" src="./assets/img/logoforhub.svg" alt="Logo">
        <h6 class="text-logo">ForHub</h6>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="pi pi-bars"></i>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav d-flex" style="gap: 15px">
          <li class="nav-item">
            <router-link class="nav-link" to="/planos">Planos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/eventos">Eventos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ajuda">Ajuda</router-link>
          </li>
          <li class="nav-item d-flex align-items-center" style="gap: 5px">
            <button class="button-primary">
              <router-link class="nav-link" to="/liste-seu-espaco" style="color: white">Liste seu espaço</router-link>
            </button>
            <button class="button-secondary">
              <router-link class="nav-link" to="/login" style="color: black">Login</router-link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Ajuste para ícone e botão hambúrguer no modo celular */
@media (max-width: 992px) {
  .navbar-toggler {
    order: 1;
  }
  .navbar-brand {
    order: 0;
    flex-grow: 1;
  }
  .navbar-collapse {
    order: 2;
    flex-basis: 100%;
    justify-content: flex-end;
  }
  .navbar-collapse.collapse {
    display: none !important;
  }
  .navbar-collapse.show {
    display: block !important;
  }
}
</style>
