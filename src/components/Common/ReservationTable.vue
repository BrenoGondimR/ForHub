<template>
  <table class="table table-striped table-hover">
    <thead>
    <tr>
      <th>Nome do Cliente</th>
      <th>Espaço</th>
      <th>Data de Início</th>
      <th>Hora de Início</th>
      <th>Data de Término</th>
      <th>Hora de Término</th>
      <th>Valor</th>
      <th>Status</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="reservation in reservations" :key="reservation.clientName">
      <td>
        <div class="d-flex align-items-center">
          <div class="avatar mr-2">{{ reservation.initials }}</div>
          {{ reservation.clientName }}
        </div>
      </td>
      <td>
        <span class="badge bg-info text-dark">{{ reservation.space }}</span>
      </td>
      <td>{{ reservation.startDate }}</td>
      <td>{{ reservation.startTime }}</td>
      <td>{{ reservation.endDate }}</td>
      <td>{{ reservation.endTime }}</td>
      <td>{{ reservation.totalAmount }}</td>
      <td>
        <span :class="['badge', getStatusClass(reservation.status)]">
          {{ reservation.status }}
        </span>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ReservationTable',
  props: {
    reservations: {
      type: Array,
      required: true
    }
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case 'Confirmada':
          return 'bg-success';
        case 'Pendente':
          return 'bg-warning text-dark';
        case 'Cancelada':
          return 'bg-danger';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.table thead th {
  vertical-align: middle;
}

.table tbody td {
  vertical-align: middle;
}

.badge {
  padding: 0.5em;
}

.bg-warning {
  background-color: #ffc107 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}
</style>
