<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>
      <p class="text-sm">
        <i class="fa fa-arrow-up text-success"></i>
        <span class="font-weight-bold">{{ detail1 }}</span>
        {{ detail2 }}
      </p>
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="chart-line" class="chart-canvas" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "GradientLineChart",
  props: {
    title: {
      type: String,
      default: "Grafico Financeiro",
    },
    detail1: {
      type: String,
    },
    detail2: {
      type: Number,
      default: 2023,
    },
  },
  data() {
    return {
      ganhos: [12, 19, 3, 5, 2, 3, 15, 20, 30, 45, 20, 25],
      custos: [8, 11, 5, 8, 3, 7, 12, 18, 28, 35, 15, 20],
      renda: [4, 8, -2, -3, -1, -4, 3, 2, 2, 10, 5, 5],
    };
  },
  methods: {
    getAllFinanceiroCGR() {
      // Uncomment this block if you have a service to get data
      // getAllCGR(localStorage.getItem('estabId'))
      //     .then((result) => {
      //       this.ganhos = result.data.ganhos;
      //       this.custos = result.data.custos;
      //       this.renda = result.data.renda;
      //       this.renderChart()
      //     })
      //     .catch((error) => {
      //       console.error(error);
      //     });

      // For now, just call renderChart to demonstrate
      this.renderChart();
    },
    renderChart() {
      const ctx = document.getElementById("chart-line").getContext("2d");

      const gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke1.addColorStop(1, "rgba(102, 204, 0, 0.2)"); // Verde mais forte
      gradientStroke1.addColorStop(0.2, "rgba(102, 204, 0, 0.0)"); // Transparente
      gradientStroke1.addColorStop(0, "rgba(102, 204, 0, 0)"); // Transparente

      const gradientStroke2 = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke2.addColorStop(1, "rgba(255, 0, 0, 0.2)"); // Vermelho
      gradientStroke2.addColorStop(0.2, "rgba(255, 0, 0, 0.0)"); // Transparente
      gradientStroke2.addColorStop(0, "rgba(255, 0, 0, 0)"); // Transparente

      const gradientStroke3 = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke3.addColorStop(1, "rgba(0, 0, 255, 0.2)"); // Azul
      gradientStroke3.addColorStop(0.2, "rgba(0, 0, 255, 0.0)"); // Transparente
      gradientStroke3.addColorStop(0, "rgba(0, 0, 255, 0)"); // Transparente

      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Ganhos",
              tension: 0.4,
              pointRadius: 0,
              borderColor: "#318f29",
              backgroundColor: gradientStroke1,
              borderWidth: 3,
              fill: true,
              data: this.ganhos,
              maxBarThickness: 6,
            },
            {
              label: "Custos",
              tension: 0.4,
              pointRadius: 0,
              borderColor: "#9b1d28",
              backgroundColor: gradientStroke2,
              borderWidth: 3,
              fill: true,
              data: this.custos,
              maxBarThickness: 6,
            },
            {
              label: "Renda",
              tension: 0.4,
              pointRadius: 0,
              borderColor: "#2257af",
              backgroundColor: gradientStroke3,
              borderWidth: 3,
              fill: true,
              data: this.renda,
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#fbfbfb",
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#ccc",
                padding: 20,
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.getAllFinanceiroCGR();
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: "Poppins", sans-serif;
}

.card-header {
  padding-bottom: 0;
  margin-bottom: 0;
}

.card-body {
  padding: 20px;
}

.chart {
  position: relative;
  height: 300px;
}

.text-sm {
  font-size: 0.875rem;
}

.text-success {
  color: #28a745 !important;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
