<template>
  <div class="card">
    <div>
      <span style="padding: 15px; border-radius: 25px; color: white !important; font-size: 17px !important;" :style="{ backgroundColor: color }" :class="icon"></span>
    </div>
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="content-card" style="display: flex; gap: 10px;">
        <div class="value">{{ value }}</div>
        <div :class="['percentage', { 'positive': isPositive, 'negative': !isPositive }]">
          <span>{{ percentage }}%</span>
          <span v-if="isPositive" class="arrow">⬆</span>
          <span v-else class="arrow">⬇</span>
        </div>
      </div>
      <div class="sub-description">{{ subDescription }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDashboard',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    subDescription: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    isPositive() {
      return this.percentage >= 0;
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  font-family: "Poppins", sans-serif;
}

.icon-container {
  background-color: #f6f8fa;
  border-radius: 50%;
  padding: 10px;
  margin-bottom: 15px;
}

.icon {
  width: 30px;
  height: 30px;
}

.content {
  text-align: left;
}

.title {
  font-size: 1rem;
  color: #555;
  margin-top: 10px;
}

.value {
  font-size: 2rem;
  font-weight: 600;
}

.percentage {
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin: 5px 0;
}

.percentage .arrow {
  font-size: 1.2rem;
  margin-left: 5px;
}

.percentage.positive {
  color: green;
}

.percentage.negative {
  color: red;
}

.sub-description {
  font-size: 0.8rem;
  color: #888;
}
</style>
