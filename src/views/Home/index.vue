<template>
  <b-row class="main-flux">
    <b-card class="container-home" style="display: grid!important;">
      <b-row style="margin: auto auto 0px;">
        <b-colxx lg="10" style="margin: auto">
          <h1 id="titulo-imagem">{{ tituloAnimado }}</h1>
        </b-colxx>
      </b-row>
      <b-row>
        <b-colxx lg="12">
          <input-acomodacoes :placeholder-text="'Pesquisar endereço, cidade ou região'"></input-acomodacoes>
        </b-colxx>
      </b-row>
    </b-card>
    <b-row class="mt-2">
      <b-colxx class="mt-5" lg="3" md="6" sm="12" v-for="(acomodacao, index) in acomodacoesPatrocinadas" :key="index" style="">
        <card-acomodacao
            :image="acomodacao.imagem"
            :title="acomodacao.title"
            :price="acomodacao.price"
            :description="acomodacao.description"
        />
      </b-colxx>
      <b-colxx lg="12" class="mt-5">
        <h2 class="titles-primary" style="margin-bottom: 1rem">Como Funciona</h2>
        <p class="subtext-primary">ForHub é a maneira mais fácil de reservar um espaço de trabalho ou sala de reunião em todo o mundo.
          Com milhares de espaços de coworking e salas de reunião disponíveis para reserva sob demanda,
          você pode encontrar o local perfeito para o seu próximo evento, seja uma reunião de diretoria,
          conferência ou lançamento de produto.</p>
      </b-colxx>
      <b-row style="padding: 0 50px;">
        <b-colxx class="mt-4" lg="4" v-for="(acomodacao, index) in detalhesForHub" :key="index" style="">
          <card-acomodacao
              :image="acomodacao.imagem"
              :title="acomodacao.title"
              :price="acomodacao.price"
          />
        </b-colxx>
      </b-row>
      <b-colxx lg="12" class="mt-5">
        <Accordion :activeIndex="0">
          <AccordionTab header="Quais são os métodos de pagamento aceitos?">
            <p class="m-0 sub-text-accordion">
              Aceitamos os seguintes métodos de pagamento: Cartão de crédito, boleto bancário, transferência eletrônica.
            </p>
          </AccordionTab>
          <AccordionTab header="Quais são os bairros que atendemos em Fortaleza?">
            <p class="m-0 sub-text-accordion">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
              enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
          </AccordionTab>
          <AccordionTab header="Como faço para reservar um espaço de coworking?">
            <p class="m-0 sub-text-accordion">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
              culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </AccordionTab>
        </Accordion>
      </b-colxx>
    </b-row>
  </b-row>
  <FooterComp></FooterComp>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import InputAcomodacoes from "@/components/Common/InputAcomodacoes.vue";
import CardAcomodacao from "@/components/Common/CardAcomodação.vue";
import FooterComp from "@/components/Common/FooterComp.vue";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

//TODO TIRAR ESSES IMPORTS E PUXAR IMAGENS DO BANCO
import escritorioMeirelesImg from '@/assets/img/escritorio1.jpg';
import escritorio2Img from '@/assets/img/escritorio2.jpg';
import escritorio3Img from '@/assets/img/escritorio3.jpg';
import escritorio4Img from '@/assets/img/escritorio4.jpg';
import reservas from '@/assets/img/reservas.jpg';
import estenderequipe from '@/assets/img/jobgroup.jpg';
import eventos from '@/assets/img/eventos.jpg';


export default {
  name: "home",
  components: {
    CardAcomodacao,
    Accordion,
    AccordionTab,
    FooterComp,
    BColxx,
    InputAcomodacoes
  },
  data() {
    return {
      tituloCompleto: "Encontre o espaço perfeito para seus eventos e reuniões",
      tituloAnimado: "",
      acomodacoesPatrocinadas: [
        { imagem: escritorioMeirelesImg, title: 'Escritório Meireles', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio2Img, title: 'Escritório Aldeota', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio3Img, title: 'Escritório Iguatemi', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
        { imagem: escritorio4Img, title: 'Coworking Cafeteria', price: 'R$120/dia', description: 'Ótima localização...mais texto aqui' },
      ],
      detalhesForHub: [
        { imagem: reservas, title: 'Reserve Sob Demanda', price: 'Reserve espaços de trabalho e salas de reunião em todo o mundo'},
        { imagem: estenderequipe, title: 'Estenda Sua Equipe', price: 'Economize tempo e dinheiro com um plano de membros que oferece acesso ilimitado a espaços de coworking ao redor do mundo'},
        { imagem: eventos, title: 'Planeje Eventos', price: 'Encontre o local perfeito para o seu próximo evento, seja uma reunião de diretoria, conferência ou lançamento de produto'},
      ],
      typingSpeed: 75 // Velocidade de digitação em milissegundos
    };
  },
  methods: {

  },
  mounted() {
    let i = 0;
    const typingInterval = setInterval(() => {
      this.tituloAnimado += this.tituloCompleto[i];
      i++;
      if (i >= this.tituloCompleto.length) {
        clearInterval(typingInterval);
      }
    }, this.typingSpeed);
  }
};
</script>

<style scoped>
:deep(.card-body){
  display: grid !important;
}

::v-deep .p-accordion .p-accordion-header a {
  text-decoration: none !important;
  color: black;
}
</style>
