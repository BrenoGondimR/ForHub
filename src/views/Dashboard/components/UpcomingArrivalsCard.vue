<template>
  <div class="upcoming-arrivals-card">
    <h3>Próximas Chegadas</h3>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.name" class="reservation-item">
        <div class="reservation-info">
          <div class="avatar">{{ reservation.name.split(' ').map(n => n[0]).join('') }}</div>
          <div class="details">
            <p class="name">{{ reservation.name }}</p>
            <p class="room">{{ reservation.room }}</p>
            <p class="dates">
              <i class="pi pi-calendar"></i> {{ reservation.date }}
            </p>
            <p class="time">
              <i class="pi pi-clock"></i> {{ reservation.time }}
            </p>
          </div>
        </div>
        <div class="icon">
          <i class="pi pi-users"></i> {{ reservation.people }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UpcomingArrivalsCard",
  props: {
    reservations: Array
  }
};
</script>

<style scoped>
.upcoming-arrivals-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.upcoming-arrivals-card h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.upcoming-arrivals-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reservation-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
}

.reservation-item:last-child {
  border-bottom: none;
}

.reservation-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #333;
  margin-right: 10px;
}

.details {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.room, .dates, .time {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.dates, .time {
  display: flex;
  align-items: center;
}

.dates i, .time i {
  margin-right: 5px;
}

.icon {
  font-size: 18px;
  color: #888;
  display: flex;
  align-items: center;
}

.icon i {
  margin-right: 5px;
}
</style>