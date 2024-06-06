<template>
  <b-row class="main-flux">
    <b-colxx lg="12" class="mb-4">
      <h2 class="title-dash">Coworkings</h2>
      <span class="subtitle-dash">Lista De Todos Seus Coworkings</span>
    </b-colxx>
    <b-colxx lg="12">
      <b-row>
        <b-colxx lg="12"><AnimatedLogo :show-logo="showAnimatedLogo" v-if="showAnimatedLogo" /></b-colxx>
        <b-colxx lg="12" v-if="showAnimatedLogo === false">
          <b-colxx class="mt-5" lg="12" v-for="(acomodacao, index) in acomodacoesPatrocinadas" :key="index">
            <CoworkingListView
                :images="acomodacao.imagens"
                :title="acomodacao.title"
                :price="acomodacao.price"
                :id="acomodacao.id"
                :rating="acomodacao.rating"
                :description="acomodacao.description"
            />
          </b-colxx>
          <b-colxx lg="12">
            <Paginator class="mt-3" :rows="10" :totalRecords="120"></Paginator>
          </b-colxx>
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import CardCoworkings from "@/components/Common/CardCoworkings.vue";
import AnimatedLogo from "@/components/Common/AnimatedLogo.vue";
import escritorioMeirelesImg from "@/assets/img/escritorio1.jpg";
import escritorio2Img from "@/assets/img/escritorio2.jpg";
import escritorio3Img from "@/assets/img/escritorio3.jpg";
import escritorio4Img from "@/assets/img/escritorio4.jpg";
import CoworkingListView from "@/components/Common/CoworkingListView.vue";

export default {
  name: "home",
  components: {
    CoworkingListView,
    AnimatedLogo, CardCoworkings,
    BColxx,
  },
  data() {
    return {
      showAnimatedLogo: true,
      acomodacoesPatrocinadas: [
        { id: '1', rating: 5, imagens: [escritorioMeirelesImg, escritorio2Img], title: 'Escritório Meireles', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { id: '2', rating: 4, imagens: [escritorio2Img, escritorio3Img], title: 'Escritório Aldeota', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { id: '3', rating: 2, imagens: [escritorio3Img, escritorio4Img], title: 'Escritório Iguatemi', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { id: '4', rating: 4, imagens: [escritorio4Img, escritorioMeirelesImg], title: 'Coworking Cafeteria', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
      ],
    };
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.showAnimatedLogo = false;
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
</style>
