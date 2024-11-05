<template>
  <b-container fluid class="vh-100">
    <b-row class="h-100">
      <!-- Coluna da Imagem com Texto -->
      <b-colxx class="container-img" md="6" style="padding: 10px; height: 100% !important;">
        <div class="login-image-container">
          <img :src="'https://i.imgur.com/YB2cezI.jpg'" alt="Img" class="full-width-img">
          <div class="overlay-text">
            <h3>ForHub</h3>
            <p>O site ideal para você encontrar o espaço perfeito para trabalhar.</p>
          </div>
        </div>
      </b-colxx>
      <!-- Coluna do Formulário de Login -->
      <b-colxx md="6" style="display: flex;">
        <b-card class="login-card shadow" style="width: 80% !important; margin: auto">
          <h2 class="mb-5 text-title">Login</h2>
          <b-form @submit.prevent="login">
            <b-form-group style="margin-bottom: 35px !important;" label-for="input-username">
              <FloatLabel>
                <InputText style="width: 100%" id="username" v-model="username" required />
                <label for="username">Username</label>
              </FloatLabel>
            </b-form-group>
            <b-form-group label-for="input-password">
              <FloatLabel>
                <Password style="width: 100%" id="password" v-model="password" toggleMask :feedback="false" />
                <label for="password">Password</label>
              </FloatLabel>
            </b-form-group>
            <b-button class="button-dados" type="submit" variant="success" block style="width: 100%; box-shadow: 0 4px 9px -4px #1AA3E5 !important;">Entrar</b-button>
          </b-form>
          <b-button class="mt-2 button-dados2" @click="redirectToRegister" variant="success" block style="width: 100%; background: none !important; border: 1.5px solid #1AA3E5; color: #1AA3E5;">Registrar</b-button>
        </b-card>
      </b-colxx>
    </b-row>
  </b-container>
</template>

<script>
import { userLogin } from "@/views/Login/login_service";

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      const userData = {
        nome: this.username,
        senha: this.password
      };
      userLogin(userData)
          .then(response => {
            console.log("Resposta do login:", response);
            // Verifique a estrutura da resposta
            const userId = response.data.id;
            if (userId) {
              console.log("Login bem-sucedido, ID do usuário:", userId);
              // Salva o ID em localStorage
              localStorage.setItem('userId', userId);

              // Redireciona para o dashboard
              this.$router.push("/dashboard");
            } else {
              console.error("ID do usuário não encontrado na resposta.");
              alert("Erro ao Logar. Dados inválidos.");
            }
          })
          .catch(error => {
            console.error("Falha ao Logar:", error);
            alert("Erro ao Logar. Verifique os dados e tente novamente.");
          });
    },
    redirectToRegister() {
      this.$router.push('/register');
    }
  }

};
</script>

<style scoped>
.login-card {
  padding: 20px;
  max-width: 550px;
}

:deep(.p-inputtext) {
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
  background-color: rgba(107, 122, 164, 0.5);
  z-index: 1;
}

.full-width-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100% !important;
  object-fit: cover;
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  color: white;
}

@media screen and (max-width: 768px) {
  .container-img {
    display: none;
  }
}
</style>
