<template>
  <b-row class="main-flux">
    <b-colxx lg="12" class="mb-4">
      <h2 class="title-dash">Financeiro</h2>
    </b-colxx>
    <b-colxx lg="9">
      <b-row>
        <b-colxx lg="3" v-for="card in cards" :key="card.title" class="mb-4">
          <CardDashboard
              :title="card.title"
              :value="card.value"
              :color="card.color"
          />
        </b-colxx>
        <b-colxx lg="12" class="mb-4">
          <GradientLineChart title="Finances" :data="chartData" />
        </b-colxx>
        <b-colxx lg="12" class="mb-4">
          <TransactionHistory :transactions="transactions" />
        </b-colxx>
      </b-row>
    </b-colxx>
    <b-colxx lg="3">
      <MyCard :card="cardDetails" />
      <QuickTransaction :contacts="quickContacts" />
      <MyGoals :goals="goals" class="mt-4" />
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import CardDashboard from "@/components/Common/CardDashboard.vue";
import GradientLineChart from "@/components/Common/GradientLineChart.vue";
import TransactionHistory from "@/components/Common/TransactionHistory.vue";
import MyCard from "@/components/Common/MyCard.vue";
import QuickTransaction from "@/components/Common/QuickTransaction.vue";
import MyGoals from "@/components/Common/MyGoals.vue";

export default {
  name: "FinancialDashboard",
  components: {
    CardDashboard,
    GradientLineChart,
    TransactionHistory,
    MyCard,
    QuickTransaction,
    MyGoals,
    BColxx,
  },
  data() {
    return {
      cards: [
        { title: "Saldo", value: "$3,596", color: "#00BFFF" },
        { title: "Renda", value: "$421", color: "#32CD32" },
        { title: "Despesas", value: "$164", color: "#FF6347" },
        { title: "Gastos", value: "$257", color: "#9370DB" }
      ],
      chartData: {
        labels: ['3 Apr', '4 Apr', '5 Apr', '6 Apr', '7 Apr', '8 Apr'],
        datasets: [
          {
            label: 'Renda',
            borderColor: '#36a2eb',
            data: [200, 178, 198, 224, 276, 297]
          },
          {
            label: 'Despesas',
            borderColor: '#ff6384',
            data: [180, 623, 286, 391, 444, 374]
          }
        ]
      },
      transactions: [
        { name: "Aaron Evans", type: "Comida", date: "March 29, 2022", amount: "$45" },
        { name: "Clement Stewart", type: "Compras", date: "March 27, 2022", amount: "-$241" },
        { name: "Jessica Johanne", type: "Outros", date: "March 25, 2022", amount: "$100" }
      ],
      cardDetails: {
        number: "5995 7474 1103 7513 0014",
        expiry: "11/24"
      },
      quickContacts: [
        { name: "Michael Jordan", image: "path/to/image1.jpg" },
        { name: "Edelyn Sandra", image: "path/to/image2.jpg" },
        { name: "Ahmed Azhar", image: "path/to/image3.jpg" },
        { name: "Celyn Gustav", image: "path/to/image4.jpg" }
      ],
      goals: [
        { name: "New iMac", progress: 50 },
        { name: "New Macbook 14\"", progress: 60 }
      ]
    };
  }
};
</script>

<style scoped>
.title-dash {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: black;
}
</style>
