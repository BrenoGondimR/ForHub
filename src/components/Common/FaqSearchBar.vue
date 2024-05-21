<template>
  <div class="faq-search-bar">
    <b-form-input
      v-model="searchQuery"
      :placeholder="placeholder"
      @input="onSearch"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  name: 'FaqSearchBar',
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
}
</style>