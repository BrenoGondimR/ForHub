<template>
  <div class="support-card" @click="handleClick">
    <div class="div-icon-card">
      <i :class="iconClass"></i>
    </div>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'SupportCard',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('card-clicked', this.text);
    }
  }
};
</script>

<style scoped>
.support-card {
  width: 315px;
  height: 165px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f4ff; /* Background color */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.support-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

i {
  font-size: 50px;
  color: #5a67d8; /* Icon color */
  margin-bottom: 10px;
}

.text {
  font-size: 15px;
  color: #5a67d8; /* Text color */
  font-family: 'Poppins', sans-serif;
  text-align: center;
}
.div-icon-card{
  height: 80px;
  justify-content: center;
  text-align: center;
  align-items: center;
  display: flex;
}
</style>
