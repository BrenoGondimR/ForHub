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
import { createReserva } from '@/views/Reservas/reservas_service';
import { getAllCoworking } from '@/views/Coworkings/coworkings_service';
import {getAllClients} from "@/views/Clientes/clientes_service"; // Certifique-se de ajustar o caminho de importação

export default {
  name: "cadastroReserva",
  components: {
    BColxx,
  },
  data() {
    return {
      fields: [
        { key: 'client', label: 'Cliente', type: 'Dropdown', value: '', error: false, errorMessage: '', options: [], col: '6' },
        { key: 'space', label: 'Espaço', type: 'Dropdown', value: '', error: false, errorMessage: '', options: [], col: '6' },
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
  created() {
    this.loadCoworkings();
    this.loadClients();
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
    async loadClients() {
      try {
        const userID = this.getUserId();
        const response = await getAllClients(userID);
        const clients = response.data.data; // Ajuste conforme a estrutura de dados retornada pela API
        const options = clients.map(client => ({
          label: client.Nome, // Supondo que o cliente tenha uma propriedade 'Nome'
          value: client.ID,   // Supondo que o cliente tenha uma propriedade 'ID'
        }));
        // Atualiza as opções do campo "Cliente"
        const clientField = this.fields.find(field => field.key === 'client');
        if (clientField) {
          clientField.options = options;
        }
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
        // Lógica para lidar com o erro
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
    async loadCoworkings() {
      try {
        const response = await getAllCoworking();
        const coworkings = response.data.data; // Supondo que a resposta é um array de coworkings
        const options = coworkings.map(coworking => ({
          label: coworking.Nome,
          value: coworking.ID,
        }));
        debugger;
        // Atualiza as opções do campo "Espaço"
        const spaceField = this.fields.find(field => field.key === 'space');
        if (spaceField) {
          spaceField.options = options;
        }
      } catch (error) {
        console.error('Erro ao carregar coworkings:', error);
        // Adicione aqui a lógica para lidar com o erro
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
    async submitForm() {
      let isValid = true;
      this.fields.forEach(field => {
        if (!this.validateField(field)) {
          isValid = false;
        }
      });
      if (isValid) {
        try {
          const reservaData = this.fields.reduce((acc, field) => {
            acc[field.key] = field.value;
            return acc;
          }, {});

          // Converter IDs para números inteiros
          reservaData.UserID = this.getUserId();
          reservaData.CoworkingSpaceID = parseInt(reservaData.space, 10);
          reservaData.ClienteID = parseInt(reservaData.client, 10);

          // Converter valores numéricos
          reservaData.ValorTotal = parseFloat(reservaData.totalAmount);

          // Converter datas e horas
          reservaData.DataInicio = this.parseDate(reservaData.startDate);
          reservaData.DataFim = this.parseDate(reservaData.endDate);
          reservaData.HoraInicio = this.parseTime(reservaData.startTime);
          reservaData.HoraFim = this.parseTime(reservaData.endTime);

          // Mapear o status
          reservaData.Status = reservaData.status;

          // Remover campos não necessários
          delete reservaData.space;
          delete reservaData.client;
          delete reservaData.startDate;
          delete reservaData.endDate;
          delete reservaData.startTime;
          delete reservaData.endTime;
          delete reservaData.status;
          delete reservaData.totalAmount;

          const response = await createReserva(reservaData);
          console.log('Reserva criada com sucesso:', response.data);
          // Lógica de sucesso (ex: redirecionar ou mostrar mensagem)
        } catch (error) {
          console.error('Erro ao criar reserva:', error);
          // Lógica para lidar com o erro (ex: mostrar mensagem de erro)
        }
      } else {
        console.log('Formulário inválido');
      }
    },
    parseDate(date) {
      if (!date) return null;
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    },
    parseTime(time) {
      if (!time) return null;
      const [hours, minutes] = time.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      date.setSeconds(0);
      date.setMilliseconds(0);
      // Zerar a data para 1970-01-01
      date.setFullYear(1970, 0, 1);
      return date;
    },
    getUserId() {
      return parseInt(localStorage.getItem('userId'), 10);
    },

    combineDateTime(date, time) {
      if (!date || !time) return null;
      const [hours, minutes] = time.split(':');
      const combinedDate = new Date(date);
      combinedDate.setHours(parseInt(hours), parseInt(minutes));
      return combinedDate;
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
