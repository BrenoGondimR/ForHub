<template>
  <b-row class="fluxo-principal">
    <b-colxx lg="12" class="mb-4">
      <h2 class="titulo-dash">Visão Geral</h2>
      <span class="subtitulo-dash">Todos os dados sobre a empresa aqui</span>
    </b-colxx>
    <b-colxx lg="9">
      <b-row>
        <b-colxx lg="4" v-for="card in cards" :key="card.title" class="mb-4">
          <CardDashboard
              :title="card.title"
              :icon="card.icon"
              :value="card.value"
              :subDescription="card.subDescription"
              :percentage="card.percentage"
              :color="card.color"
          />
        </b-colxx>
        <b-colxx lg="12" class="mb-4">
          <GradientLineChart title="Gráfico Financeiro" detail1="2023" detail2="Ganhos, Custos e Renda" />
        </b-colxx>
      </b-row>
    </b-colxx>
    <b-colxx lg="3">
      <CustomerSatisfactionCard :score="4.18" />
      <UpcomingArrivalsCard :reservations="reservations" class="mt-4" />
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import CardDashboard from "@/components/Common/CardDashboard.vue";
import CustomerSatisfactionCard from "@/components/Common/CustomerSatisfactionCard.vue";
import GradientLineChart from "@/components/Common/GradientLineChart.vue";
import UpcomingArrivalsCard from "@/components/Common/UpcomingArrivalsCard.vue";

export default {
  name: "home",
  components: {
    CustomerSatisfactionCard,
    CardDashboard,
    GradientLineChart,
    UpcomingArrivalsCard,
    BColxx,
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
          color: "#FFA500" // cor laranja
        },
        {
          title: "Partidas Hoje",
          icon: "pi pi-arrow-up-left",
          value: 234,
          subDescription: "Últimos 7 dias",
          percentage: 3.15,
          color: "#0000FF" // cor azul
        },
        {
          title: "Total Reservado",
          icon: "pi pi-check",
          value: 421,
          subDescription: "Últimos 30 dias",
          percentage: 3.15,
          color: "#87CEEB" // cor azul claro
        }
      ],
      reservations: [
        {
          name: "Courtney Henry",
          room: "Quarto 25A",
          dates: "24 Jul - 26 Jul",
        },
        {
          name: "Leslie Alexander",
          room: "Quarto 25A",
          dates: "24 Jul - 26 Jul",
        },
        {
          name: "Savannah Nguyen",
          room: "Quarto 25A",
          dates: "24 Jul - 26 Jul",
        }
      ]
    };
  },
  methods: {},
  mounted() {

  }
};
</script>

<style scoped>
.titulo-dash {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: black;
}

.fluxo-principal {
  margin: 20px !important;
}

.subtitulo-dash {
  font-family: "Poppins", sans-serif;
}
</style>
