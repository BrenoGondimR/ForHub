<template>
  <nav v-if="$route.path !== '/login' && $route.path !== '/register'" class="navbar navbar-expand-lg navbar-light bg-light" style="border-bottom: 1px solid #E5E8EB">
    <div class="container-fluid" style="justify-content: space-between; padding: 0 35px 0 35px">
      <b-colxx lg="3">
        <router-link class="navbar-brand" to="/" style="display: flex; gap: 10px">
          <img class="logo" src="./assets/img/logoforhub.svg" alt="Logo">
          <h6 class="text-logo">ForHub</h6>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </b-colxx>
      <b-colxx lg="9" class="collapse navbar-collapse" id="navbarNav" style="justify-content: right !important;">
        <ul class="navbar-nav" style="justify-content: right !important; gap: 15px">
          <li class="nav-item">
            <router-link class="nav-link" to="/salas-de-reuniao">Salas de Reunião</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/espacos-de-coworking">Espaços de Coworking</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/planos">Planos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/eventos">Eventos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ajuda">Ajuda</router-link>
          </li>
          <li class="nav-item" style="display:flex; gap: 5px">
            <button class="button-primary">
              <router-link class="nav-link" to="/liste-seu-espaco" style="color: white">Liste seu espaço</router-link>
            </button>
            <button class="button-secondary">
              <router-link class="nav-link" to="/login" style="color: black">Login</router-link>
            </button>
          </li>
        </ul>
      </b-colxx>
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
</style>
