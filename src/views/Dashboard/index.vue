<template>
  <div class="dashboard">
    <div class="header">
      <h2 class="titulo-dash">Visão Geral</h2>
      <span class="subtitulo-dash">Todos os dados sobre a empresa aqui</span>
    </div>
    <div class="cards">
      <CardDashboard
          v-for="card in cards"
          :key="card.title"
          :title="card.title"
          :icon="card.icon"
          :value="card.value"
          :subDescription="card.subDescription"
          :percentage="card.percentage"
          :color="card.color"
      />
    </div>
    <div class="charts-and-satisfaction">
      <h2 class="titulo-dash">Lista de Chegadas</h2>
      <div class="satisfaction-and-arrivals">
        <UpcomingArrivalsCard :reservations="reservations" />
      </div>
    </div>
  </div>
</template>

<script>
import CardDashboard from './components/CardDashboard.vue';
import UpcomingArrivalsCard from './components/UpcomingArrivalsCard.vue';
import { getClient } from "@/views/Clientes/clientes_service";
import { getCoworking } from "@/views/Coworkings/coworkings_service";
import { getAllConfirmedReservas } from "@/views/Reservas/reservas_service";

export default {
  name: "Dashboard",
  components: {
    CardDashboard,
    UpcomingArrivalsCard,
  },
  data() {
    return {
      userId: parseInt(localStorage.getItem('userId'), 10),
      cards: [
        {
          title: "Chegadas Hoje",
          icon: "pi pi-arrow-up-right",
          value: 0,
          subDescription: "Hoje",
          percentage: 0,
        },
        {
          title: "Partidas Hoje",
          icon: "pi pi-arrow-up-left",
          value: 0,
          subDescription: "Hoje",
          percentage: 0,
        },
        {
          title: "Total Reservado",
          icon: "pi pi-check",
          value: 0,
          subDescription: "Últimos 30 dias",
          percentage: 0,
        }
      ],
      reservations: []
    };
  },
  methods: {
    async getAllChegadas() {
      try {
        const response = await getAllConfirmedReservas(this.userId);
        const reservas = response.data.data;

        // Atualizar os valores dos cartões
        this.updateCardValues(reservas);

        // Preencher a lista de chegadas
        await this.updateReservationsList(reservas);
      } catch (error) {
        console.error('Erro ao buscar reservas confirmadas:', error);
        // Trate o erro conforme necessário
      }
    },
    updateCardValues(reservas) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const chegadasHoje = reservas.filter(reserva => {
        const reservaDate = new Date(reserva.DataInicio);
        reservaDate.setHours(0, 0, 0, 0);
        return reservaDate.getTime() === today.getTime();
      });

      const partidasHoje = reservas.filter(reserva => {
        const reservaDate = new Date(reserva.DataFim);
        reservaDate.setHours(0, 0, 0, 0);
        return reservaDate.getTime() === today.getTime();
      });

      const dataLimite = new Date();
      dataLimite.setDate(dataLimite.getDate() - 30);
      dataLimite.setHours(0, 0, 0, 0);

      const reservasUltimos30Dias = reservas.filter(reserva => {
        const reservaDate = new Date(reserva.DataInicio);
        reservaDate.setHours(0, 0, 0, 0);
        return reservaDate >= dataLimite;
      });

      this.cards[0].value = chegadasHoje.length;
      this.cards[1].value = partidasHoje.length;
      this.cards[2].value = reservasUltimos30Dias.length;
    },
    async updateReservationsList(reservas) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 3); // 3 dias à frente
      futureDate.setHours(0, 0, 0, 0);

      this.reservations = [];

      for (let reserva of reservas) {
        const reservaDate = new Date(reserva.DataInicio);
        reservaDate.setHours(0, 0, 0, 0);

        // Verifica se a data da reserva está entre hoje e 3 dias à frente
        if (reservaDate >= today && reservaDate <= futureDate) {
          const clientName = await this.fetchClientName(reserva.ClienteID);
          const spaceName = await this.fetchCoworkingSpaceName(reserva.CoworkingSpaceID);

          this.reservations.push({
            name: clientName || "Nome não disponível",
            room: spaceName || "Espaço não disponível",
            date: this.formatDate(reserva.DataInicio),
            time: this.formatTime(reserva.HoraInicio),
            totalValue: `R$ ${reserva.ValorTotal.toFixed(2)}`,
            observations: reserva.Observacoes
          });
        }
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
    async fetchCoworkingSpaceName(spaceId) {
      try {
        const response = await getCoworking(spaceId);
        return response.data.data.Nome;
      } catch (error) {
        console.error('Erro ao buscar espaço de coworking:', error);
        return null;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const ano = date.getFullYear();
      return `${dia}/${mes}/${ano}`;
    },
    formatTime(timeString) {
      if (!timeString) return '';
      const date = new Date(timeString);
      const horas = date.getHours().toString().padStart(2, '0');
      const minutos = date.getMinutes().toString().padStart(2, '0');
      return `${horas}:${minutos}`;
    }
  },
  created() {
    this.getAllChegadas();
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.header {
  margin-bottom: 20px;
}

.titulo-dash {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.subtitulo-dash {
  font-size: 16px;
  color: #888;
}

.cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.charts-and-satisfaction {
  gap: 20px;
  margin-bottom: 20px;
}

.chart-container {
  flex: 2; /* O gráfico ocupa mais espaço */
}

.satisfaction-and-arrivals {
  flex: 1; /* O componente de satisfação ocupa menos espaço */
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
