<template>
  <b-container fluid>
    <b-row class="financeiro-header">
      <b-colxx lg="12" class="mb-4">
        <h2 class="titulo-financeiro">Financeiro</h2>
        <span class="subtitulo-financeiro">Visão geral das finanças da empresa</span>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx lg="4" class="mb-4">
        <b-card class="card-resumo">
          <div class="card-content">
            <i class="pi pi-dollar icon-resumo"></i> <!-- Alterado para PrimeVue -->
            <div>
              <h3>Total de Ganhos</h3>
              <p class="valor">R$ {{ totalGanhos }}</p> <!-- Adicionado classe valor -->
            </div>
          </div>
        </b-card>
      </b-colxx>
      <b-colxx lg="4" class="mb-4">
        <b-card class="card-resumo">
          <div class="card-content">
            <i class="pi pi-dollar icon-resumo"></i> <!-- Alterado para PrimeVue -->
            <div>
              <h3>Total de Custos</h3>
              <p class="valor">R$ {{ totalCustos }}</p> <!-- Adicionado classe valor -->
            </div>
          </div>
        </b-card>
      </b-colxx>
      <b-colxx lg="4" class="mb-4">
        <b-card class="card-resumo">
          <div class="card-content">
            <i class="pi pi-dollar icon-resumo"></i> <!-- Alterado para PrimeVue -->
            <div>
              <h3>Renda Líquida</h3>
              <p class="valor">R$ {{ rendaLiquida }}</p> <!-- Adicionado classe valor -->
            </div>
          </div>
        </b-card>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx lg="8">
        <b-card class="card-financeiro mb-4">
          <GradientLineChart 
            title="Gráfico Financeiro" 
            detail1="2023" 
            detail2="Ganhos, Custos e Renda" 
            :ganhos="totalGanhos" 
            :custos="totalCustos" 
            :renda="rendaLiquida" 
          />
        </b-card>
      </b-colxx>
      <b-colxx lg="4">
        <b-card class="card-transacoes mb-4">
          <h3>Transações Recentes</h3>
          <ul class="transacoes-lista">
            <li v-for="transacao in transacoesRecentes" :key="transacao.id" class="transacao-item">
              <span>{{ transacao.descricao }}</span>
              <span class="valor">R$ {{ transacao.valor }}</span>
            </li>
          </ul>
        </b-card>
      </b-colxx>
    </b-row>
  </b-container>
</template>

<script>
import GradientLineChart from "@/components/Common/GradientLineChart.vue";

export default {
  name: "Financeiro",
  components: {
    GradientLineChart,
  },
  data() {
    return {
      totalGanhos: 50000,
      totalCustos: 20000,
      rendaLiquida: 30000,
      transacoesRecentes: [
        { id: 1, descricao: "Pagamento de Assinatura", valor: 150 },
        { id: 2, descricao: "Compra de Equipamentos", valor: 2000 },
        { id: 3, descricao: "Recebimento de Aluguel", valor: 5000 },
      ],
    };
  },
};
</script>

<style scoped>
.financeiro-header {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.titulo-financeiro {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: black; /* Cor preta */
}

.subtitulo-financeiro {
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  color: black; /* Cor preta */
}

.card-resumo {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column; /* Alterado para coluna */
  align-items: center;
  text-align: center; /* Centraliza o texto */
}

.card-content {
  display: flex;
  flex-direction: column; /* Alterado para coluna */
  align-items: center;
}

.icon-resumo {
  font-size: 2rem;
  color: black; /* Cor preta */
  margin-bottom: 10px; /* Espaço abaixo do ícone */
}

.card-financeiro, .card-transacoes {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-transacoes {
  padding: 20px;
}

.transacoes-lista {
  list-style: none;
  padding: 0;
}

.transacao-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.transacao-item:last-child {
  border-bottom: none;
}

.valor {
  font-weight: bold;
  color: black; /* Cor preta */
  font-size: 1.2rem; /* Aumenta o tamanho da fonte */
}
</style>


