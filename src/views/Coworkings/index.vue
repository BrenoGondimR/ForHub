<template>
  <b-row class="main-flux">
    <b-colxx class="container-filtros" lg="12" style="">
      <b-row>
        <b-colxx v-for="(filtro, index) in filtros" lg="4" :key="index">
          <input-acomodacoes v-if="filtro.type === 'search'" v-model="filtro.value" :placeholder-text="'Localização'"></input-acomodacoes>
          <Calendar v-if="filtro.type === 'date'" :placeholder="filtro.placeholder" v-model="filtro.value" selectionMode="range" :manualInput="false" />
          <Dropdown v-if="filtro.type === 'select'" v-model="filtro.value" :options="filtro.options" optionLabel="name" :placeholder="filtro.placeholder" class="w-full md:w-14rem" />
        </b-colxx>
      </b-row>
    </b-colxx>
  </b-row>
  <b-row style="padding: 30px; width: 100%;">
    <b-colxx lg="6">
      <b-colxx class="mt-5" lg="12" v-for="(acomodacao, index) in acomodacoesPatrocinadas" :key="index" style="">
        <card-coworkings
            :image="acomodacao.imagem"
            :title="acomodacao.title"
            :price="acomodacao.price"
            :description="acomodacao.description"
        />
      </b-colxx>
    </b-colxx>
    <b-colxx lg="6">
      <GoogleMap
          :api-key="apiKeyGoogle"
          style="width: 100%; height: 100%"
          :center="center"
          :zoom="15"
      >
        <Marker :options="{ position: center }" />
      </GoogleMap>
    </b-colxx>
  </b-row>
  <FooterComp></FooterComp>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import CardCoworkings from "@/components/Common/CardCoworkings.vue";
import FooterComp from "@/components/Common/FooterComp.vue";
import InputAcomodacoes from "@/components/Common/InputAcomodacoes.vue";
import escritorioMeirelesImg from "@/assets/img/escritorio1.jpg";
import escritorio2Img from "@/assets/img/escritorio2.jpg";
import escritorio3Img from "@/assets/img/escritorio3.jpg";
import escritorio4Img from "@/assets/img/escritorio4.jpg";
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
  name: "home",
  components: {
    InputAcomodacoes,
    CardCoworkings,
    FooterComp,
    BColxx,
    GoogleMap,
    Marker
  },
  data() {
    return {
      dates: null,
      selectedCity: null,
      apiKeyGoogle: 'AIzaSyCff758FRfR8mAYrc2p6xQq_fEWO1GpKEs',
      center: { lat: 40.689247, lng: -74.044502 }, // Valor padrão, será atualizado
      filtros: [
        {name: 'Pesquisa', type: 'search', value: '', },
        {name: 'Data', type: 'date', value: '', placeholder: 'Período' },
        {name: 'Tipo Acomodacao', type: 'select', value: '', options: [{ name: 'Espaço aberto (hot desk)', code: 'open_space' }, { name: 'Mesa fixa', code: 'fixed_table' }, { name: 'Escritório privativo', code: 'private_office' }, { name: 'Sala de reunião', code: 'meeting_room' }], placeholder: 'Tipo De Acomodação'},
      ],
      acomodacoesPatrocinadas: [
        { imagem: escritorioMeirelesImg, title: 'Escritório Meireles', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio2Img, title: 'Escritório Aldeota', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio3Img, title: 'Escritório Iguatemi', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio4Img, title: 'Coworking Cafeteria', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
      ],
    };
  },
  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
              this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
            },
            () => {
              alert("Não foi possível obter a localização.");
            }
        );
      } else {
        alert("Geolocalização não é suportada por este navegador.");
      }
    }
  },
  mounted() {
    this.getUserLocation();
  }
};
</script>

<style scoped>
.search-section{
  width: 100% !important;
}
:deep(.p-calendar){
  width: 100% !important;
  height: 100% !important;
  border-radius: 12px !important;
}
:deep(.p-inputtext) {
  border-radius: 12px !important;
}
:deep(.p-calendar:not(.p-calendar-disabled).p-focus > .p-inputtext) {
  outline: 1px solid #1AA3E5 !important;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
  outline: 1px solid #1AA3E5 !important;
}

:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
  background: #aacde7 !important;
  color: #1AA3E5 !important;
}

.container-filtros{
  border-radius: 20px;
  padding: 14px;
  border: 1.5px solid lightgrey;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

:deep(.p-dropdown) {
  width: 100% !important;
  height: 100% !important;
  align-items: center !important;
  border-radius: 12px !important;
}
:deep(.p-dropdown-items){
  padding-left: 4px !important;
}

.p-dropdown-items-wrapper > ul {
  padding-left: 0 !important;
}

ul {
  padding-left: 0 !important;
}

</style>
