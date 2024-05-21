<template>
  <b-row class="support-header">
    <b-colxx lg="12" class="text-center">
      <h2 class="support-greeting">Oi, como posso ajudar?</h2>
    </b-colxx>
  </b-row>
  <b-row style="margin-top: -50px;">
    <b-colxx v-for="(card, index) in supportCards" :key="index" lg="4" class="text-center" style="justify-content: center; display: flex;">
      <SupportCard :iconClass="card.iconClass" :text="card.text" @card-clicked="handleCardClick(index)"/>
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
        <Accordion :activeIndex="activeAccordionIndex">
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
        </Accordion>
      </b-colxx>
    </b-row>
    <b-row class="support-featured mt-5">
      <b-colxx lg="12" class="text-center">
        <h2 class="titles-primary">Espaços de Trabalho Populares</h2>
      </b-colxx>
    </b-row>
  </b-container>
  <FooterComp></FooterComp>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import FaqSearchBar from "@/components/Common/FaqSearchBar.vue";
import FooterComp from "@/components/Common/FooterComp.vue";
import SupportCard from "@/components/Common/CardSupport.vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

export default {
  name: "home",
  components: {
    Accordion,
    AccordionTab,
    FooterComp,
    BColxx,
    FaqSearchBar,
    SupportCard,
  },
  data() {
    return {
      supportCards: [
        { iconClass: 'pi pi-key', text: 'Redefinir Senha' },
        { iconClass: 'pi pi-user-edit', text: 'Atualizar Dados Pessoais' },
        { iconClass: 'pi pi-times', text: 'Cancelar Assinatura' },
      ],
      tituloCompleto: "Encontre o espaço perfeito para seus eventos e reuniões",
      tituloAnimado: "",
      typingSpeed: 75, // Velocidade de digitação em milissegundos
      activeAccordionIndex: null,
    };
  },
  methods: {
    handleCardClick(index) {
      this.activeAccordionIndex = index;
    }
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
