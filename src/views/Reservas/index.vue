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
          <DataTable :value="reservations" paginator :rows="5" tableStyle="min-width: 50rem">
            <Column field="clientName" header="Cliente" style="width: 20%"></Column>
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
import { getAllReservas } from "@/views/Reservas/reservas_service";
import {getUserName} from "@/services/userService";
import {getAllClients, getClient} from "@/views/Clientes/clientes_service"; // Importar o método

export default {
  name: "reservations",
  components: {
    BColxx,
    CardComponent
  },
  data() {
    return {
      searchQuery: '',
      reservations: [],
      cards: [
        { title: 'Reservas Ativas', icon: 'pi pi-check-circle', quantity: 0 },
        { title: 'Reservas Pendentes', icon: 'pi pi-clock', quantity: 0 },
        { title: 'Reservas Inativas', icon: 'pi pi-times-circle', quantity: 0 }
      ]
    };
  },
  created() {
    this.fetchReservas(); // Chamar o método ao criar o componente
  },
  computed: {
    // Agora retorna todas as reservas sem aplicar o filtro
    filteredReservations() {
      return this.reservations;
    }
  },
  methods: {
    getBadgeClass(name) {
      if (!name) {
        return 'badge-default'; // Retorna uma classe padrão se o nome for indefinido ou vazio
      }
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
    formatarData(data) {
      if (!data) return '';
      const dataObj = new Date(data);

      // Obter dia, mês e ano
      const dia = dataObj.getDate().toString().padStart(2, '0'); // Adiciona 0 à esquerda
      const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0, por isso +1
      const ano = dataObj.getFullYear();

      // Retornar a data formatada no formato DD/MM/YYYY
      return `${dia}/${mes}/${ano}`;
    },
    updateCardQuantities() {
      this.cards[0].quantity = this.reservations.filter(reservation => 
        reservation.status === 'Confirmada'
      ).length;
      
      this.cards[1].quantity = this.reservations.filter(reservation => 
        reservation.status === 'Pendente'
      ).length;
      
      this.cards[2].quantity = this.reservations.filter(reservation => 
        reservation.status === 'Cancelada'
      ).length;
    },
    async fetchReservas() {
      const userId = parseInt(localStorage.getItem('userId'), 10);
      try {
        const response = await getAllReservas(userId);
        const reservasFromApi = response.data.data;
        this.reservations = []; // Limpa o array antes de adicionar novos dados

        for (let reserva of reservasFromApi) {
          const clientName = await this.fetchClientName(reserva.ClienteID);
          this.reservations.push({
            clientName: clientName || "Nome não disponível",
            space: reserva.CoworkingSpaceID,
            status: reserva.Status,
            startDate: this.formatarData(reserva.DataInicio),
            endDate: this.formatarData(reserva.DataFim),
            totalAmount: reserva.ValorTotal,
            horaInicio: reserva.HoraInicio,
            horaFim: reserva.HoraFim
          });
        }

        this.updateCardQuantities(); // Atualiza as quantidades após carregar as reservas
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    },

    async fetchClientName(clientId) {
      try {
        const response = await getClient(clientId);
        return response.data.data.Nome; // Ajuste conforme a estrutura da sua resposta
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        return null; // Retorna null em caso de erro
      }
    },
  }
};
</script>

<style scoped>
/* Adicione estilos adicionais conforme necessário */
.status-active {
  background-color: #E8F7E9;
  border: 1px solid #C9ECC8;
  color: #41BF43;
  padding: 0 10px;
  border-radius: 10px;
  display: inline-block;
}

.status-inactive {
  background-color: #FFE9E9;
  border: 1px solid #FFC9CE;
  color: #FE3232;
  padding: 0 10px;
  border-radius: 10px;
  display: inline-block;
}

.status-pending {
  background-color: #FEEDAF;
  color: #8A5340;
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
