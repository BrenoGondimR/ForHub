<template>
  <div class="details-container">
    <div class="details-left">
      <h1>{{ details.name }}</h1>
      <h2>por {{ details.provider }}</h2>
      <p>{{ details.description }}</p>
      <CoworkingFacilities :facilities="facilities" />
    </div>
    <div class="details-right">
      <div class="price">
        <span>A partir de</span>
        <strong>R$ {{ details.price }} /hora</strong>
      </div>
      <div class="availability">
        <div class="date-time-picker">
          <label>Data de Início</label>
          <input type="date" v-model="startDate" />
        </div>
        <div class="date-time-picker">
          <label>Hora de Início</label>
          <input type="time" v-model="startTime" />
        </div>
        <div class="date-time-picker">
          <label>Hora de Término</label>
          <input type="time" v-model="endTime" />
        </div>
        <div v-if="addMoreDays" class="date-time-picker">
          <label>Data de Término</label>
          <input type="date" v-model="endDate" />
        </div>
        <div class="add-day">
          <label>
            <input type="checkbox" v-model="addMoreDays" />
            Ficar mais um dia
          </label>
        </div>
      </div>
      <div class="guests">
        <label>Convidados</label>
        <div class="guest-control">
          <button @click="decreaseGuests">-</button>
          <span>{{ guests }}</span>
          <button @click="increaseGuests">+</button>
        </div>
      </div>
      <button class="book-now" @click="openModal">Reserve agora</button>
    </div>

    <b-modal v-model="showModal" title="Detalhes da Reserva" hide-footer>
      <div class="modal-body">
        <div>
          <label>Nome</label>
          <input type="text" v-model="name" />
        </div>
        <div>
          <p><strong>Data de Início:</strong> {{ startDate }}</p>
          <p><strong>Hora de Início:</strong> {{ startTime }}</p>
          <p v-if="addMoreDays"><strong>Data de Término:</strong> {{ endDate }}</p>
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
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      guests: 1,
      name: '',
      showModal: false,
      addMoreDays: false,
      totalCost: 0
    };
  },
  methods: {
    openModal() {
      this.calculateCost();
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    increaseGuests() {
      this.guests++;
    },
    decreaseGuests() {
      if (this.guests > 1) {
        this.guests--;
      }
    },
    confirmReservation() {
      // Implementar a lógica de confirmação da reserva
      alert('Reserva confirmada!');
      this.closeModal();
    },
    calculateCost() {
      const start = new Date(`${this.startDate}T${this.startTime}`);
      const end = new Date(`${this.endDate ? this.endDate : this.startDate}T${this.endTime}`);

      // Calcular o total de horas
      const diffTime = Math.abs(end - start);
      const diffDays = this.addMoreDays ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 1;
      const hoursPerDay = Math.abs(new Date(`1970-01-01T${this.endTime}`) - new Date(`1970-01-01T${this.startTime}`)) / (1000 * 60 * 60);

      this.totalCost = diffDays * hoursPerDay * this.details.price;
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

.price {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.availability {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.date-time-picker {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 0.875rem;
  color: #666;
}

input[type="date"],
input[type="time"],
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
}

.add-day {
  margin-bottom: 20px;
}

.guests,
.type {
  margin-bottom: 20px;
}

.guest-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.guest-control button {
  padding: 5px 10px;
  border: none;
  background-color: #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.guest-control button:hover {
  background-color: #ccc;
}

.book-now {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #1aa3e4;
  color: white;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.book-now:hover {
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
}
</style>
