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

import escritorioMeirelesImg from '@/assets/img/escritorio1.jpg';
import escritorio2Img from '@/assets/img/escritorio2.jpg';
import escritorio3Img from '@/assets/img/escritorio3.jpg';
import escritorio4Img from '@/assets/img/escritorio4.jpg';
import {getAllCoworking} from "@/views/Coworkings/coworkings_service";


export default {
  name: 'CoworkingInfoPage',
  components: {
    CoworkingGallery,
    CoworkingDetails,
    CoworkingReviews
  },
  data() {
    return {
      images: [
        escritorioMeirelesImg,
        escritorio2Img,
        escritorio3Img,
        escritorio4Img
      ],
      details: {
        name: 'Sala de Reunião',
        provider: 'ForHub',
        price: 70,
        description: `A ForHub, uma provedora líder de espaços de coworking, oferece uma sala de reuniões meticulosamente projetada, adaptada para produtividade e conforto. Esta sala de reuniões conta com uma gama abrangente de comodidades, começando com WiFi de alta velocidade garantindo conectividade perfeita. Os convidados podem desfrutar de refrescos de cortesia enquanto estão sentados em cadeiras ergonômicas e confortáveis, envolvidas por uma atmosfera retrô convidativa.`,
        availability: {
          date: '23/04/2024',
          time: '08:00 AM'
        },
        local: { lat: -23.55052, lng: -46.633308 }
      },
      facilities: [
        { icon: '🪑', name: '18' },
        { icon: '📶', name: '400 Mbps' },
        { icon: '🖥️', name: 'Monitor LCD' },
        { icon: '☕', name: 'Estação de refrescos' },
        { icon: '🖊️', name: 'Quadro branco' }
      ],
      reviews: [
        {
          id: 1,
          idLocal: 1,
          user: {
            name: 'Dave Hudson',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          date: '1 semana atrás',
          rating: 5,
          text: 'Reserva fácil, ótimo valor! Salas aconchegantes a um preço razoável, ambiente super bom, altamente recomendado!'
        },
        {
          id: 2,
          idLocal: 2,
          user: {
            name: 'Jane Doe',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          date: '2 semanas atrás',
          rating: 4,
          text: 'Sala de reuniões muito confortável e bem equipada. O WiFi era rápido e confiável, e os refrescos de cortesia foram um toque agradável.'
        }
      ]
    };
  },
  methods: {
    fetchCoworkings() {
      getAllCoworking()
          .then(response => {
            const spaces = response.data.data;
            console.log(spaces);
          })
          .catch(error => {
            console.error("Error fetching coworking spaces:", error);
          });
    },
  },
  created() {
    this.fetchCoworkings()
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
