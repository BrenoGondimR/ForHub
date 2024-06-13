<template>
  <div class="coworking-info-page">
    <CoworkingGallery :images="images" />
    <CoworkingDetails :details="details" :facilities="facilities" />
    <CoworkingReviews :reviews="reviews" />
  </div>
</template>

<script>
import CoworkingGallery from '@/components/Common/CoworkingGallery.vue';
import CoworkingDetails from '@/components/Common/CoworkingDetails.vue';
import CoworkingReviews from '@/components/Common/CoworkingReviews.vue';

import {getCoworking} from "@/views/Coworkings/coworkings_service";

export default {
  name: 'CoworkingInfoPage',
  components: {
    CoworkingGallery,
    CoworkingDetails,
    CoworkingReviews
  },
  data() {
    return {
      images: [],
      details: {
        name: '',
        provider: '',
        phone: '',
        price: 0,
        description: '',
        availability: {
          date: '',
          time: ''
        },
        local: { lat: 0, lng: 0 }
      },
      facilities: [],
      reviews: []
    };
  },
  created() {
    this.fetchCoworkings();
  },
  methods: {
    async fetchCoworkings() {
      try {
        // Uso do Vue Router para obter o ID
        const coworkingId = this.$route.params.id || this.coworkingId; // Usando Vue Router ou prop
        const response = await getCoworking(coworkingId);
        const space = response.data.data;

        this.images = space.Imagens.map(img => img.url);
        this.details = {
          name: space.Nome,
          provider: space.Descricao,
          phone: space.Telefone,
          price: space.Valores[0].preco,
          description: space.Descricao,
          availability: {
            date: new Date(space.CreatedAt).toLocaleDateString(),
            time: new Date(space.CreatedAt).toLocaleTimeString()
          },
          local: await this.getCoordinates(space.Logradouro + ' ' + space.Numero)
        };
        this.facilities = [
          { icon: '📶', name: space.Wifi ? 'WiFi disponível' : 'WiFi não disponível' },
          { icon: '🖊️', name: space.QuadroBranco ? 'Quadro Branco disponível' : 'Quadro Branco não disponível' },
          { icon: '🪑', name: space.SalaReuniao ? 'Sala de Reunião disponível' : 'Sala de Reunião não disponível' },
          { icon: '☕', name: space.Cafe ? 'Café disponível' : 'Café não disponível' },
          { icon: '🅿️', name: space.Estacionamento ? 'Estacionamento disponível' : 'Estacionamento não disponível' },
          { icon: '🛋️', name: space.AreaRelaxamento ? 'Área de Relaxamento disponível' : 'Área de Relaxamento não disponível' }
        ];
        this.reviews = space.reviews || [];
      } catch (error) {
        console.error("Error fetching coworking spaces:", error);
      }
    },
    async getCoordinates(address) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCm3EdFXiZTzPHS1rulG5LKo8WYHWICACM`);
        const data = await response.json();
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          return { lat: location.lat, lng: location.lng };
        } else {
          console.error('Geocoding error:', data.status);
          return { lat: 0, lng: 0 };
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return { lat: 0, lng: 0 };
      }
    }
  }
};
</script>

<style scoped>
.coworking-info-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
