<template>
  <div class="card-dashboard">
    <div class="card-body">
      <div style="display: flex; justify-content: space-between;">
        <h3>{{ title }}</h3>
        <i style="font-size: 25px;" :class="icon"></i>
      </div>
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
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid;
  border-radius: 16px;
  color: #1A237E; /* Azul escuro para contraste */
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-dashboard::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(26, 35, 126, 0.05), transparent);
  transform: translateX(-50%);
}

.card-dashboard:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(26, 35, 126, 0.2);
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.card-header i {
  font-size: 48px;
  color: #1E88E5; /* Azul intermediário */
}

.card-body h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.value {
  font-size: 28px;
  font-weight: 700;
  color: #1E88E5; /* Azul intermediário */
}
</style>
