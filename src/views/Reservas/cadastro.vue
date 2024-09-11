<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12">
      <h4 class="title-dash mb-4">Cadastro de Reserva</h4>
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
          <Button style="width: 100%; border-radius: 7px;" label="Cadastrar Reserva" icon="pi pi-check" @click="submitForm" />
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";

export default {
  name: "cadastroReserva",
  components: {
    BColxx,
  },
  data() {
    return {
      fields: [
        { key: 'clientName', label: 'Nome do Cliente', type: 'InputText', value: '', error: false, errorMessage: '', col: '6' },
        { key: 'space', label: 'Espaço', type: 'Dropdown', value: '', error: false, errorMessage: '', options: [
          { label: 'Sala de Reunião A', value: 'Sala de Reunião A' },
          { label: 'Escritório B', value: 'Escritório B' },
          { label: 'Auditório C', value: 'Auditório C' },
          { label: 'Sala de Treinamento D', value: 'Sala de Treinamento D' },
          { label: 'Sala de Conferência E', value: 'Sala de Conferência E' }
        ], col: '6' },
        { key: 'startDate', label: 'Data de Início', type: 'Calendar', value: null, error: false, errorMessage: '', col: '6' },
        { key: 'endDate', label: 'Data de Término', type: 'Calendar', value: null, error: false, errorMessage: '', col: '6' },
        { key: 'startTime', label: 'Hora de Início', type: 'InputMask', value: '', error: false, errorMessage: '', mask: '99:99', col: '6' },
        { key: 'endTime', label: 'Hora de Término', type: 'InputMask', value: '', error: false, errorMessage: '', mask: '99:99', col: '6' },
        { key: 'status', label: 'Status', type: 'Dropdown', value: '', error: false, errorMessage: '', options: [
          { label: 'Confirmada', value: 'Confirmada' },
          { label: 'Pendente', value: 'Pendente' },
          { label: 'Cancelada', value: 'Cancelada' }
        ], col: '6' },
        { key: 'totalAmount', label: 'Valor Total', type: 'InputNumber', value: null, error: false, errorMessage: '', col: '6' }
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
        case 'Calendar':
          return 'Calendar';
        case 'InputNumber':
          return 'InputNumber';
        default:
          return 'InputText';
      }
    },
    getComponentProps(field) {
      switch (field.type) {
        case 'Dropdown':
          return { options: field.options, optionLabel: 'label', optionValue: 'value' };
        case 'InputMask':
          return { mask: field.mask };
        case 'Calendar':
          return { dateFormat: 'dd/mm/yy' };
        case 'InputNumber':
          return { mode: 'currency', currency: 'BRL', locale: 'pt-BR' };
        default:
          return {};
      }
    },
    validateField(field) {
      if (!field.value && field.type !== 'InputNumber') {
        field.error = true;
        field.errorMessage = 'Campo obrigatório';
        return false;
      }
      if (field.type === 'InputNumber' && (field.value === null || field.value <= 0)) {
        field.error = true;
        field.errorMessage = 'Valor inválido';
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
        console.log('Dados da reserva:', this.fields.reduce((acc, field) => {
          acc[field.key] = field.value;
          return acc;
        }, {}));
        // Aqui você pode adicionar a lógica para enviar os dados para o backend
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
.p-fluid .p-field .p-dropdown,
.p-fluid .p-field .p-calendar,
.p-fluid .p-field .p-inputnumber {
  width: 100%;
}

.text-danger {
  color: #ff0000;
}
</style>
