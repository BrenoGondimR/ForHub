<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-10">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="text-center">Reservas</h1>
          <div class="d-flex align-items-center">
            <div class="dropdown">
              <button @click="toggleFilter" class="btn btn-primary filter-button dropdown-toggle">
                <i class="bi bi-filter"></i>
              </button>
              <div v-if="showFilter" class="dropdown-menu show">
                <button class="dropdown-item" @click="setFilter('')">Todas</button>
                <button class="dropdown-item" @click="setFilter('Confirmada')">Confirmadas</button>
                <button class="dropdown-item" @click="setFilter('Pendente')">Pendentes</button>
                <button class="dropdown-item" @click="setFilter('Cancelada')">Canceladas</button>
              </div>
            </div>
            <button @click="openModal" class="btn btn-success ml-2">
              <i class="bi bi-calendar-plus"></i> Adicionar Reserva
            </button>
          </div>
        </div>
        <ReservationTable :reservations="filteredReservations" />
      </div>
    </div>
    <ReservationModal v-if="showModal" @close="closeModal" @add-reservation="addReservation" />
  </div>
</template>

<script>
import ReservationTable from '@/components/Common/ReservationTable.vue';
import ReservationModal from '@/components/Common/ReservationModal.vue';

export default {
  components: {
    ReservationTable,
    ReservationModal,
  },
  data() {
    return {
      showFilter: false,
      showModal: false,
      filter: '',
      reservations: [
        { clientName: 'Leonardo', initials: 'LE', space: 'Sala de Reunião A', status: 'Confirmada', startDate: '2024-05-01', endDate: '2024-05-10', startTime: '08:00', endTime: '12:00', totalAmount: 'R$ 560.00' },
        { clientName: 'Maria', initials: 'MA', space: 'Escritório B', status: 'Pendente', startDate: '2024-04-15', endDate: '2024-04-20', startTime: '09:00', endTime: '17:00', totalAmount: 'R$ 1120.00' },
        { clientName: 'João', initials: 'JO', space: 'Auditório C', status: 'Confirmada', startDate: '2024-03-01', endDate: '2024-03-05', startTime: '10:00', endTime: '14:00', totalAmount: 'R$ 280.00' },
        { clientName: 'Ana', initials: 'AN', space: 'Sala de Treinamento D', status: 'Confirmada', startDate: '2024-02-10', endDate: '2024-02-15', startTime: '11:00', endTime: '15:00', totalAmount: 'R$ 350.00' },
        { clientName: 'Carlos', initials: 'CA', space: 'Sala de Conferência E', status: 'Cancelada', startDate: '2024-05-20', endDate: '2024-05-25', startTime: '10:00', endTime: '16:00', totalAmount: 'R$ 800.00' }
      ]
    };
  },
  computed: {
    filteredReservations() {
      if (this.filter === '') {
        return this.reservations;
      }
      return this.reservations.filter(reservation => reservation.status === this.filter);
    }
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    setFilter(status) {
      this.filter = status;
      this.showFilter = false;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addReservation(newReservation) {
      newReservation.initials = this.getInitials(newReservation.clientName);
      this.reservations.push(newReservation);
      this.closeModal();
    },
    getInitials(name) {
      return name.split(' ').map(word => word[0]).join('').toUpperCase();
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css');

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.filter-container {
  position: relative;
}

.filter-button {
  background-color: #1aa3e4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background-color: #1480b9;
}

.dropdown-menu {
  display: none;
}

.dropdown-menu.show {
  display: block;
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
