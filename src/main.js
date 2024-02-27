import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css'
import BootstrapVue3 from 'bootstrap-vue-3';
import PrimeVue from 'primevue/config';

// Importar o arquivo CSS global
import '@/assets/css/global.css';

// Importar estilos do Bootstrap e BootstrapVue3
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

// Importar estilos do PrimeVue
import 'primevue/resources/themes/aura-light-green/theme.css'

// Componente Col Personalizado
import Colxx from "@/components/Common/Colxx.vue";

// Criar a instância do app Vue
const appInstance = createApp(App);

// Usar BootstrapVue3
appInstance.use(BootstrapVue3);

// Usar PrimeVue
appInstance.use(PrimeVue);

// Usar o Vue Router
appInstance.use(router);

// Registrar o componente Col Personalizado globalmente
appInstance.component('b-colxx', Colxx);

// Montar a aplicação
appInstance.mount('#app');
