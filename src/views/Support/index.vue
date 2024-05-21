<template>
  <b-row class="support-header">
      <b-colxx lg="12" class="text-center">
        <h2 class="support-greeting">Oi, como posso ajudar?</h2>
      </b-colxx>
    </b-row>
  <b-container class="support-container">
    <b-row class="support-search mt-4">
      <b-colxx lg="12">
        <faq-search-bar :placeholder="'Pesquisar no FAQ'"></faq-search-bar>
      </b-colxx>
    </b-row>
    <b-row class="support-content mt-5">
      <b-colxx lg="12">
        <Accordion :activeIndex="0">
          <!-- Exemplos de novas abas adicionadas -->
          <AccordionTab header="Como redefinir minha senha?">
            <p class="m-0 sub-text-accordion">
              Para redefinir sua senha, acesse a página de login e clique em
              'Esqueci minha senha'. Siga as instruções enviadas para seu email.
            </p>
          </AccordionTab>
          <AccordionTab header="Como atualizar meus dados pessoais?">
            <p class="m-0 sub-text-accordion">
              Você pode atualizar seus dados pessoais acessando o seu perfil na
              plataforma e selecionando a opção 'Editar Perfil'.
            </p>
          </AccordionTab>
          <AccordionTab header="Como cancelar minha assinatura?">
            <p class="m-0 sub-text-accordion">
              Para cancelar sua assinatura, acesse as configurações da sua conta
              e selecione 'Cancelar assinatura'. Siga os passos para confirmar.
            </p>
          </AccordionTab>
          <!-- Abas existentes -->
        </Accordion>
      </b-colxx>
    </b-row>
    <b-row class="support-featured mt-5">
      <b-colxx lg="12" class="text-center">
        <h2 class="titles-primary">Espaços de Trabalho Populares</h2>
      </b-colxx>
      <!-- Cards de acomodações -->
    </b-row>
  </b-container>
  <FooterComp></FooterComp>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import FaqSearchBar from "@/components/Common/FaqSearchBar.vue";
import CardAcomodacao from "@/components/Common/CardAcomodação.vue";
import FooterComp from "@/components/Common/FooterComp.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

//TODO TIRAR ESSES IMPORTS E PUXAR IMAGENS DO BANCO
import escritorioMeirelesImg from "@/assets/img/escritorio1.jpg";
import escritorio2Img from "@/assets/img/escritorio2.jpg";
import escritorio3Img from "@/assets/img/escritorio3.jpg";
import escritorio4Img from "@/assets/img/escritorio4.jpg";

export default {
  name: "home",
  components: {
    CardAcomodacao,
    Accordion,
    AccordionTab,
    FooterComp,
    BColxx,
    FaqSearchBar,
  },
  data() {
    return {
      tituloCompleto: "Encontre o espaço perfeito para seus eventos e reuniões",
      tituloAnimado: "",
      acomodacoesPatrocinadas: [
        {
          imagem: escritorioMeirelesImg,
          title: "Escritório Meireles",
          price: "R$120/dia",
          description: "Ótima localização...mais texto aqui",
        },
        {
          imagem: escritorio2Img,
          title: "Escritório Aldeota",
          price: "R$120/dia",
          description: "Ótima localização...mais texto aqui",
        },
        {
          imagem: escritorio3Img,
          title: "Escritório Iguatemi",
          price: "R$120/dia",
          description: "Ótima localização...mais texto aqui",
        },
        {
          imagem: escritorio4Img,
          title: "Coworking Cafeteria",
          price: "R$120/dia",
          description: "Ótima localização...mais texto aqui",
        },
      ],
      typingSpeed: 75, // Velocidade de digitação em milissegundos
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
  },
};
</script>

<style scoped>

.support-container {
  max-width: 1200px;
  margin: auto;
  padding: 0;
}

.support-header {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  padding: 0;
  height: 185px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 25% 20%;
  border-bottom-right-radius: 25% 20%;
}

.support-greeting {
  font-size: 32px;
  color: #fff;
  font-weight: bold;
}

.support-search, .support-content, .support-featured {
  padding: 20px;
}

.titles-primary {
  font-size: 28px;
  margin-bottom: 20px;
}
</style>

