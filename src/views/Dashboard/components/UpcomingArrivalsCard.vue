<template>
  <div class="upcoming-arrivals-card">
    <ul>
      <li
          v-for="reservation in reservations"
          :key="reservation.name"
          class="reservation-item"
      >
        <div class="reservation-info">
          <div class="avatar">
            {{ reservation.name
              .split(' ')
              .map((n) => n[0])
              .join('') }}
          </div>
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
        <div class="total-value">
          <i class="pi pi-dollar"></i> {{ reservation.totalValue }}
        </div>
        <div v-if="reservation.observations" class="observations">
          <i class="pi pi-info-circle"></i> {{ reservation.observations }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UpcomingArrivalsCard",
  props: {
    reservations: Array,
  },
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
  padding: 15px 0;
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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid black;
  background-color: #1AA3E9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #fff;
  margin-right: 15px;
  font-size: 18px;
}

.details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.details p {
  margin: 0 10px 5px 0;
  color: #555;
  font-size: 20px;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.room {
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
}

.dates,
.time {
  display: flex;
  align-items: center;
}

.dates i,
.time i {
  margin-right: 5px;
  color: #1AA3E9;
}

.total-value {
  color: #555;
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;
}

.total-value i {
  margin-right: 5px;
  color: #1AA3E9;
}

.observations {
  margin-top: 10px;
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
}

.observations i {
  margin-right: 5px;
  color: #1AA3E9;
}

@media (max-width: 768px) {
  .reservation-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .total-value {
    margin-top: 10px;
  }
}
</style>
