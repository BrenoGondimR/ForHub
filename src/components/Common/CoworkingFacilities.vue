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
        >
        </Marker>
      </GoogleMap>
    </div>
  </div>
</template>

<script>

import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
import CoworkingMapCard from './CoworkingMapCard';
import escritorioMeirelesImg from "@/assets/img/escritorio1.jpg";
import escritorio2Img from "@/assets/img/escritorio2.jpg";

export default {
  name: 'CoworkingFacilities',
  components: {
    GoogleMap,
    Marker,
    InfoWindow,
    CoworkingMapCard
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
      center: { lat: -23.55052, lng: -46.633308 },
      markers: [
        { title: 'Escritório Meireles', position: { lat: -23.55052, lng: -46.633308 }, info: 'R$120/dia', rating: 4, showInfo: false, images: [{ itemImageSrc: escritorioMeirelesImg, alt: 'Escritório Meireles' }, { itemImageSrc: escritorio2Img, alt: 'Escritório Aldeota' }], description: 'Escritório em São Paulo' },
      ]
    }
  },
  methods: {

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
