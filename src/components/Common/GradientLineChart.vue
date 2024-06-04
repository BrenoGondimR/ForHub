<template>
  <div>
    <h3>{{ title }}</h3>
    <canvas ref="chart" :id="chartId"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: "GradientLineChart",
  props: {
    title: String,
    data: Object
  },
  data() {
    return {
      chartId: 'chart-line',
      chartInstance: null
    };
  },
  methods: {
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      const ctx = this.$refs.chart.getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: this.data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: this.title
            }
          }
        }
      });
    }
  },
  watch: {
    data: {
      handler() {
        this.renderChart();
      },
      deep: true
    }
  },
  mounted() {
    this.renderChart();
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
};
</script>

<style scoped>
/* Adicione seus estilos aqui, se necessário */
</style>
