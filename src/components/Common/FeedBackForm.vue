<template>
  <div class="p-fluid" style="max-width: 950px !important; margin: auto !important;">
    <div class="flex flex-column gap-2">
      <label for="username" style="text-align: left;">Nome</label>
      <InputText id="username" v-model="name" aria-describedby="username-help" />
    </div>
    <div class="flex flex-column gap-2">
      <label for="email" style="text-align: left;">Email</label>
      <InputText id="email" v-model="email" />
    </div>
    <FloatLabel style="margin-top: 20px; margin-bottom: 15px;">
      <Textarea v-model="feedback" rows="5" cols="30" />
      <label>Texto</label>
    </FloatLabel>
    <b-button class="button-dados" type="submit" variant="success" @click="submitFeedback"  block style="width: 100%">Enviar</b-button>
  </div>
</template>

<script>


export default {
  name: 'FeedbackForm',
  components: {

  },
  data() {
    return {
      name: '',
      email: '',
      feedback: '',
    };
  },
  methods: {
    submitFeedback() {
      // Adicione aqui a lógica para enviar o feedback
      console.log('Feedback enviado:', this.name, this.email, this.feedback);
      this.name = '';
      this.email = '';
      this.feedback = '';
    },
  },
};
</script>

<style scoped>
.feedback-card {
  margin: auto;
  max-width: 600px;
}

.titles-primary {
  font-size: 24px;
  margin-bottom: 1rem;
}

.p-field {
  margin-bottom: 1rem;
}
</style>
