<template>
  <div class="custom-card">
    <div class="image-container">
      <img :src="currentImage" class="card-img" alt="Imagem do Espaço">
      <button class="nav-button left" @click="prevImage">&#10094;</button>
      <button class="nav-button right" @click="nextImage">&#10095;</button>
    </div>
    <div class="info-container">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text endereco">{{ endereco }}</p>
      <p class="card-text cep">CEP: {{ cep }}</p>
      <p class="card-text numero">Número: {{ numero }}</p>
      <p class="card-text complemento">Complemento: {{ complemento }}</p>
    </div>
    <div class="icons-container">
      <i style="  font-size: 1.2rem; cursor: pointer; color: #007bff;" class="pi pi-pencil" @click="onEditClick" />
      <i class="pi pi-trash delete-icon" @click="deleteCard(id)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoworkingListView',
  props: {
    images: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    endereco: {
      type: String,
      required: true
    },
    cep: {
      type: Number,
      required: true
    },
    numero: {
      type: Number,
      required: true
    },
    complemento: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    onEdit: Function
  },
  data() {
    return {
      currentIndex: 0,
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
    onEditClick() {
      this.onEdit(this.id);
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    editCard(id) {
      console.log(`Edit card with id: ${id}`);
    },
    deleteCard(id) {
      console.log(`Delete card with id: ${id}`);
    }
  }
};
</script>

<style scoped>
.custom-card {
  display: flex;
  align-items: flex-start;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 20px;
  position: relative;
}

.custom-card:hover {
  transform: translateY(-5px);
}

.image-container {
  flex: 1;
  position: relative;
}

.image-container img {
  width: 100%;
  height: auto;
  max-height: 197px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
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

.info-container {
  flex: 2;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 5px !important;
}

.endereco, .cep, .numero, .complemento {
  font-size: 0.9rem;
  color: #777;
}

.icons-container {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

.edit-icon {
  font-size: 1.2rem;
  cursor: pointer;
  color: #777;
}

.delete-icon {
  font-size: 1.2rem;
  cursor: pointer;
  color: #777;
}

.edit-icon:hover, .delete-icon:hover {
  color: #000;
}

@media screen and (max-width: 1220px) {
  .image-container img {
    max-height: 220px !important;
    min-height: 220px;
  }
}

@media screen and (min-width: 990px) and (max-width: 1040px) {
  .image-container img {
    min-height: 261px;
  }
}
</style>
