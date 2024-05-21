<template>
  <div class="coworking-info">
    <CoworkingGallery :images="images" />
    <CoworkingDetails :details="details" />
    <CoworkingReviews :reviews="reviews" />
  </div>
</template>

<script>
import CoworkingGallery from '@/components/Common/CoworkingGallery.vue';
import CoworkingDetails from '@/components/Common/CoworkingDetails.vue';
import CoworkingReviews from '@/components/Common/CoworkingReviews.vue';

export default {
  name: 'CoworkingInfo',
  components: {
    CoworkingGallery,
    CoworkingDetails,
    CoworkingReviews
  },
  data() {
    return {
      images: [
        // URLs das imagens
      ],
      details: {
        name: 'Meeting Room',
        provider: 'Workzone',
        price: 70,
        description: `Workzone, a leading coworking space provider, offers a meticulously designed meeting room tailored for productivity and comfort. This meeting room boasts a comprehensive array of amenities, starting with high-speed WiFi ensuring seamless connectivity. Guests can indulge in complimentary refreshments while seated in ergonomic, plush chairs, enveloped by an inviting ambient retro atmosphere.`,
        availability: {
          date: '23/04/2024',
          time: '08:00 AM'
        }
      },
      reviews: [
        // Detalhes das avaliações
      ]
    };
  }
};
</script>

<style scoped>
.coworking-info {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
