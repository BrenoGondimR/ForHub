<template>
    <div>
      <h3>Histórico de Transações</h3>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.name">
          {{ transaction.name }} - {{ transaction.type }} - {{ transaction.date }} - {{ transaction.amount }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "TransactionHistory",
    props: {
      transactions: Array
    }
  };
  </script>
  