<template>
  <div class="custom-card">
    <div class="image-container">
      <img :src="currentImage" class="card-img" alt="Imagem do Espaço">
      <template v-if="images.length > 1">
        <button class="nav-button left" @click="prevImage">&#10094;</button>
        <button class="nav-button right" @click="nextImage">&#10095;</button>
      </template>
    </div>
    <div class="info-container">
      <div class="title-container">
        <h5 class="card-title">{{ title }}</h5>
      </div>
      
      <div class="info-row">
        <i class="pi pi-map-marker location-icon"></i>
        <div class="address-info">
          <p class="card-text">
            <span class="endereco">{{ endereco }}</span>
            <span class="cep"> - CEP: {{ formattedCep }}</span>
          </p>
        </div>
      </div>

      <div class="badges-container">
        <span class="info-badge">
          <i class="pi pi-home"></i>
          Nº {{ numero }}
        </span>
        <span class="info-badge" v-if="complemento">
          <i class="pi pi-info-circle"></i>
          {{ complemento }}
        </span>
      </div>

      <div class="features-container">
        <span class="feature-badge" v-if="wifi">
          <i class="pi pi-wifi"></i>
          Wi-Fi
        </span>
        <span class="feature-badge" v-if="quadroBranco">
          <i class="pi pi-chart-line"></i>
          Quadro Branco
        </span>
        <span class="feature-badge" v-if="salaReuniao">
          <i class="pi pi-users"></i>
          Sala de Reunião
        </span>
        <span class="feature-badge" v-if="cafe">
          <i class="pi pi-coffee"></i>
          Café
        </span>
        <span class="feature-badge" v-if="estacionamento">
          <i class="pi pi-car"></i>
          Estacionamento
        </span>
        <span class="feature-badge" v-if="areaRelaxamento">
          <i class="pi pi-heart"></i>
          Área de Relaxamento
        </span>
      </div>
    </div>
    <div class="actions-container">
      <button class="action-button edit" @click="onEditClick" title="Editar">
        <i class="pi pi-pencil"></i>
      </button>
      <button class="action-button delete" @click="deleteCard(id)" title="Excluir">
        <i class="pi pi-trash"></i>
      </button>
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
    onEdit: Function,
    wifi: {
      type: Boolean,
      default: false
    },
    quadroBranco: {
      type: Boolean,
      default: false
    },
    salaReuniao: {
      type: Boolean,
      default: false
    },
    cafe: {
      type: Boolean,
      default: false
    },
    estacionamento: {
      type: Boolean,
      default: false
    },
    areaRelaxamento: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    },
    formattedCep() {
      if (!this.cep) return '';
      const cepString = this.cep.toString();
      // Garante que o CEP tenha 8 dígitos, preenchendo com zeros à esquerda se necessário
      const paddedCep = cepString.padStart(8, '0');
      // Formata o CEP como XXXXX-XXX
      return `${paddedCep.slice(0, 5)}-${paddedCep.slice(5)}`;
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
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto 20px;
}

.custom-card:hover {
  transform: translateY(-5px);
}

.image-container {
  flex: 0 0 250px;
  position: relative;
  max-height: 200px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 200px;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.8);
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.info-container {
  flex: 1;
  min-width: 250px;
  padding: 15px;
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

@media screen and (max-width: 768px) {
  .custom-card {
    flex-direction: column;
  }

  .image-container {
    flex: 0 0 200px;
    width: 100%;
    max-height: 200px;
  }

  .image-container img {
    min-height: 200px;
  }

  .info-container {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .image-container {
    flex: 0 0 180px;
    max-height: 180px;
  }

  .image-container img {
    min-height: 180px;
  }

  .info-container {
    padding: 15px;
  }

  .features-container {
    gap: 5px;
  }

  .feature-badge {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
}

.title-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.status-badge {
  background-color: #4CAF50;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.location-icon {
  color: #FF5722;
}

.badges-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.info-badge {
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.info-badge:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.features-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.feature-badge {
  background-color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.feature-badge:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.actions-container {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
}

.action-button {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
}

.action-button.edit {
  color: #2196F3;
}

.action-button.edit:hover {
  background: #2196F3;
  color: white;
  transform: rotate(15deg);
}

.action-button.delete {
  color: #F44336;
}

.address-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.address-info .cep {
  font-size: 0.85rem;
  color: #666;
}
</style>
