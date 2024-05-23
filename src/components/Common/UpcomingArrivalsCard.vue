<template>
  <div class="upcoming-arrivals-card">
    <div class="card-header">
      <h5 style="font-weight: 600;">Ultimas Reservas</h5>
      <i class="fa fa-ellipsis-h"></i>
    </div>
    <div class="card-body">
      <div v-for="reservation in reservations" :key="reservation.name" class="reservation-item">
        <span class="pi pi-user avatar"></span>
        <div class="reservation-info">
          <div class="name">{{ reservation.name }}</div>
          <div class="details">
            <span>{{ reservation.room }}</span>
            <span class="dot">•</span>
            <span style="font-weight: 600;">{{ reservation.dates }}</span>
          </div>
        </div>
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingArrivalsCard",
  props: {
    reservations: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style scoped>
.upcoming-arrivals-card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: "Poppins", sans-serif;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border: none !important;
}

.card-header h6 {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reservation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.reservation-item:last-child {
  border-bottom: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  text-align: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.reservation-info {
  flex-grow: 1;
}

.name {
  font-weight: bold;
  color: #333;
}

.details {
  font-size: 0.875rem;
  color: #666;
  display: flex;
  align-items: center;
}

.dot {
  margin: 0 5px;
}
</style>
