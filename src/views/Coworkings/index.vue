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
    <b-colxx lg="12"><AnimatedLogo :show-logo="showAnimatedLogo" v-if="showAnimatedLogo" /></b-colxx>
    <b-colxx lg="6" v-if="showAnimatedLogo === false">
      <b-colxx class="mt-5" lg="12" v-for="(acomodacao, index) in acomodacoesPatrocinadas" :key="index">
        <card-coworkings
            :images="acomodacao.imagens"
            :title="acomodacao.nome"
            :endereco="acomodacao.endereco"
            :id="acomodacao.id"
            :rating="acomodacao.rating"
            :button-info="true"
            :description="acomodacao.description"
        />
      </b-colxx>
      <b-colxx lg="12" class="mt-4">
        <Paginator :rows="cardsPerPage" :totalRecords="totalRecords" @page-change="onPageChange" />
      </b-colxx>
    </b-colxx>
    <b-colxx lg="6">
      <GoogleMap
          :api-key="apiKeyGoogle"
          style="width: 100%; height: 93%"
          :center="center"
          :zoom="8"
          :styles="mapStyles"
      >
        <Marker
            v-for="(marker, index) in markers"
            :key="index"
            :options="{ position: marker.position }"
            @mouseover="showInfoWindow(index)"
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
import CoworkingMapCard from "@/components/Common/CoworkingMapCard.vue";
import AnimatedLogo from "@/components/Common/AnimatedLogo.vue";
import { getAllCoworking } from "@/views/Coworkings/coworkings_service";

export default {
  name: "home",
  components: {
    AnimatedLogo,
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
      showAnimatedLogo: true,
      cardsPerPage: 5,
      currentPage: 1,
      totalRecords: 0,
      apiKeyGoogle: 'AIzaSyCff758FRfR8mAYrc2p6xQq_fEWO1GpKEs',
      center: { },
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
      acomodacoesPatrocinadas: [],
      markers: [],
      mapStyles: [
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#7c93a3"
            },
            {
              "lightness": "-10"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#a0a4a5"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#62838e"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#dde3e3"
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#3f4a51"
            },
            {
              "weight": "0.30"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "poi.attraction",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.government",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "poi.place_of_worship",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.school",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.sports_complex",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-100"
            },
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#bbcacf"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "lightness": "0"
            },
            {
              "color": "#bbcacf"
            },
            {
              "weight": "0.50"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#a9b4b8"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
            {
              "invert_lightness": true
            },
            {
              "saturation": "-7"
            },
            {
              "lightness": "3"
            },
            {
              "gamma": "1.80"
            },
            {
              "weight": "0.01"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a3c7df"
            }
          ]
        }
      ]
    };
  },
  computed: {
    paginatedAcomodacoes() {
      const startIndex = (this.currentPage - 1) * this.cardsPerPage;
      return this.acomodacoesPatrocinadas.slice(startIndex, startIndex + this.cardsPerPage);
    }
  },
  methods: {
    async getCoordinates(address) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data.length > 0) {
          const location = data[0];
          return { lat: parseFloat(location.lat), lng: parseFloat(location.lon) };
        } else {
          console.error('No results found for the given address.');
          return null;
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return null;
      }
    },
    async getCenter() {
      const address = localStorage.getItem('lastSearchedLocation');  // Obter o endereço do localStorage
      console.log(address)
      if (!address) {
        console.log("Nenhum endereço armazenado encontrado.");
        return;
      }
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyCm3EdFXiZTzPHS1rulG5LKo8WYHWICACM`);
        const data = await response.json();
        if (data.status === 'OK') {
          const location = data.results[0].geometry.location;
          console.log(location)
          this.center = { lat: location.lat, lng: location.lng };  // Atualiza o centro do mapa
        } else {
          console.error('Geocoding error:', data.status);
        }
      } catch (error) {
        console.error('Error fetching geocoding data:', error);
      }
    },
    async fetchCoworkings() {
      try {
        const response = await getAllCoworking();
        const spaces = response.data.data;
        console.log(spaces);

        this.acomodacoesPatrocinadas = spaces.map(space => ({
          id: space.ID.toString(),
          imagens: space.Imagens.map(img => img.url),
          nome: space.Nome,
          endereco: space.Logradouro,
          descricao: space.Descricao
        }));

        const markers = await Promise.all(spaces.map(async (space) => {
          const address = `${space.Logradouro}, ${space.Numero}`;
          const coordinates = await this.getCoordinates(address);
          if (coordinates) {
            return {
              title: space.Nome,
              position: coordinates,
              info: `R$${space.Valores[0].preco}/${space.Valores[0].unidade}`,
              rating: space.Rating, // Adicione Rating ao seu backend se necessário
              showInfo: false,
              images: space.Imagens.map(img => ({ itemImageSrc: img.url, alt: space.Nome })),
              description: space.Descricao
            };
          } else {
            return null;
          }
        }));

        this.markers = markers.filter(marker => marker !== null);
        this.totalRecords = this.acomodacoesPatrocinadas.length; // Atualiza o total de registros
      } catch (error) {
        console.error("Error fetching coworking spaces:", error);
      }
    },
    onPageChange(event) {
      this.currentPage = event.page + 1; // Atualiza a página atual com base no evento do paginador
    },
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
    }
  },
  mounted() {
    this.getUserLocation();
    this.getCenter();
    setTimeout(() => {
      this.showAnimatedLogo = false;
      this.fetchCoworkings();
    }, 2500);
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

.gm-style > img {
  display: none !important;
}

@media screen and (max-width: 991px){
  #row_filtros{
    gap: 1.5rem
  }
}


@media screen and (max-width: 649px){
  .custom-card{
    display: grid;
  }
  :deep(.card-img-top){
    max-width: unset!important;
  }
}
</style>
