<template>
    <div>
      <h3>My Goals</h3>
      <div v-for="goal in goals" :key="goal.name" class="goal">
        <p>{{ goal.name }} - {{ goal.progress }}%</p>
        <ProgressBar :value="goal.progress" />
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "MyGoals",
    components: {
    },
    props: {
      goals: Array
    }
  };
  </script>
  
  <style scoped>
  .goal {
    margin-bottom: 10px;
  }
  </style>
  