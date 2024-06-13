<template>
  <div class="details-container">
    <div class="details-left">
      <h1>{{ details.name }}</h1>
      <h2>por {{ details.provider }}</h2>
      <p>{{ details.description }}</p>
      <CoworkingFacilities :facilities="facilities" />
    </div>
    <div class="details-right">
      <h4>Valores cadastrados</h4>
      <div v-for="(field, index) in fieldsValores" :key="index" class="value-row">
        <div class="value-info">
          <div class="value-label">{{ field.label }}:</div>
          <div class="value-description">{{ field.description }}</div>
        </div>
        <div class="value-content">
          <span>R$ {{ field.value }} {{ field.unit }}</span>
          <button class="rent-now" @click="rentNow(field)">Alugar</button>
        </div>
      </div>
    </div>

    <b-modal v-model="showModal" title="Detalhes da Reserva" hide-footer>
      <div class="modal-body">
        <div class="form-group">
          <label>Nome</label>
          <input type="text" v-model="name" class="form-control" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" class="form-control" />
        </div>
        <div class="form-group">
          <label>Telefone</label>
          <input type="tel" v-model="phone" class="form-control" />
        </div>
      </div>
      <div class="modal-footer">
        <b-button variant="primary" @click="sendMessage" class="confirm-button">Enviar Mensagem</b-button>
        <b-button variant="secondary" @click="closeModal" class="close-button">Fechar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import CoworkingFacilities from '@/components/Common/CoworkingFacilities.vue';
import { getCoworking } from "@/views/Coworkings/coworkings_service";

export default {
  name: 'CoworkingDetails',
  components: {
    CoworkingFacilities
  },
  props: {
    details: {
      type: Object,
      required: true
    },
    facilities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      showModal: false,
      fieldsValores: [],
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    fetchCoworkings() {
      const coworkingId = this.$route.params.id || this.coworkingId; // Usando Vue Router ou prop
      getCoworking(coworkingId)
          .then(response => {
            const spaces = response.data.data;
            this.fieldsValores = spaces.Valores.map(space => ({
              key: space.servico.toLowerCase().replace(/\s+/g, '_'), // transforma "Auditório" em "auditorio"
              label: space.servico,
              description: space.descricao,
              value: space.preco,
              unit: space.unidade
            }));
          })
          .catch(error => {
            console.error("Error fetching coworking spaces:", error);
          });
    },
    sendMessage() {
      const message = `Olá, meu nome é ${this.name}. Gostaria de mais informações sobre o espaço ${this.details.name}.`;
      const phoneNumber = this.details.phone.replace(/\D/g, ''); // Remove caracteres não numéricos
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      this.closeModal();
    },
    rentNow(field) {
      this.showModal = true;
    }
  },
  created() {
    this.fetchCoworkings();
  }
};
</script>

<style scoped>
.details-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.details-left {
  flex: 1 1 60%;
}

.details-right {
  flex: 1 1 35%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: auto;
  background-color: #ffffff;
}

h1 {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

h2 {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
}

h4 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.value-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.value-row:last-child {
  border-bottom: none;
}

.value-info {
  flex: 1;
}

.value-label {
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.value-description {
  font-size: 0.875rem;
  color: #666;
  margin-top: 5px;
}

.value-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  justify-content: flex-end;
}

.value-content span {
  font-size: 1rem;
  color: #333;
}

.value-row button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.value-row button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.modal-body {
  padding: 20px;
}

.modal-body .form-group {
  margin-bottom: 15px;
}

.modal-body .form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.modal-body .form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.confirm-button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #0056b3;
}

.close-button {
  background-color: #ddd;
  border: none;
  color: #333;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #ccc;
}

@media (max-width: 768px) {
  .details-container {
    flex-direction: column;
  }

  .details-right {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .details-container {
    gap: 10px;
  }

  .details-left,
  .details-right {
    padding: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.875rem;
  }

  .value-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .value-label,
  .value-content span {
    font-size: 0.875rem;
  }

  .value-row button {
    width: 100%;
    text-align: center;
  }
}
</style>
