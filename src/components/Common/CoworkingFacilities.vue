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
            v-if="center.lat && center.lng"
            :options="{ position: center }"
        />
      </GoogleMap>
    </div>
  </div>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map';
import { getCoworking } from "@/views/Coworkings/coworkings_service";
import axios from "axios";

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
      center: { lat: 0, lng: 0 },
      markers: [],
      coworkingId: null
    };
  },
  methods: {
    async getCoordinates(address) {
      try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=cb6cbafdb0c4448a893609c6d4695522`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          return {
            lat: data.results[0].geometry.lat,
            lng: data.results[0].geometry.lng
          };
        } else {
          console.error('Geocoding error: No results found');
          return null;
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return null;
      }
    },
    async fetchCoworking() {
      debugger
      // Obtendo o ID do coworking pela rota ou propriedade
      const coworkingId = this.$route.params.id || this.coworkingId;
      if (!coworkingId) {
        console.error("Coworking ID is required.");
        return;
      }

      try {
        const response = await getCoworking(coworkingId);
        const coworking = response.data.data;

        // Construir endereço com base no logradouro e cep
        const address = `${coworking.Logradouro}, ${coworking.Cep}`;
        const coordinates = await this.getCoordinates(address);

        if (coordinates) {
          this.center = coordinates; // Atualizando o centro do mapa
        }
      } catch (error) {
        console.error("Failed to fetch coworking details:", error);
      }
    }
  },
  created() {
    this.fetchCoworking();
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
