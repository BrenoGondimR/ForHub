<template>
  <div class="card">
    <div class="card-icon">
      <i :class="icon" style="font-size: 30px !important;"></i>
    </div>
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-quantity">{{ quantity }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  font-family: "Poppins", sans-serif;
}

.card-icon {
  font-size: 30px;
}

.card-content {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 18px;
  margin: 0;
}

.card-quantity {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  text-align: center;
}
</style>
