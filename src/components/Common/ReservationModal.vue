<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nova Reserva</h5>
          <button type="button" class="close" @click="close" aria-label="Fechar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submit">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="clientName">Nome do Cliente</label>
                <InputText id="clientName" v-model="newReservation.clientName" class="form-control" required />
              </div>
              <div class="form-group col-md-6">
                <label for="space">Espaço</label>
                <Dropdown id="space" v-model="newReservation.space" :options="spaces" optionLabel="name" optionValue="name" placeholder="Selecione um espaço" class="form-control" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="startDate">Data de Início</label>
                <Calendar id="startDate" v-model="newReservation.startDate" dateFormat="dd/mm/yy" class="form-control" required />
              </div>
              <div class="form-group col-md-6">
                <label for="endDate">Data de Término</label>
                <Calendar id="endDate" v-model="newReservation.endDate" dateFormat="dd/mm/yy" class="form-control" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="startTime">Hora de Início</label>
                <InputMask id="startTime" v-model="newReservation.startTime" mask="99:99" placeholder="HH:MM" class="form-control" required />
              </div>
              <div class="form-group col-md-6">
                <label for="endTime">Hora de Término</label>
                <InputMask id="endTime" v-model="newReservation.endTime" mask="99:99" placeholder="HH:MM" class="form-control" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="status">Status</label>
                <Dropdown id="status" v-model="newReservation.status" :options="statusOptions" optionLabel="name" optionValue="value" placeholder="Selecione um status" class="form-control" required />
              </div>
              <div class="form-group col-md-6">
                <label for="totalAmount">Valor Total</label>
                <InputNumber id="totalAmount" v-model="newReservation.totalAmount" mode="currency" currency="BRL" locale="pt-BR" class="form-control" required />
              </div>
            </div>
            <div class="modal-footer">
              <Button label="Cancelar" class="p-button-secondary" @click="close" />
              <Button label="Adicionar" class="p-button-primary" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newReservation: {
        clientName: '',
        space: '',
        status: '',
        startDate: null,
        endDate: null,
        startTime: '',
        endTime: '',
        totalAmount: null
      },
      spaces: [
        { name: 'Sala de Reunião A' },
        { name: 'Escritório B' },
        { name: 'Auditório C' },
        { name: 'Sala de Treinamento D' },
        { name: 'Sala de Conferência E' }
      ],
      statusOptions: [
        { name: 'Confirmada', value: 'Confirmada' },
        { name: 'Pendente', value: 'Pendente' },
        { name: 'Cancelada', value: 'Cancelada' }
      ]
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('add-reservation', this.newReservation);
      this.newReservation = {
        clientName: '',
        space: '',
        status: '',
        startDate: null,
        endDate: null,
        startTime: '',
        endTime: '',
        totalAmount: null
      };
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-dialog {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
}

.modal-content {
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
  margin: 0;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-control {
  width: 100%;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
  margin-top: 1rem;
}

.modal-footer .p-button {
  margin-left: 0.5rem;
}
</style>
