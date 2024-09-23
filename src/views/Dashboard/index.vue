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
      <div class="chart-container">
        <GradientLineChart title="Gráfico Financeiro" detail1="2023" detail2="Ganhos, Custos e Renda" />
      </div>
      <div class="satisfaction-and-arrivals">
        <CustomerSatisfactionCard :score="4.89" />
        <UpcomingArrivalsCard :reservations="reservations" />
      </div>
    </div>
  </div>
</template>

<script>
import CardDashboard from './components/CardDashboard.vue';
import CustomerSatisfactionCard from './components/CustomerSatisfactionCard.vue';
import UpcomingArrivalsCard from './components/UpcomingArrivalsCard.vue';
import GradientLineChart from '@/components/Common/GradientLineChart.vue';

export default {
  name: "Dashboard",
  components: {
    CardDashboard,
    CustomerSatisfactionCard,
    UpcomingArrivalsCard,
    GradientLineChart
  },
  data() {
    return {
      cards: [
        {
          title: "Chegadas Hoje",
          icon: "pi pi-arrow-up-right",
          value: 340,
          subDescription: "Últimos 7 dias",
          percentage: 3.15,
        },
        {
          title: "Partidas Hoje",
          icon: "pi pi-arrow-up-left",
          value: 234,
          subDescription: "Últimos 7 dias",
          percentage: 3.15,
        },
        {
          title: "Total Reservado",
          icon: "pi pi-check",
          value: 421,
          subDescription: "Últimos 30 dias",
          percentage: 3.15,
        }
      ],
      reservations: [
        { name: 'João', room: 'Sala 1', date: '01/01/2023', time: '14:00', people: 2 },
        { name: 'Maria', room: 'Sala 2', date: '10/01/2023', time: '15:30', people: 1 }
      ]
    };
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
  display: flex;
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
