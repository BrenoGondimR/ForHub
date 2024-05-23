<template>
  <div class="customer-satisfaction-card">
    <div class="card-header">
      <span>Customers Satisfaction</span>
    </div>
    <div class="card-body">
      <Knob v-model="value" :min="0" :max="5" :step="0.1" :value="score" :readonly="true" :size="170" :strokeWidth="15" :valueColor="color" :rangeColor="'#f6f8fa'" :textColor="'#000000'" />
      <div class="score-text">
        <div>Total Score</div>
        <div class="score">{{ score }}/5</div>
      </div>
      <div class="description">
        Improve your service to increase the score of customer satisfactions
      </div>
      <button class="review-button">
        See Customer Reviews
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CustomerSatisfactionCard',
  components: {
  },
  props: {
    score: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    color() {
      return this.score >= 4 ? '#007bff' : this.score >= 3 ? '#ffc107' : '#dc3545';
    },
    value() {
      return this.score;
    }
  }
}
</script>

<style scoped>
.customer-satisfaction-card {
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  box-shadow: 0 0 20px #d6eaff;
  flex-direction: column;
  align-items: center;
  font-family: "Poppins", sans-serif;
}

.card-header {
  font-size: 1.2rem;
  font-weight: 600;
  border: 0px !important;
  margin-bottom: 10px;
}

.card-body {
  text-align: center;
}

.score-text {
  margin: 10px 0;
}

.score {
  font-size: 2rem;
  font-weight: bold;
}

.description {
  font-size: 0.9rem;
  color: #888;
  margin: 10px 0;
}

.review-button {
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-weight: 550;
  margin-top: 10px;
}


/* Adicionando box-shadow ao range azul do Knob */
:deep(.p-knob-value) {
  filter: drop-shadow(0 0 2px rgba(0, 123, 255, 1.5));
}

</style>
