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

export default {
  name: "cadastro",
  components: {
    BColxx,
  },
  data() {
    return {
      fields: [
        { key: 'name', label: 'Nome de Cliente', type: 'InputText', value: '', error: false, errorMessage: '', col: '6' },
        { key: 'email', label: 'Email', type: 'InputText', value: '', error: false, errorMessage: '', col: '6' },
        { key: 'phone', label: 'Telefone', type: 'InputMask', value: '', error: false, errorMessage: '', mask: '(99) 99999-9999', col: '6' },
        { key: 'address', label: 'CPF/CNPJ', type: 'InputText', value: '', error: false, errorMessage: '', col: '6' },
        { key: 'status', label: 'Status', type: 'Dropdown', value: '', error: false, errorMessage: '', options: [{ label: 'Ativo', value: 'ativo' }, { label: 'Inativo', value: 'inativo' }], col: '12' }
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
        return { options: field.options, optionLabel: 'label', optionValue: 'value' };
      } else if (field.type === 'InputMask') {
        return { mask: field.mask };
      } else {
        return {};
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    validatePhone(phone) {
      const re = /^\(\d{2}\) \d{5}-\d{4}$/;
      return re.test(String(phone));
    },
    validateCPF(value) {
      value = value.replace(/\D/g, '');
      if (value.length !== 11) return false;

      let sum = 0;
      let remainder;

      if (value === "00000000000") return false;

      for (let i = 1; i <= 9; i++) sum += parseInt(value.substring(i - 1, i)) * (11 - i);
      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) remainder = 0;
      if (remainder !== parseInt(value.substring(9, 10))) return false;

      sum = 0;
      for (let i = 1; i <= 10; i++) sum += parseInt(value.substring(i - 1, i)) * (12 - i);
      remainder = (sum * 10) % 11;

      if ((remainder === 10) || (remainder === 11)) remainder = 0;
      if (remainder !== parseInt(value.substring(10, 11))) return false;

      return true;
    },
    validateCNPJ(value) {
      value = value.replace(/\D/g, '');
      if (value.length !== 14) return false;

      let length = value.length - 2;
      let numbers = value.substring(0, length);
      let digits = value.substring(length);
      let sum = 0;
      let pos = length - 7;

      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result !== parseInt(digits.charAt(0))) return false;

      length++;
      numbers = value.substring(0, length);
      sum = 0;
      pos = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) pos = 9;
      }
      result = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (result !== parseInt(digits.charAt(1))) return false;

      return true;
    },
    validateCPF_CNPJ(value) {
      return this.validateCPF(value) || this.validateCNPJ(value);
    },
    validateField(field) {
      if (!field.value) {
        field.error = true;
        field.errorMessage = 'Campo obrigatório';
        return false;
      }
      if (field.key === 'email' && !this.validateEmail(field.value)) {
        field.error = true;
        field.errorMessage = 'Email inválido';
        return false;
      }
      if (field.key === 'phone' && !this.validatePhone(field.value)) {
        field.error = true;
        field.errorMessage = 'Telefone inválido';
        return false;
      }
      if (field.key === 'address' && !this.validateCPF_CNPJ(field.value)) {
        field.error = true;
        field.errorMessage = 'CPF/CNPJ inválido';
        return false;
      }
      field.error = false;
      field.errorMessage = '';
      return true;
    },
    submitForm() {
      let isValid = true;
      this.fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false; 
        }
      });
      if (isValid) {
        console.log('Form data:', this.fields);
      } else {
        console.log('Formulário inválido');
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
