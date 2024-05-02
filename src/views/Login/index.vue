<template>
  <b-container fluid class="vh-100">
    <b-row class="h-100">
      <!-- Coluna do Formulário de Login -->
      <b-colxx md="6" style="display: flex;">
        <b-card class="login-card shadow" style="width: 80% !important; margin: auto">
          <h2 class="mb-4">Login</h2>
          <b-form-group label="Usuário:" label-for="input-username">
            <b-form-input
                id="input-username"
                v-model="username"
                required
                placeholder="Coloque seu usuário"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Senha:" label-for="input-password">
            <b-form-input
                id="input-password"
                v-model="password"
                type="password"
                required
                placeholder="Senha"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="success" block style="width: 100%">Entrar</b-button>
        </b-card>
      </b-colxx>

      <!-- Coluna da Imagem com Texto -->
      <b-colxx md="6" class="login-image-container">
        <div class="overlay-text">
          "Easy Manage"
          <p>Na Easy Manage, transformamos complexidade em simplicidade. Para cada desafio diário de uma pousada, oferecemos uma solução fácil e eficaz.</p>
        </div>
      </b-colxx>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      establishment: ''
    };
  },
  methods: {
    login() {
      // Implementar lógica de login
    }
  }
};
</script>

<style scoped>
.login-card {
  padding: 20px;
  max-width: 400px;
}

.login-image-container {
  background-image: url('https://i.imgur.com/YB2cezI.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 20px;
  margin: 20px auto;
  overflow: hidden; /* Garante que o overlay não saia dos limites do border-radius */
}

.login-image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(169, 199, 255, 0.3); /* Cor azul com opacidade */
  z-index: 1;
}


</style>
