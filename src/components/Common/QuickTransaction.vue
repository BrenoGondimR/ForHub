<template>
    <div>
      <h3>Transação Rápida</h3>
      <div v-for="contact in contacts" :key="contact.name" class="contact">
        <div class="contact-image" :style="{ backgroundColor: contact.color }"></div>
        <p>{{ contact.name }}</p>
      </div>
      <InputText placeholder="R$ Valor" v-model="amount" />
      <Button label="Enviar" @click="sendTransaction" />
    </div>
  </template>
  
  <script>
  import { InputText } from 'primevue/inputtext';
  import { Button } from 'primevue/button';
  
  export default {
    name: "QuickTransaction",
    components: {
      InputText,
      Button
    },
    props: {
      contacts: Array
    },
    data() {
      return {
        amount: ''
      };
    },
    methods: {
      sendTransaction() {
        // lógica para enviar a transação
      }
    }
  };
  </script>
  
  <style scoped>
  .contact {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .contact-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  </style>
  