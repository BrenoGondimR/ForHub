<template>
  <b-container fluid class="vh-100">
    <b-row class="h-100">
      <b-colxx class="container-img" md="6" style="padding: 10px; height: 100% !important;">
        <div class="login-image-container">
          <img :src="'https://i.imgur.com/YB2cezI.jpg'" alt="Img" class="full-width-img" style="height: 100%; width: 100%;">
          <div class="overlay-text">
            <h3>ForHub</h3>
            <p>O site ideal para você encontrar o espaço perfeito para trabalhar.</p>
          </div>
        </div>
      </b-colxx>
      <b-colxx md="6" style="display: flex;">
        <b-card class="login-card shadow" style="width: 80% !important; margin: auto">
          <h2 class="mb-5 text-title">Registro</h2>
          <b-form-group v-for="field in fields" :key="field.id" style="margin-bottom: 35px !important;" :label-for="field.id">
            <FloatLabel>
              <component :is="field.type"
                         :class="{ 'is-invalid': field.error }"
                         aria-describedby="username-help"
                         :style="{ width: '100%' }"
                         :id="field.id"
                         v-model="field.value"
                         @input="clearError(field.id)"
                         :required="field.required"
                         :feedback="false"
                         :toggle-mask="field.toggleMask || false" />
              <label :for="field.id">{{ field.label }}</label>
              <small id="username-help" v-if="field.error" class="text-danger">{{ field.error }}</small>
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
import { createAccount } from "@/views/Register/register_service";

export default {
  data() {
    return {
      fields: [
        { id: 'username', value: '', type: 'InputText', label: 'Usuário', required: true, error: '' },
        { id: 'email', value: '', type: 'InputText', label: 'Email', required: true, error: '' },
        { id: 'telefone', value: '', type: 'InputText', label: 'Telefone', required: true, error: '' },
        { id: 'cpf_cnpj', value: '', type: 'InputText', label: 'CPF/CNPJ', required: true, error: '' },
        { id: 'password', value: '', type: 'Password', label: 'Senha', required: true, toggleMask: true, error: '' },
        { id: 'confirm-password', value: '', type: 'Password', label: 'Confirmar senha', required: true, toggleMask: true, error: '' }
      ]
    };
  },
  methods: {
    validatePassword(password) {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (password.length < minLength) {
        return "A senha deve ter pelo menos 8 caracteres.";
      }
      if (!hasUpperCase) {
        return "A senha deve conter pelo menos uma letra maiúscula.";
      }
      if (!hasSpecialChar) {
        return "A senha deve conter pelo menos um caractere especial.";
      }
      return null;
    },
    clearErrors() {
      this.fields.forEach(field => field.error = '');
    },
    clearError(fieldId) {
      const field = this.fields.find(f => f.id === fieldId);
      if (field) {
        field.error = '';
      }
    },
    register() {
      this.clearErrors();

      if (this.fields[5].value !== this.fields[4].value) {
        this.fields[5].error = "As senhas não coincidem.";
        return;
      }

      const passwordError = this.validatePassword(this.fields[4].value);
      if (passwordError) {
        this.fields[4].error = passwordError;
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
            this.$router.push("/login");
          })
          .catch(error => {
            console.error("Falha ao registrar:", error);
            if (error.response && error.response.data.errors) {
              const errors = error.response.data.errors;
              for (const key in errors) {
                const field = this.fields.find(f => f.id === key);
                if (field) {
                  field.error = errors[key];
                }
              }
            } else {
              alert("Erro ao registrar. Verifique os dados e tente novamente.");
            }
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

.is-invalid :deep(.p-inputtext),
.is-invalid :deep(.p-password) {
  border: 1.5px solid #FE3232 !important;
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
