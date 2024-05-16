<template>
  <b-row class="main-flux">
    <b-colxx class="container-filtros" lg="12">
      <b-row id="row_filtros">
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
      <b-colxx class="mt-5" lg="12" v-for="(acomodacao, index) in acomodacoesPatrocinadas" :key="index">
        <card-coworkings
            :image="acomodacao.imagem"
            :title="acomodacao.title"
            :price="acomodacao.price"
            :description="acomodacao.description"
        />
      </b-colxx>
      <b-colxx lg="12">
        <Paginator class="mt-3" :rows="10" :totalRecords="120"></Paginator>
      </b-colxx>
    </b-colxx>
    <b-colxx lg="6">
      <GoogleMap
          :api-key="apiKeyGoogle"
          style="width: 100%; height: 100%"
          :center="center"
          :zoom="5"
      >
        <Marker
            v-for="(marker, index) in markers"
            :key="index"
            :options="{ position: marker.position }"
            @click="showInfoWindow(index)"
        >
          <InfoWindow v-if="marker.showInfo">
            <div>
              <CoworkingMapCard
                  :title="marker.title"
                  :images="marker.images"
                  :description="marker.description"
                  :ratingValue="marker.rating"
                  :price="marker.info"
              />
            </div>
          </InfoWindow>
        </Marker>
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
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
import escritorioMeirelesImg from "@/assets/img/escritorio1.jpg";
import escritorio2Img from "@/assets/img/escritorio2.jpg";
import escritorio3Img from "@/assets/img/escritorio3.jpg";
import escritorio4Img from "@/assets/img/escritorio4.jpg";
import CoworkingMapCard from "@/components/Common/CoworkingMapCard.vue";

export default {
  name: "home",
  components: {
    CoworkingMapCard,
    InputAcomodacoes,
    CardCoworkings,
    FooterComp,
    BColxx,
    GoogleMap,
    Marker,
    InfoWindow,
  },
  data() {
    return {
      dates: null,
      selectedCity: null,
      apiKeyGoogle: 'AIzaSyCff758FRfR8mAYrc2p6xQq_fEWO1GpKEs',
      center: { lat: -14.235004, lng: -51.92528 }, // Centro do Brasil
      filtros: [
        { name: 'Pesquisa', type: 'search', value: '' },
        { name: 'Data', type: 'date', value: '', placeholder: 'Período' },
        {
          name: 'Tipo Acomodacao', type: 'select', value: '', options: [
            { name: 'Espaço aberto (hot desk)', code: 'open_space' },
            { name: 'Mesa fixa', code: 'fixed_table' },
            { name: 'Escritório privativo', code: 'private_office' },
            { name: 'Sala de reunião', code: 'meeting_room' }
          ], placeholder: 'Tipo De Acomodação'
        },
      ],
      acomodacoesPatrocinadas: [
        { imagem: escritorioMeirelesImg, title: 'Escritório Meireles', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio2Img, title: 'Escritório Aldeota', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio3Img, title: 'Escritório Iguatemi', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio4Img, title: 'Coworking Cafeteria', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
      ],
      markers: [
        { title: 'Escritório Meireles', position: { lat: -23.55052, lng: -46.633308 }, info: 'R$120/dia', rating: 4, showInfo: false, images: [{ itemImageSrc: escritorioMeirelesImg, alt: 'Escritório Meireles' }, { itemImageSrc: escritorio2Img, alt: 'Escritório Aldeota' }], description: 'Escritório em São Paulo' },
        { title: 'Escritório Iguatemi', position: { lat: -22.906846, lng: -43.172896 }, info: 'R$120/dia', rating: 3, showInfo: false, images: [{ itemImageSrc: escritorio3Img, alt: 'Escritório Iguatemi' }, { itemImageSrc: escritorio4Img, alt: 'Coworking Cafeteria' }], description: 'Escritório no Rio de Janeiro' },
        { title: 'Escritório Edson Queiroz', position: { lat: -19.924501, lng: -43.93524 }, info: 'R$120/dia', rating: 4, showInfo: false, images: [{ itemImageSrc: escritorioMeirelesImg, alt: 'Escritório Meireles' }, { itemImageSrc: escritorio4Img, alt: 'Coworking Cafeteria' }], description: 'Escritório em Belo Horizonte' },
        { title: 'Escritório Aldeota', position: { lat: -12.9714, lng: -38.5014 }, info: 'R$120/dia', rating: 4, showInfo: false, images: [{ itemImageSrc: escritorio2Img, alt: 'Escritório Aldeota' }, { itemImageSrc: escritorio3Img, alt: 'Escritório Iguatemi' }], description: 'Escritório em Salvador' },
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
    },
    showInfoWindow(index) {
      this.markers.forEach((marker, i) => {
        marker.showInfo = i === index;
      });
    },
    hideInfoWindow(index) {
      this.markers[index].showInfo = false;
    },
  },
  mounted() {
    this.getUserLocation();
  }
};
</script>

<style scoped>
.search-section {
  width: 100% !important;
}

:deep(.p-calendar) {
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

:deep(.mapdiv) {
  border-radius: 12px;
}

.container-filtros {
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

:deep(.p-dropdown-items) {
  padding-left: 4px !important;
}

.p-dropdown-items-wrapper > ul {
  padding-left: 0 !important;
}

:deep(.card-img-top) {
  border-top-right-radius: 0 !important;
}

ul {
  padding-left: 0 !important;
}

@media screen and (max-width: 991px){
  #row_filtros{
    gap: 1.5rem
  }
}
</style>
