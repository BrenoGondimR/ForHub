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
          <input-acomodacoes></input-acomodacoes>
        </b-colxx>
      </b-row>
    </b-card>
    <b-row class="mt-5">
      <b-colxx lg="3" v-for="(acomodacao, index) in acomodacoesPatrocinadas" :key="index" style="">
        <card-acomodacao
            :image="acomodacao.imagem"
            :title="acomodacao.title"
            :price="acomodacao.price"
            :description="acomodacao.description"
        />
      </b-colxx>
    </b-row>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import InputAcomodacoes from "@/components/Common/InputAcomodacoes.vue";
import CardAcomodacao from "@/components/Common/CardAcomodação.vue";

//TODO TIRAR ESSES IMPORTS E PUXAR IMAGENS DO BANCO
import escritorioMeirelesImg from '@/assets/img/escritorio1.jpg';
import escritorio2Img from '@/assets/img/escritorio2.jpg';
import escritorio3Img from '@/assets/img/escritorio3.jpg';
import escritorio4Img from '@/assets/img/escritorio4.jpg';


export default {
  name: "home",
  components: {
    CardAcomodacao,
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
      typingSpeed: 75 // Velocidade de digitação em milissegundos
    };
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
</style>
