<template>
  <b-row class="main-flux">
    <b-colxx lg="12" class="mb-4">
      <div class="header">
        <div>
          <h2 class="title-dash">Coworkings</h2>
          <span class="subtitle-dash">Lista De Todos Seus Coworkings</span>
        </div>
        <button @click="navigateToAddSpace" class="add-space-button">Adicionar Espaço</button>
      </div>
    </b-colxx>
    <b-colxx lg="12">
      <b-row>
        <b-colxx lg="12">
          <AnimatedLogo :show-logo="showAnimatedLogo" v-if="showAnimatedLogo" />
        </b-colxx>
        <b-colxx lg="12" v-if="showAnimatedLogo === false">
          <b-colxx class="mt-5" lg="12" v-for="(acomodacao, index) in paginatedAcomodacoes" :key="index">
            <CoworkingListView
                :images="acomodacao.imagens"
                :title="acomodacao.nome"
                :endereco="acomodacao.endereco"
                :cep="acomodacao.cep"
                :numero="acomodacao.numero"
                :complemento="acomodacao.complemento"
                :id="acomodacao.id"
                :description="acomodacao.descricao"
            />
          </b-colxx>
          <b-colxx lg="12">
            <Paginator
                class="mt-3"
                :rows="rowsPerPage"
                :totalRecords="totalRecords"
                :page="currentPage"
                @page="onPageChange"
            ></Paginator>
          </b-colxx>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import AnimatedLogo from "@/components/Common/AnimatedLogo.vue";
import CoworkingListView from "@/components/Common/CoworkingListView.vue";
import { getAllCoworking } from "@/views/Coworkings/coworkings_service";

export default {
  name: "home",
  components: {
    CoworkingListView,
    AnimatedLogo,
    BColxx,
  },
  data() {
    return {
      showAnimatedLogo: true,
      rowsPerPage: 4,
      currentPage: 1,
      acomodacoesPatrocinadas: [],
    };
  },
  computed: {
    totalRecords() {
      return this.acomodacoesPatrocinadas.length;
    },
    paginatedAcomodacoes() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.acomodacoesPatrocinadas.slice(start, end);
    }
  },
  methods: {
    onPageChange(event) {
      this.currentPage = event.page + 1;
      this.fetchCoworkings();
    },
    fetchCoworkings() {
      getAllCoworking()
          .then(response => {
            const spaces = response.data.data;
            this.acomodacoesPatrocinadas = spaces.map(space => ({
              id: space.ID.toString(),
              imagens: space.Imagens.map(img => img.url),
              nome: space.Nome,
              endereco: space.Logradouro,
              cep: space.Cep,
              numero: space.Numero,
              complemento: space.Complemento,
              descricao: space.Descricao
            }));
          })
          .catch(error => {
            console.error("Error fetching coworking spaces:", error);
          });
    },
    navigateToAddSpace() {
      this.$router.push('/add-space');
    }
  },
  mounted() {
    setTimeout(() => {
      this.showAnimatedLogo = false;
      this.fetchCoworkings();
    }, 2500);
  }
};
</script>

<style scoped>
.title-dash {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: black;
}

.main-flux {
  margin: 20px !important;
}

.subtitle-dash {
  font-family: "Poppins", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-space-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.add-space-button:hover {
  background-color: #0056b3;
}
</style>
