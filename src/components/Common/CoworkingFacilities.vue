<template>
  <div class="facilities">
    <h2>Facilities</h2>
    <div class="facility-list">
      <div v-for="(facility, index) in facilities" :key="index" class="facility-item">
        <span class="facility-icon">{{ facility.icon }}</span>
        <span>{{ facility.name }}</span>
      </div>
    </div>
    <div class="map-container">
      <GoogleMap
          :api-key="apiKeyGoogle"
          style="width: 100%; height: 400px;"
          :center="center"
          :zoom="15"
      >
        <Marker
            v-for="(marker, index) in markers"
            :key="index"
            :options="{ position: marker.position }"
        />
      </GoogleMap>
    </div>
  </div>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map';
import { getAllCoworking } from "@/views/Coworkings/coworkings_service";

export default {
  name: 'CoworkingFacilities',
  components: {
    GoogleMap,
    Marker
  },
  props: {
    facilities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      apiKeyGoogle: 'AIzaSyCff758FRfR8mAYrc2p6xQq_fEWO1GpKEs',
      center: {},
      markers: []
    };
  },
  methods: {
    async getCoordinates(address) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCm3EdFXiZTzPHS1rulG5LKo8WYHWICACM`);
        const data = await response.json();
        if (data.status === 'OK') {
          return data.results[0].geometry.location;
        } else {
          console.error('Geocoding error:', data.status);
          return null;
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return null;
      }
    },

    async fetchCoworkings() {
      try {
        const response = await getAllCoworking();
        const coworkings = response.data.data; // Ajuste conforme a estrutura real da resposta da sua API
        for (const coworking of coworkings) {
          const coordinates = await this.getCoordinates(coworking.Logradouro + ', ' + coworking.Numero + ', ' + coworking.Cep);
          if (coordinates) {
            this.markers.push({
              title: coworking.Nome,
              position: coordinates,
              info: `R$${coworking.Valores[0].preco}/${coworking.Valores[0].unidade}`,
              description: coworking.Descricao
            });

            if (!this.center.lat && !this.center.lng) { // Se o centro ainda não foi definido, defina-o aqui
              this.center = coordinates;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching coworking spaces:", error);
      }
    }
  },
  created() {
    this.fetchCoworkings();
  }
};
</script>

<style scoped>
.facilities {
  margin-top: 20px;
}

.map-container {
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  margin-top: 20px;

}

:deep(.mapdiv) {
  border-radius: 12px;
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
