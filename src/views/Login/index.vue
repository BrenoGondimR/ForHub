<template>
    <b-row class="login-container">
      <b-colxx lg="6" md="8" sm="10" class="mx-auto">
        <b-card class="login-card">
          <h2 class="mb-4">Faça login</h2>
          <b-form @submit.prevent="login">
            <b-form-group id="input-group-1" label="Nome de usuário:" label-for="input-username">
              <b-form-input
                id="input-username"
                v-model="username"
                required
                placeholder="Insira seu nome de usuário"
              ></b-form-input>
            </b-form-group>
  
            <b-form-group id="input-group-2" label="Senha:" label-for="input-password">
              <b-form-input
                id="input-password"
                v-model="password"
                type="password"
                required
                placeholder="Insira sua senha"
              ></b-form-input>
            </b-form-group>
  
            <b-button type="submit" variant="primary">Entrar</b-button>
          </b-form>
        </b-card>
      </b-colxx>
    </b-row>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        console.log('Nome de usuário:', this.username);
        console.log('Senha:', this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    margin-top: 50px;
  }
  
  .login-card {
    padding: 20px;
  }
  </style>