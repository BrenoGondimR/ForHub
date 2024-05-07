<template>
  <b-container fluid class="vh-100">
    <b-row class="h-100">
      <!-- Coluna da Imagem com Texto -->
      <b-colxx class="container-img" md="6" style="padding: 10px; height: 100% !important;">
        <div class="login-image-container">
          <img :src="'https://i.imgur.com/YB2cezI.jpg'" alt="Img" class="full-width-img">
          <div class="overlay-text">
            <h3>ForHub</h3>
            <p>Texto exemplo falando sobre a empresa e sua ideia.</p>
          </div>
        </div>
      </b-colxx>
      <!-- Coluna do Formulário de Registro -->
      <b-colxx md="6" style="display: flex;">
        <b-card class="login-card shadow" style="width: 80% !important; margin: auto">
          <h2 class="mb-5 text-title">Registro</h2>
          <b-form-group style="margin-bottom: 35px !important;" label-for="input-username">
            <FloatLabel>
              <InputText style="width: 100%" id="username" v-model="username" required />
              <label for="username">Usuário</label>
            </FloatLabel>
          </b-form-group>
          <b-form-group style="margin-bottom: 35px !important;" label-for="input-email">
            <FloatLabel>
              <InputText style="width: 100%" id="email" v-model="email" required />
              <label for="email">Email</label>
            </FloatLabel>
          </b-form-group>
          <b-form-group style="margin-bottom: 35px !important;" label-for="input-password">
            <FloatLabel>
              <Password style="width: 100%" id="password" v-model="password" toggleMask required />
              <label for="password">Senha</label>
            </FloatLabel>
          </b-form-group>
          <b-form-group label-for="input-confirm-password">
            <FloatLabel>
              <Password style="width: 100%" id="confirm-password" v-model="confirmPassword" toggleMask required />
              <label for="confirm-password">Confirmar senha</label>
            </FloatLabel>
          </b-form-group>
          <b-button class="button-dados" type="submit" variant="success" block style="width: 100%">Registrar</b-button>
        </b-card>
      </b-colxx>
    </b-row>
  </b-container>
</template>

<script>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    login() {
      // Implementar lógica de registro
    }
  }
};
</script>

<style scoped>
.login-card {
  padding: 20px;
  max-width: 550px;
}

:deep(.p-inputtext), :deep(.p-password) {
  width: 100% !important;
}

.login-image-container {
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(107, 122, 164, 0.5); /* Cor azul com opacidade */
  z-index: 1;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2; /* Garante que o texto fique acima da imagem */
  text-align: center; /* Centraliza o texto horizontalmente */
  color: white; /* Muda a cor do texto para branco */
}

@media screen and (max-width: 768px) {
  .container-img{
    display: none;
  }
}
</style>
