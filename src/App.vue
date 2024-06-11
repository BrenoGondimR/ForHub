<template>
  <nav v-if="$route.path !== '/login' && $route.path !== '/register' && !$route.path.startsWith('/dashboard')" class="navbar navbar-expand-lg navbar-light bg-light" style="border-bottom: 1px solid #E5E8EB">
    <div class="container-fluid" style="justify-content: space-between; padding: 0 35px 0 35px">
      <router-link class="navbar-brand d-flex align-items-center" to="/" style="gap: 10px">
        <img class="logo" src="./assets/img/logoforhubnova.svg" alt="Logo">
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
            <router-link class="nav-link" to="/support">Ajuda</router-link>
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
  <Toolbar v-if="$route.path.startsWith('/dashboard')" class="toolbar-transition" :style="visible ? 'margin-left: 355px;' : ''" style="border-radius: 1rem; padding: 1rem 1rem 1rem 1.5rem; margin-top: 15px;">
    <template #start>
      <Breadcrumb :home="home" :model="breadcrumbItems">
        <template #item="{ item, props }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a :href="href" v-bind="props.action" @click="navigate" style="">
              <span :class="[item.icon, '']" />
              <span class=" font-semibold">{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else :href="item.url" :target="item.target" v-bind="props.action">
            <span class="text-color">{{ item.label }}</span>
          </a>
        </template>
      </Breadcrumb>
    </template>

    <template #end>
      <div class="flex align-items-center gap-2">
        <Button  v-show="visible === false" icon="pi pi-bars" @click="visible = true" style="border-radius: 9px;" />
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
      </div>
    </template>
  </Toolbar>
  <main :style="visible && $route.path.startsWith('/dashboard')? 'margin-left: 333px;' : ''" class="main-transition">
    <Sidebar v-if="$route.path.startsWith('/dashboard')" v-model:visible="visible" :dismissable="false">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">
          <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
              <span class="inline-flex align-items-center gap-2">
                <img class="logo" src="@/assets/img/logoforhubnova.svg" alt="Your Logo">
                <span class="font-semibold text-2xl text-primary" style="color: #007bff !important;">ForHub</span>
              </span>
            <span>
                <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-2rem w-2rem" style="border-radius: 26px; color: white;"></Button>
              </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-3 m-0">
              <li>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li>
                    <a @click="navigateTo('/dashboard')" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium">Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/clientes')" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
                      <i class="pi pi-users mr-2"></i>
                      <span class="font-medium">Clientes</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/coworkings/espacos')" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium">Espaços</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/calendario')" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
                      <i class="pi pi-calendar mr-2"></i>
                      <span class="font-medium">Calendário</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/reservas')" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
                      <i class="pi pi-calendar-plus mr-2"></i>
                      <span class="font-medium">Reservas</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/financas')" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors">
                      <i class="pi pi-wallet mr-2"></i>
                      <span class="font-medium">Finanças</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
            <a v-ripple class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold">Amy Elsner</span>
            </a>
          </div>
        </div>
      </template>
    </Sidebar>
    <router-view/>
  </main>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      visible: true,
      home: { icon: 'pi pi-home', to: '/dashboard' },
      breadcrumbItems: []
    }
  },
  computed: {
    shouldApplyClass() {
      return this.visible && !this.$route.path.startsWith('/dashboard');
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(newRoute) {
        this.updateBreadcrumb(newRoute);
      }
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    updateBreadcrumb(route) {
      const routeName = route.name;
      const routeMappings = {
        home: 'Home',
        login: 'Login',
        register: 'Register',
        coworkings: 'Coworkings',
        support: 'Support',
        planos: 'Planos',
        coworkinginfo: 'Detalhes do Coworking',
        dashboard: 'Dashboard',
        clientes: 'Clientes'
      };

      const label = routeMappings[routeName] || 'Unknown';

      this.breadcrumbItems = [
        { label: 'Home', route: '/dashboard' },
        { label: label, route: route.path }
      ];
    },
    isDashboardRoute() {
      return this.$route.path.startsWith('/dashboard')
    }
  }
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

.p-breadcrumb-list{
  margin-bottom: 0 !important;
  padding-left: 0 !important;
}

/* Adicionando transição suave para o margin-left */
.main-transition {
  transition: margin-left 0.3s ease;
}

.toolbar-transition {
  transition: margin-left 0.3s ease;
}

.p-sidebar {
  border-radius: 30px !important;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1) !important;
}

/* Adjust margin when sidebar is visible */
.is-sidebar-visible {
  margin-left: 333px;
}

:deep(.p-button-icon-only) {
  color: white !important;
}

:deep(.text-primary){
  color: #007bff !important;
}

.p-sidebar-mask {
  height: 97% !important;
  top: 13px !important;
  left: 13px !important;
}

</style>
