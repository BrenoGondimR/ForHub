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
            <button class="button-secondary">
              <router-link class="nav-link" to="/login" style="color: black">Login</router-link>
            </button>
            <div v-if="$route.path.startsWith('/dashboard')" class="avatar-circle">
              <span class="initials">{{ getUserInitials(userName) }}</span>
            </div>
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
        <Button v-show="visible === false" icon="pi pi-bars" @click="visible = true" style="border-radius: 9px;" />
        <div class="avatar-circle">
          <span class="initials">{{ getUserInitials(userName) }}</span>
        </div>
        <span class="font-bold">{{ truncateUsername(userName) }}</span> <!-- Exibe o nome do usuário truncado -->
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
                    <a @click="navigateTo('/dashboard')" 
                       class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors"
                       :class="{ 'active-link': $route.path === '/dashboard' }">
                      <i class="pi pi-chart-line mr-2"></i>
                      <span class="font-medium">Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/clientes')" 
                       class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors"
                       :class="{ 'active-link': $route.path.includes('/dashboard/clientes') }">
                      <i class="pi pi-users mr-2"></i>
                      <span class="font-medium">Clientes</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/coworkings/espacos')" 
                       class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors"
                       :class="{ 'active-link': $route.path.includes('/dashboard/coworkings') }">
                      <i class="pi pi-home mr-2"></i>
                      <span class="font-medium">Coworkings</span>
                    </a>
                  </li>
                  <li>
                    <a @click="navigateTo('/dashboard/reservas')" 
                       class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors"
                       :class="{ 'active-link': $route.path.includes('/dashboard/reservas') }">
                      <i class="pi pi-calendar-plus mr-2"></i>
                      <span class="font-medium">Reservas</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul> 
          </div>
          <div class="mt-auto">
            <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
            <div class="m-3 flex align-items-center justify-content-between p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <div class="flex align-items-center gap-2">
                <div class="avatar-circle">
                  <span class="initials">{{ getUserInitials(userName) }}</span>
                </div>
                <span class="font-bold">{{ truncateUsername(userName) }}</span>
              </div>
              <a @click="logout" class="flex align-items-center cursor-pointer text-700">
                <i class="pi pi-sign-out mr-2"></i>
                <span class="font-medium">Sair</span>
              </a>
            </div>
          </div>
        </div>
      </template>
    </Sidebar>
    <router-view/>
  </main>
</template>

<script>
import {getUserName, getUserNameById} from '@/services/userService';

export default {
  name: 'App',
  data() {
    return {
      visible: true,
      home: { icon: 'pi pi-home', to: '/dashboard' },
      breadcrumbItems: [],
      userId: parseInt(localStorage.getItem('userId'), 10),
      userName: '',

    };
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
        if (newRoute.path.startsWith('/dashboard')) {
          this.fetchUserName();
        }
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
        espacos: 'Coworkings',
        reservas_cadastro: 'Cadastro de Reserva',
        reservas_index: 'Reservas',
        cadastro_coworking: 'Cadastro de Coworking',
        cadastro_clientes: 'Cadastro de Clientes',
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
    },

    fetchUserName() {
      console.log("Verificação da rota dashboard:", this.$route.path.startsWith('/dashboard'));
      // Verifica se a rota atual começa com /dashboard
      if (this.$route.path.startsWith('/dashboard')) {
        getUserName(this.userId)
          .then(response => {
            console.log("Dados do usuário carregados com sucesso");
            this.userName = response.data.data.Nome;
          })
          .catch(error => {
            window.location.reload(); // Recarrega a página em caso de erro
          });
      }
    },
    truncateUsername(username) {
      return username.length > 20 ? username.substring(0, 20) + '...' : username;
    },
    getUserInitials(name) {
      return name.substring(0, 2).toUpperCase();
    },
    
    logout() {
      // Limpa os dados do usuário
      localStorage.removeItem('userId');
      this.userName = '';
      
      // Redireciona para a página de login
      this.$router.push('/login');
    },
  },
};
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

.avatar-circle {
  width: 32px;
  height: 32px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.active-link {
  background-color: #E6F4FF !important;
  color: #1AA3E5 !important;
  border-radius: 8px;
}

.active-link i {
  color: #1AA3E5 !important;
}

.active-link .font-medium {
  color: #1AA3E5 !important;
  font-weight: 600 !important;
}
</style>
