<template>
  <div class="search-section">
    <div class="input-group">
      <input v-model="searchQuery" @input="filterLocations" type="text" class="form-control" :placeholder="placeholderText" aria-label="Search" style="border-radius: 12px; padding: 0 30px; height: 55px; z-index: 0;">
      <span class="input-group-append">
        <button class="btn btn-primary" type="button" @click="searchAndNavigate">
          <i class="pi pi-search"></i>
        </button>
      </span>
      <ul v-if="filteredLocations.length" class="suggestions">
        <li v-for="location in filteredLocations.slice(0, 10)" :key="location" @click="selectLocation(location)">
          {{ location }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    placeholderText: {
      type: String,
      default: 'Pesquisar endereço, cidade ou região' // Valor padrão se nenhum for fornecido
    }
  },
  data() {
    return {
      searchQuery: '',
      allLocations: [],
      filteredLocations: []
    };
  },
  created() {
    this.fetchLocations();
  },
  methods: {
    async fetchLocations() {
      try {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        this.allLocations = response.data.map(municipio => `${municipio.nome} - ${municipio.microrregiao.mesorregiao.UF.sigla}`);
      } catch (error) {
        console.error('Erro ao buscar localidades:', error);
      }
    },
    filterLocations() {
      if (!this.searchQuery) {
        this.filteredLocations = [];
        return;
      }

      this.filteredLocations = this.allLocations.filter((location) =>
          location.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    selectLocation(location) {
      this.searchQuery = location;
      this.filteredLocations = [];
    },
    searchAndNavigate() {
      if (this.searchQuery) {
        localStorage.setItem('lastSearchedLocation', this.searchQuery); // Salva a localização no localStorage
        this.$router.push('/coworkings');
      } else {
        alert("Por favor, insira uma localização para pesquisar.");
      }
    }
  }
};
</script>

<style>
.search-section {
  position: relative;
  margin: 0 auto;
  width: 85%;
}

.input-group {
  position: relative;
  border-radius: 10px;
  margin: auto;
}

.input-group .form-control:focus-within {
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.input-group .form-control {
  width: 100%;
  height: 100%;
  border-radius: 12px 0 0 12px;
}

.input-group-append {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
}

.btn-primary {
  border: none;
  background-color: transparent;
  color: white;
  height: 100%;
  padding: 0 20px;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
  border-radius: 0 0 12px 12px !important;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  z-index: 10;
  max-height: 300px; /* Ajuste a altura máxima conforme necessário */
  overflow-y: auto; /* Adiciona rolagem vertical se necessário */
}

.suggestions li {
  padding: 10px 20px;
  cursor: pointer;
}

.suggestions li:hover {
  background: #c6d4ec !important; /* Cor de fundo ao passar o mouse */
  color: #1AA3E5 !important; /* Cor do texto ao passar o mouse */
}

.search-section .input-group-append {
  position: absolute;
  right: 10px;
  top: 8px;
  height: 100%; /* Ajusta a altura do botão de pesquisa */
}

.search-section .btn-primary {
  border-radius: 12px;
  color: white;
  font-family: "Poppins", sans-serif;
  border: none;
  background-color: #1AA3E5;
  display: flex;
  bottom: 13px;
  z-index: 20;
  top: -9px;
  align-items: center;
  justify-content: center;
  height: 73%;
  padding: 0 20px;
  margin-top: 8px;
  margin-right: 10px;
}
</style>
