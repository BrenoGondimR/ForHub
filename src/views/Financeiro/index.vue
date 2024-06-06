<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12" class="mb-4">
      <h2 class="title-dash">Financeiro</h2>
    </b-colxx>
    <b-colxx lg="12" class="mb-4">
      <Button
          label="Adicionar Finanças"
          icon="pi pi-plus"
          class="p-button-success rounded-button"
          @click="showAddFinanceModal = true"
      />
    </b-colxx>
    <b-colxx lg="9" md="8" sm="12">
      <b-row>
        <b-colxx lg="3" md="6" sm="12" v-for="card in cards" :key="card.title" class="mb-4">
          <CardDashboard
              :title="card.title"
              :value="card.value"
              :color="card.color"
          />
        </b-colxx>
        <b-colxx lg="12" md="12" sm="12" class="mb-4">
          <GradientLineChart title="Finances" :data="chartData" />
        </b-colxx>
        <b-colxx lg="12" md="12" sm="12" class="mb-4">
          <TransactionHistory :transactions="transactions" />
        </b-colxx>
      </b-row>
    </b-colxx>
    <b-colxx lg="3" md="4" sm="12">
      <QuickTransaction :contacts="quickContacts" />
      <MyGoals :goals="goals" class="mt-4" />
    </b-colxx>

    <Dialog header="Adicionar Finanças" :visible.sync="showAddFinanceModal" modal class="p-fluid" :style="{ width: '90vw', maxWidth: '500px' }" @hide="closeModal">
      <div class="p-field">
        <label for="finance-type">Tipo</label>
        <Dropdown id="finance-type" v-model="financeType" :options="financeOptions" optionLabel="label" optionValue="value" placeholder="Selecione o tipo" />
      </div>
      <div class="p-field">
        <label for="finance-value">Valor</label>
        <span class="p-inputgroup">
          <span class="p-inputgroup-addon">R$</span>
          <InputNumber id="finance-value" v-model="financeValue" mode="currency" currency="BRL" locale="pt-BR" :minFractionDigits="2" />
        </span>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="showAddFinanceModal = false" />
        <Button label="Salvar" icon="pi pi-check" class="p-button-text" @click="saveFinance" />
      </template>
    </Dialog>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import CardDashboard from "@/components/Common/CardDashboard.vue";
import GradientLineChart from "@/components/Common/GradientLineChart.vue";
import TransactionHistory from "@/components/Common/TransactionHistory.vue";
import QuickTransaction from "@/components/Common/QuickTransaction.vue";
import MyGoals from "@/components/Common/MyGoals.vue";

export default {
  name: "FinancialDashboard",
  components: {
    CardDashboard,
    GradientLineChart,
    TransactionHistory,
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
      quickContacts: [
        { name: "Michael Jordan", image: "path/to/image1.jpg" },
        { name: "Edelyn Sandra", image: "path/to/image2.jpg" },
        { name: "Ahmed Azhar", image: "path/to/image3.jpg" },
        { name: "Celyn Gustav", image: "path/to/image4.jpg" }
      ],
      goals: [
        { name: "New iMac", progress: 50 },
        { name: "New Macbook 14\"", progress: 60 }
      ],
      showAddFinanceModal: false,
      financeType: null,
      financeValue: null,
      financeOptions: [
        { label: "Renda", value: "renda" },
        { label: "Despesa", value: "despesa" }
      ]
    };
  },
  methods: {
    closeModal() {
      this.showAddFinanceModal = false;
    },
    saveFinance() {
      if (this.financeType && this.financeValue !== null) {
        console.log('Finance Type:', this.financeType);
        console.log('Finance Value:', this.financeValue);
        this.showAddFinanceModal = false;
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    }
  }
};
</script>

<style scoped>
.title-dash {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: black;
}

.rounded-button {
  border-radius: 25px;
}
</style>
