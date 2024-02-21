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
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import InputAcomodacoes from "@/components/Common/InputAcomodacoes.vue";

export default {
  name: "home",
  components: {
    BColxx,
    InputAcomodacoes
  },
  data() {
    return {
      tituloCompleto: "Encontre o espaço perfeito para seus eventos e reuniões",
      tituloAnimado: "",
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
