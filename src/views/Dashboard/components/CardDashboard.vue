<template>
  <div class="card-dashboard">
    <div class="card-header">
      <i :class="icon"></i>
    </div>
    <div class="card-body">
      <h3>{{ title }}</h3>
      <p class="value">{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDashboard",
  props: {
    title: String,
    icon: String,
    value: Number,
  }
};
</script>

<style scoped>
.card-dashboard {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-align: center;
  background-color: #fff;
}

.card-dashboard:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.card-header i {
  font-size: 36px;
  color: #333;
}

.card-body h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>