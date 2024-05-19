<template>
  <div class="gallery">
    <div class="main-image">
      <img :src="currentImage" alt="Main Image">
    </div>
    <div class="thumbnail-images">
      <img
          v-for="(image, index) in images"
          :key="index"
          :src="image"
          alt="Thumbnail"
          @click="updateMainImage(image)"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoworkingGallery',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentImage: this.images[0]
    };
  },
  methods: {
    updateMainImage(image) {
      this.currentImage = image;
    }
  }
};
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.main-image img {
  width: 100%;
  height: 400px; /* Ajusta a altura da imagem principal */
  object-fit: cover;
  border-radius: 10px;
}

.thumbnail-images {
  display: flex;
  gap: 10px;
  justify-content: center; /* Centraliza as miniaturas */
}

.thumbnail-images img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;
}

.thumbnail-images img:hover {
  transform: scale(1.1);
}

/* Responsividade */
@media (max-width: 768px) {
  .thumbnail-images img {
    width: 80px;
    height: 80px;
  }
}

@media (max-width: 480px) {
  .thumbnail-images img {
    width: 60px;
    height: 60px;
  }
}
</style>
