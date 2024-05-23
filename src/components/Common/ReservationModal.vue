<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Adicionar Reserva</h5>
          <button type="button" class="close" @click="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submit">
            <div class="form-group">
              <label for="clientName">Nome do Cliente</label>
              <input type="text" class="form-control" id="clientName" v-model="newReservation.clientName" required>
            </div>
            <div class="form-group">
              <label for="space">Espaço</label>
              <select class="form-control" id="space" v-model="newReservation.space" required>
                <option value="Sala de Reunião A">Sala de Reunião A</option>
                <option value="Escritório B">Escritório B</option>
              </select>
            </div>
            <div class="form-group">
              <label for="status">Status</label>
              <select class="form-control" id="status" v-model="newReservation.status" required>
                <option value="Confirmada">Confirmada</option>
                <option value="Pendente">Pendente</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>
            <div class="form-group">
              <label for="startDate">Data de Início</label>
              <input type="date" class="form-control" id="startDate" v-model="newReservation.startDate" required>
            </div>
            <div class="form-group">
              <label for="endDate">Data de Término</label>
              <input type="date" class="form-control" id="endDate" v-model="newReservation.endDate" required>
            </div>
            <div class="form-group">
              <label for="startTime">Hora de Início</label>
              <input type="time" class="form-control" id="startTime" v-model="newReservation.startTime" required>
            </div>
            <div class="form-group">
              <label for="endTime">Hora de Término</label>
              <input type="time" class="form-control" id="endTime" v-model="newReservation.endTime" required>
            </div>
            <div class="form-group">
              <label for="totalAmount">Valor Total</label>
              <input type="text" class="form-control" id="totalAmount" v-model="newReservation.totalAmount" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="close">Cancelar</button>
              <button type="submit" class="btn btn-primary">Adicionar</button>
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
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        totalAmount: ''
      }
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
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        totalAmount: ''
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  transition: all 0.3s ease;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 10px;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #007bff;
}

.close {
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  padding-top: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e9ecef;
  padding-top: 10px;
  margin-top: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 600;
  color: #495057;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 8px 12px;
  width: 100%;
}

.btn {
  padding: 8px 20px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
