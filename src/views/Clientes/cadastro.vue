<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12">
      <h4 class="title-dash mb-4">Cadastro Cliente</h4>
    </b-colxx>
    <b-colxx lg="12" class="card">
      <b-row>
        <b-colxx v-for="(field, index) in fields" :key="index" :lg="field.col" class="p-field" style="display: grid;">
          <label :for="field.key">{{ field.label }}</label>
          <component
              :is="getComponentType(field.type)"
              v-model="field.value"
              :id="field.key"
              v-bind="getComponentProps(field)"
              @keydown="field.error = false"
              style="max-height: 44px !important;"
          />
          <small v-if="field.error" class="text-danger">{{ field.errorMessage }}</small>
        </b-colxx>
        <b-colxx lg="12">
          <Button style="width: 100%; border-radius: 7px;" label="Submit" icon="pi pi-check" @click="submitForm" />
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import { createClient } from "@/views/Clientes/clientes_service";

export default {
  name: "cadastro",
  components: {
    BColxx,
  },
  data() {
    return {
      fields: [
        {key: 'nome', label: 'Nome de Cliente', type: 'InputText', value: '', error: false, errorMessage: '', col: '6'},
        {key: 'email', label: 'Email', type: 'InputText', value: '', error: false, errorMessage: '', col: '6'},
        {
          key: 'telefonewpp',
          label: 'Telefone',
          type: 'InputMask',
          value: '',
          error: false,
          errorMessage: '',
          mask: '(99) 99999-9999',
          col: '6'
        },
        {key: 'cpfcnpj', label: 'CPF/CNPJ', type: 'InputText', value: '', error: false, errorMessage: '', col: '6'},
        {
          key: 'statusconta',
          label: 'Status',
          type: 'Dropdown',
          value: '',
          error: false,
          errorMessage: '',
          options: [{label: 'Ativo', value: 'ativo'}, {label: 'Inativo', value: 'inativo'}],
          col: '12'
        }
      ]
    };
  },
  methods: {
    getComponentType(type) {
      switch (type) {
        case 'InputText':
          return 'InputText';
        case 'InputMask':
          return 'InputMask';
        case 'Dropdown':
          return 'Dropdown';
        default:
          return 'InputText';
      }
    },
    getComponentProps(field) {
      if (field.type === 'Dropdown') {
        return {options: field.options, optionLabel: 'label', optionValue: 'value'};
      } else if (field.type === 'InputMask') {
        return {mask: field.mask};
      } else {
        return {};
      }
    },
    validateField(field) {
      if (!field.value) {
        field.error = true;
        field.errorMessage = 'Campo obrigatório';
        return false;
      }
      switch (field.key) {
        case 'email':
          if (!this.validateEmail(field.value)) {
            field.error = true;
            field.errorMessage = 'Email inválido';
            return false;
          }
          break;
        case 'phone':
          if (!this.validatePhone(field.value)) {
            field.error = true;
            field.errorMessage = 'Telefone inválido';
            return false;
          }
          break;
        case 'cpfcnpj':
          if (!this.validateCPF_CNPJ(field.value)) {
            field.error = true;
            field.errorMessage = 'CPF/CNPJ inválido';
            return false;
          }
          break;
      }
      field.error = false;
      field.errorMessage = '';
      return true;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    },
    validatePhone(phone) {
      const re = /^\(\d{2}\) \d{5}-\d{4}$/;
      return re.test(phone);
    },
    validateCPF_CNPJ(value) {
      return value.length === 11 || value.length === 14;
    },
    submitForm() {
      let isValid = true;
      let formData = {};

      // Pega o ID do usuário do localStorage e converte para número
      const userId = parseInt(localStorage.getItem('userId'), 10);
      if (!userId) {
        alert('Usuário não autenticado. Faça login novamente.');
        return;
      }

      this.fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        } else {
          formData[field.key] = field.value;
        }
      });

      if (isValid) {
        // Adiciona o IDUsuario ao formData (convertido para número)
        formData.IDUsuario = userId;

        createClient(formData) // Chama o serviço para criar o cliente
            .then(response => {
              alert('Cliente criado com sucesso!');
              this.$router.push("/dashboard/clientes")
            })
            .catch(error => {
              alert('Erro ao criar o cliente');
              console.error('Erro:', error.response.data);
            });
      } else {
        alert('Por favor, corrija os erros antes de enviar.');
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.p-field {
  margin-bottom: 1rem;
}

.p-fluid .p-field label {
  margin-bottom: 0.5rem;
}

.p-fluid .p-field input,
.p-fluid .p-field .p-dropdown {
  width: 100%;
}

.text-danger {
  color: #ff0000;
}
</style>
