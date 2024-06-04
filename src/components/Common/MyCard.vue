<template>
    <div class="my-card p-card">
      <div class="p-card-body">
        <div>{{ card.number }}</div>
        <div>{{ card.expiry }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyCard",
    props: {
      card: Object
    }
  };
  </script>
  
  <style scoped>
  .my-card {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  </style>
  