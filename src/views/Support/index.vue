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
        <FaqSearchBar :placeholder="'Pesquisar no FAQ'" @search="handleSearch"/>
      </b-colxx>
    </b-row>
    <b-row class="support-content mt-5">
      <b-colxx lg="12">
        <Accordion :activeIndex="activeAccordionIndex">
          <AccordionTab v-for="(tab, index) in filteredTabs" :key="index" :header="tab.header">
            <p class="m-0 sub-text-accordion" v-html="tab.content"></p>
          </AccordionTab>
        </Accordion>
      </b-colxx>
    </b-row>
    <b-row class="support-feedback mt-5">
      <b-colxx lg="12" class="text-center">
        <Card class="mb-3" style="max-width: 950px; margin: auto;">
          <template #title>
            <h2 class="titles-primary">Deixe seu Feedback</h2>
          </template>
          <template #content>
            <p class="m-0">
              Queremos saber a sua opinião! Deixe seu feedback sobre a plataforma e os serviços oferecidos para que possamos melhorar continuamente.
            </p>
            <feedback-form  style="margin-top: 15px;"/>
          </template>
        </Card>
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
import Card from "primevue/card";
import FeedbackForm from "@/components/Common/FeedBackForm.vue";

export default {
  name: "home",
  components: {
    Accordion,
    AccordionTab,
    FooterComp,
    BColxx,
    FaqSearchBar,
    SupportCard,
    Card,
    FeedbackForm,
  },
  data() {
    return {
      supportCards: [
        { iconClass: 'pi pi-key', text: 'Redefinir Senha' },
        { iconClass: 'pi pi-user-edit', text: 'Atualizar Dados Pessoais' },
        { iconClass: 'pi pi-times', text: 'Cancelar Assinatura' },
      ],
      tabs: [
        {
          header: "Como redefinir minha senha?",
          content: `
            Para redefinir sua senha, acesse a página de login e clique em 'Esqueci minha senha'.
            Siga as instruções enviadas para seu email. Se você não receber o email dentro de alguns minutos,
            verifique sua pasta de spam ou lixo eletrônico. Caso ainda não encontre o email, tente solicitar a redefinição de senha novamente.
            Se o problema persistir, entre em contato com o suporte ao cliente para obter assistência adicional.
            <br><br>
            Certifique-se de que está utilizando o endereço de email correto associado à sua conta.
            Se você esqueceu qual email está associado à sua conta, entre em contato com o suporte ao cliente
            e forneça as informações necessárias para verificar sua identidade.
          `
        },
        {
          header: "Como atualizar meus dados pessoais?",
          content: `
            Você pode atualizar seus dados pessoais acessando o seu perfil na plataforma e selecionando a opção 'Editar Perfil'.
            Certifique-se de que todas as informações fornecidas estão corretas e atualizadas.
            Informações como nome, endereço, número de telefone e endereço de email podem ser atualizadas.
            <br><br>
            Após fazer as alterações necessárias, clique no botão 'Salvar' para garantir que suas informações sejam atualizadas.
            Se você encontrar algum problema ao tentar atualizar suas informações, entre em contato com o suporte ao cliente para obter ajuda.
            <br><br>
            Manter suas informações pessoais atualizadas é importante para garantir que você receba todas as comunicações importantes
            da plataforma e para que suas informações de contato sejam precisas em caso de necessidade.
          `
        },
        {
          header: "Como cancelar minha assinatura?",
          content: `
            Para cancelar sua assinatura, acesse as configurações da sua conta e selecione 'Cancelar assinatura'.
            Siga os passos para confirmar. Você pode ser solicitado a fornecer um motivo para o cancelamento e a confirmar a ação.
            <br><br>
            Após o cancelamento, você receberá uma confirmação por email. Se você tiver pagado por um período de assinatura,
            sua assinatura permanecerá ativa até o final do período pago, após o qual ela não será renovada.
            <br><br>
            Caso encontre dificuldades ao cancelar sua assinatura, entre em contato com o suporte ao cliente para obter assistência.
            Lembre-se de que, após cancelar sua assinatura, você perderá acesso a todos os benefícios e recursos exclusivos de assinantes.
          `
        }
      ],
      filteredTabs: [],
      activeAccordionIndex: null,
      tituloCompleto: "Encontre o espaço perfeito para seus eventos e reuniões",
      tituloAnimado: "",
      typingSpeed: 75, // Velocidade de digitação em milissegundos
    };
  },
  methods: {
    handleCardClick(index) {
      this.activeAccordionIndex = index;
    },
    handleSearch(query) {
      if (query) {
        this.filteredTabs = this.tabs.map((tab, index) => {
          let header = tab.header;
          let content = tab.content;
          const regex = new RegExp(`(${query})`, 'gi');

          if (regex.test(header) || regex.test(content)) {
            if (regex.test(content)) {
              content = content.replace(regex, '<mark>$1</mark>');
            }
            if (regex.test(header)) {
              header = header.replace(regex, '<mark>$1</mark>');
            }
            return {
              header,
              content,
              index
            };
          }
          return null;
        }).filter(tab => tab !== null);

        if (this.filteredTabs.length > 0) {
          this.activeAccordionIndex = this.filteredTabs[0].index;
        }
      } else {
        this.filteredTabs = this.tabs;
        this.activeAccordionIndex = null;
      }
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
    this.filteredTabs = this.tabs; // Inicializa com todos os tabs
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
  background: linear-gradient(to right, #1AA3E5, #2575fc);
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

.support-search, .support-content, .support-featured, .support-feedback, .support-news {
  padding: 20px;
}

.titles-primary {
  margin-top: 15px !important;
  font-size: 28px;
  margin-bottom: 20px;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
