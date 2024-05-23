<template>
  <div class="faq-search-bar">
    <IconField iconPosition="left">
      <InputIcon class="pi pi-search"></InputIcon>
      <InputText v-model="searchQuery" :placeholder="placeholder" @input="onSearch" />
    </IconField>
  </div>
</template>

<script>

export default {
  name: 'FaqSearchBar',
  components: {

  },
  props: {
    placeholder: {
      type: String,
      default: 'Pesquisar...'
    }
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>

<style scoped>
.faq-search-bar {
  margin-bottom: 1rem;
  width: 100%;
}
.p-inputtext {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  width: 100%;
}
.p-inputtext-icon {
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
</style>
