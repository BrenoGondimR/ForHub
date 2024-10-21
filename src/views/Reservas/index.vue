<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12" class="mb-4">
      <h2 class="title-dash">Reservas</h2>
    </b-colxx>
    <b-colxx lg="12">
      <b-row>
        <b-colxx v-for="(card, index) in cards" :key="index" md="4">
          <CardComponent :title="card.title" :icon="card.icon" :quantity="card.quantity" />
        </b-colxx>
      </b-row>  
    </b-colxx>
    <b-colxx lg="12" style="display: flex; justify-content: space-between;" class="mt-2 mb-2">
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"> </InputIcon>
        <InputText v-model="searchQuery" placeholder="Pesquisar" />
      </IconField>
      <Button class="button-new" @click="redirectToCadastro" label="Nova Reserva" outlined />
    </b-colxx>
    <b-colxx lg="12">
      <TabView>
        <TabPanel header="Todas">
          <DataTable :value="filteredReservations" paginator :rows="5" tableStyle="min-width: 50rem">
            <Column field="clientName" header="Cliente" style="width: 20%">
              <template #body="slotProps">
                <div class="customer-badge" :class="getBadgeClass(slotProps.data.clientName)">
                  <span class="customer-initials">{{ slotProps.data.initials }}</span>
                </div>
                <span>{{ slotProps.data.clientName }}</span>
              </template>
            </Column>
            <Column field="space" header="Espaço" style="width: 20%"></Column>
            <Column field="startDate" header="Data Início" style="width: 15%"></Column>
            <Column field="endDate" header="Data Fim" style="width: 15%"></Column>
            <Column field="status" header="Status" style="width: 15%">
              <template #body="slotProps">
                <div :class="getStatusClass(slotProps.data.status)">
                  {{ slotProps.data.status }}
                </div>
              </template>
            </Column>
            <Column field="totalAmount" header="Valor Total" style="width: 15%"></Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import CardComponent from "@/components/Common/ClientsCard.vue";
import { getAllReservas } from "@/views/Reservas/reservas_service"; // Importar o método

export default {
  name: "reservations",
  components: {
    BColxx,
    CardComponent
  },
  data() {
    return {
      searchQuery: '',
      reservations: [
        
      ],
      cards: [
        { title: 'Reservas Ativas', icon: 'pi pi-check-circle', quantity: 3 },
        { title: 'Reservas Pendentes', icon: 'pi pi-hourglass', quantity: 1 },
        { title: 'Reservas Canceladas', icon: 'pi pi-calendar-times', quantity: 1 }
      ]
    };
  },
  created() {
    this.fetchReservas(); // Chamar o método ao criar o componente
  },
  computed: {
    filteredReservations() {
      // return this.reservations.filter(reservation =>
      //   // reservation.clientName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //   // reservation.space.toLowerCase().includes(this.searchQuery.toLowerCase())
      // );
    }
  },
  methods: {
    getBadgeClass(name) {
      const badgeClasses = ['badge-1', 'badge-2', 'badge-3', 'badge-4'];
      return badgeClasses[name.length % badgeClasses.length];
    },
    getStatusClass(status) {
      switch (status) {
        case 'Confirmada': return 'status-active';
        case 'Pendente': return 'status-pending';
        case 'Cancelada': return 'status-inactive';
        default: return '';
      }
    },
    redirectToCadastro() {
      this.$router.push('/dashboard/reservas/cadastro');
    },
    fetchReservas() {
      const userId = parseInt(localStorage.getItem('userId'), 10); // Obtém o userId do localStorage
      console.log(userId)
      getAllReservas(userId) // Faz a chamada à API passando o userID
          .then(response => {
            const reservasFromApi = response.data.data; // Dados dos clientes da API
            reservasFromApi.forEach(reserva => {
              console.log(reserva)
              this.reservations.push({
                clientName: reserva.ClienteID, // Mapeia os dados conforme necessário
                space: reserva.CoworkingSpaceID,
                status: reserva.Status, // Data de criação do cliente
                startDate: reserva.DataInicio, // Email do cliente
                endDate: reserva.DataFim, // Status da conta
                totalAmount: reserva.ValorTotal, // Progresso (você pode ajustar essa lógica conforme a necessidade)
                horaInicio: reserva.HoraInicio, // Novo campo HoraInicio
                horaFim: reserva.HoraFim // Novo campo HoraFim
              });
            });
            // Remova a linha abaixo se a função não for necessária
            // this.assignRandomBadgeClass();
          })
          .catch(error => {
            console.error('Erro ao buscar clientes:', error);
          });
    }
  }
};
</script>

<style scoped>
/* Adicione estilos adicionais conforme necessário */
.status-active {
  background-color: #C8E6C9;
  color: #256029;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
}

.status-pending {
  background-color: #FEEDAF;
  color: #8A5340;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
}

.status-inactive {
  background-color: #FFCDD2;
  color: #C63737;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
}

.customer-badge {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

.customer-initials {
  font-size: 1rem;
  color: #ffffff;
}

.badge-1 { background-color: #2196F3; }
.badge-2 { background-color: #4CAF50; }
.badge-3 { background-color: #FFC107; }
.badge-4 { background-color: #FF5722; }
</style>
