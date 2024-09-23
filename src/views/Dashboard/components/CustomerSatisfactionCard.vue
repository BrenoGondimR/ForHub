<template>
  <div class="customer-satisfaction-card">
    <h3>Média de Avaliações</h3>
    <div class="chart-container">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="score-overlay">
        <p class="score">{{ score.toFixed(2) }}</p>
        <p class="out-of">de 5</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: "CustomerSatisfactionCard",
  components: {
    Doughnut
  },
  props: {
    score: Number
  },
  computed: {
    chartData() {
      return {
        labels: ['Score', 'Remaining'],
        datasets: [
          {
            data: [this.score, 5 - this.score],
            backgroundColor: ['#4285F4', '#E0E0E0'],
            hoverBackgroundColor: ['#4285F4', '#E0E0E0']
          }
        ]
      }
    },
    chartOptions() {
      return {
        cutout: '80%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.customer-satisfaction-card {
  border: 1px solid #e0e0e0; /* Alinhado com CardDashboard */
  border-radius: 12px; /* Alinhado com CardDashboard */
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: #fff; /* Alinhado com CardDashboard */
}

.customer-satisfaction-card:hover {
  transform: translateY(-5px);
}

.chart-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.score-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.score {
  font-size: 28px; /* Aumentar o tamanho da fonte */
  font-weight: bold;
  color: #333; /* Alinhado com CardDashboard */
  margin: 0; /* Remover margem */
}

.out-of {
  font-size: 16px; /* Aumentar o tamanho da fonte */
  color: #666;
  margin: 0; /* Remover margem */
}
</style>