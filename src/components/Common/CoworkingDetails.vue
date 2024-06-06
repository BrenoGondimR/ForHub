<template>
  <div class="details-container">
    <div class="details-left">
      <h1>{{ details.name }}</h1>
      <h2>por {{ details.provider }}</h2>
      <p>{{ details.description }}</p>
      <CoworkingFacilities :facilities="facilities" />
    </div>
    <div class="details-right">
      <h4>Valores cadastrados</h4>
      <div v-for="(field, index) in fieldsValores" :key="index" class="value-row">
        <div class="value-label">{{ field.label }}:</div>
        <div class="value-content">
          <span>R$ {{ field.value }} {{ field.unit }}</span>
          <button class="rent-now" @click="rentNow(field)">Alugar</button>
        </div>
      </div>
    </div>

    <b-modal v-model="showModal" title="Detalhes da Reserva" hide-footer>
      <div class="modal-body">
        <div>
          <label>Nome</label>
          <input type="text" v-model="name" />
        </div>
        <div>
          <p><strong>Hora de Início:</strong> {{ startTime }}</p>
          <p><strong>Hora de Término:</strong> {{ endTime }}</p>
          <p><strong>Total:</strong> R$ {{ totalCost.toFixed(2) }}</p>
        </div>
      </div>
      <div class="modal-footer">
        <b-button variant="primary" @click="confirmReservation" class="confirm-button">Confirmar Reserva</b-button>
        <b-button variant="secondary" @click="closeModal" class="close-button">Fechar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CoworkingFacilities from '@/components/Common/CoworkingFacilities.vue';

export default {
  name: 'CoworkingDetails',
  components: {
    CoworkingFacilities
  },
  props: {
    details: {
      type: Object,
      required: true
    },
    facilities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      startTime: '',
      endTime: '',
      name: '',
      showModal: false,
      totalCost: 0,
      fieldsValores: [
        {
          key: 'domicilio_fiscal',
          label: 'Domicílio Fiscal',
          type: 'InputNumber',
          value: 150.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: 'hora'
        },
        {
          key: 'secretariado',
          label: 'Secretariado',
          type: 'InputNumber',
          value: 200.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: 'hora'
        },
        {
          key: 'coworking',
          label: 'Estações de Trabalho - Coworking',
          type: 'InputNumber',
          value: 600.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: 'hora'
        },
        {
          key: 'sala_exclusiva',
          label: 'Sala Exclusiva',
          type: 'InputNumber',
          value: 4000.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: 'hora'
        },
        {
          key: 'sala_reuniao',
          label: 'Sala de Reunião',
          type: 'InputNumber',
          value: 100.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: 'hora'
        },
        {
          key: 'sala_treinamento',
          label: 'Sala de Treinamento',
          type: 'InputNumber',
          value: 750.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: 'hora'
        },
        {
          key: 'auditorio',
          label: 'Auditório',
          type: 'InputNumber',
          value: 950.00,
          col: '12',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: 'hora'
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    confirmReservation() {
      // Implementar a lógica de confirmação da reserva
      alert('Reserva confirmada!');
      this.closeModal();
    },
    rentNow(field) {
      // Implementar a lógica para alugar o item específico
      alert(`Alugando ${field.label} por R$${field.value} ${field.unit}`);
    }
  }
};
</script>

<style scoped>
.details-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.details-left {
  flex: 1 1 60%;
}

.details-right {
  flex: 1 1 35%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

h2 {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
}

.value-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.value-row:last-child {
  border-bottom: none;
}

.value-label {
  flex: 1;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.value-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
}

.value-content span {
  font-size: 1rem;
  color: #333;
}

.value-row button {
  background-color: #1aa3e4;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.value-row button:hover {
  background-color: #007bff;
}

.modal-body p {
  margin: 5px 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

.confirm-button {
  background-color: #1aa3e4;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #007bff;
}

.close-button {
  background-color: #ddd;
  border: none;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #ccc;
}

@media (max-width: 768px) {
  .details-container {
    flex-direction: column;
  }

  .details-right {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .details-container {
    gap: 10px;
  }

  .details-left,
  .details-right {
    padding: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.875rem;
  }

  .value-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .value-label,
  .value-content span {
    font-size: 0.875rem;
  }

  .value-row button {
    width: 100%;
    text-align: center;
  }
}
</style>
