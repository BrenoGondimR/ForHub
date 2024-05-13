<template>
  <b-container fluid class="vh-100">
    <b-row class="h-100">
      <b-colxx class="container-img" md="6" style="padding: 10px; height: 100% !important;">
        <div class="login-image-container">
          <img :src="'https://i.imgur.com/YB2cezI.jpg'" alt="Img" class="full-width-img" style="height: 100%; width: 100%;">
          <div class="overlay-text">
            <h3>ForHub</h3>
            <p>Texto exemplo falando sobre a empresa e sua ideia.</p>
          </div>
        </div>
      </b-colxx>
      <b-colxx md="6" style="display: flex;">
        <b-card class="login-card shadow" style="width: 80% !important; margin: auto">
          <h2 class="mb-5 text-title">Registro</h2>
          <b-form-group v-for="field in fields" :key="field.id" style="margin-bottom: 35px !important;" :label-for="field.id">
            <FloatLabel>
              <component :is="field.type"
                         :style="{ width: '100%' }"
                         :id="field.id"
                         v-model="field.value"
                         :required="field.required"
                         :toggle-mask="field.toggleMask || false" />
              <label :for="field.id">{{ field.label }}</label>
            </FloatLabel>
          </b-form-group>
          <b-button class="button-dados" type="button" @click="register" variant="success" block style="width: 100%">Registrar</b-button>
        </b-card>
      </b-colxx>
    </b-row>
  </b-container>
</template>

<script>
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import {createAccount} from "@/views/Register/register_service";

export default {
  data() {
    return {
      fields: [
        { id: 'username', value: '', type: 'InputText', label: 'Usuário', required: true },
        { id: 'email', value: '', type: 'InputText', label: 'Email', required: true },
        { id: 'telefone', value: '', type: 'InputText', label: 'Telefone', required: true },
        { id: 'cpf_cnpj', value: '', type: 'InputText', label: 'CPF/CNPJ', required: true },
        { id: 'password', value: '', type: 'Password', label: 'Senha', required: true, toggleMask: true },
        { id: 'confirm-password', value: '', type: 'Password', label: 'Confirmar senha', required: true, toggleMask: true }
      ]
    };
  },
  methods: {
    register() {
      if (this.fields[5].value !== this.fields[4].value) {
        alert("As senhas não coincidem.");
        return;
      }
      let userData = {
        Nome: this.fields[0].value,
        Email: this.fields[1].value,
        TelefoneWpp: this.fields[2].value,
        CpfCNPJ: this.fields[3].value,
        Senha: this.fields[4].value
      };
      createAccount(userData)
          .then(() => {
            this.$router.push("/home");
          })
          .catch(error => {
            console.error("Falha ao registrar:", error);
            alert("Erro ao registrar. Verifique os dados e tente novamente.");
          });
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
