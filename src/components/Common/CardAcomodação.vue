<template>
  <div class="custom-card">
    <img :src="image" class="card-img-top" alt="Imagem do Espaço">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ price }}</p>
      <Rating v-if="isRating === true" v-model="ratingValue" readonly :cancel="false" style="margin-bottom: 5px" />
      <p class="card-text description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardAcomodacao',
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: false
    },
    isRating: {
      type: Boolean,
      required: true
    },
    description: {
      type: String,
    }
  },
  data(){
    return{
      ratingValue: this.rating,
    }
  }
};
</script>

<style scoped>
.custom-card {
  width: 100%;
  height: 100%;
  border-radius: 10px; /* Rounded corners */
  overflow: hidden; /* Makes sure the image stays within the border radius */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
}

.custom-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
}

.custom-card img {
  width: 100%; /* Ensures the image covers the width of the card */
  height: auto; /* Keeps the aspect ratio of the image */
  max-height: 182px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  min-height: 180px;
}

.custom-card .card-body {
  padding: 15px; /* Padding inside the card */
}

.custom-card .card-title {
  font-size: 1rem; /* Title size */
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0.5rem;
}

.custom-card .card-text {
  font-size: 0.9rem; /* Text size */
  color: #666666; /* Text color */
  margin-bottom: 5px !important;
}

.custom-card .description {
  font-size: 0.875rem; /* Smaller text for the description */
  color: #888888;
}

@media screen and (min-height: 1091px) and (max-width: 1220px) {
  .custom-card img{
    max-height: 217px;
  }
}
@media screen and (min-height: 1091px) {
  .custom-card img{
    max-height: 240px;
  }
}

@media screen and (min-height: 1068px) {
  .custom-card img{
    max-height: 260px;
  }
}

@media screen and (min-height: 991px) {
  .custom-card img{
    max-height: 195px;
  }
}
</style>
