<template>
  <b-row class="main-flux">
    <b-colxx lg="12" class="mb-4">
      <h2 class="title-dash">Overview</h2>
      <span class="subtitle-dash">Todos os dados sobre a empresa aqui</span>
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
          <GradientLineChart title="Grafico Financeiro" detail1="2023" detail2="Ganhos, Custos e Renda" />
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
          title: "Today Arrival",
          icon: "pi pi-arrow-up-right",
          value: 340,
          subDescription: "Last 7 days",
          percentage: 3.15,
          color: "#FFA500" // cor laranja
        },
        {
          title: "Today Departure",
          icon: "pi pi-arrow-up-left",
          value: 234,
          subDescription: "Last 7 days",
          percentage: 3.15,
          color: "#0000FF" // cor azul
        },
        {
          title: "Total Booked",
          icon: "pi pi-check",
          value: 421,
          subDescription: "Last 30 days",
          percentage: 3.15,
          color: "#87CEEB" // cor azul claro
        }
      ],
      reservations: [
        {
          name: "Courtney Henry",
          room: "Room 25A",
          dates: "24 Jul - 26 Jul",
        },
        {
          name: "Leslie Alexander",
          room: "Room 25A",
          dates: "24 Jul - 26 Jul",
        },
        {
          name: "Savannah Nguyen",
          room: "Room 25A",
          dates: "24 Jul - 26 Jul",
        }
      ]
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style scoped>
.title-dash {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: black;
}

.subtitle-dash {
  font-family: "Poppins", sans-serif;
}
</style>
