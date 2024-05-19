<template>
  <div class="facilities">
    <h2>Facilities</h2>
    <div class="facility-list">
      <div v-for="(facility, index) in facilities" :key="index" class="facility-item">
        <span class="facility-icon">{{ facility.icon }}</span>
        <span>{{ facility.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoworkingFacilities',
  props: {
    facilities: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.facilities {
  margin-top: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.facility-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.facility-item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.facility-item:hover {
  background-color: #f8f9fa;
}

.facility-icon {
  font-size: 1.25rem;
}
</style>
