<template>
  <div class="custom-card">
    <div class="image-container">
      <img :src="currentImage" class="card-img-top" alt="Imagem do Espaço">
      <button class="nav-button left" @click="prevImage">&#10094;</button>
      <button class="nav-button right" @click="nextImage">&#10095;</button>
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ price }}</p>
      <p class="card-text description">{{ description }}</p>
      <Rating v-model="ratingValue" readonly :cancel="false" />
      <b-button v-if="buttonInfo === true" class="button-dados" type="button" @click="showInfo(id)" variant="success" block style="width: 100%; margin-top: 30px;">Saiba Mais</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCoworkings',
  props: {
    images: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    buttonInfo: {
      type: Boolean,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    description: {
      type: String,
    }
  },
  data() {
    return {
      currentIndex: 0,
      ratingValue: this.rating,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  methods: {
    showInfo(id) {
      this.$router.push(`/coworkinginfo/${id}`);
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }
};
</script>

<style scoped>
.custom-card {
  width: 100%;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.custom-card:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
}

.image-container img {
  width: 100%;
  height: auto;
  max-height: 195px;
  min-width: 292px;
  max-width: 300px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  min-height: 180px;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
  border-radius: 50%;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1rem;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.9rem;
  color: #666666;
  margin-bottom: 5px !important;
}

.description {
  font-size: 0.875rem;
  color: #888888;
}
</style>
