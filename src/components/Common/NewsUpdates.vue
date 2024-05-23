<template>
  <Card class="news-card">
    <template #title>
      <h2 class="titles-primary">Notícias e Atualizações</h2>
    </template>
    <template #content>
      <ul class="news-list">
        <li v-for="(news, index) in newsList" :key="index">
          <h3>{{ news.title }}</h3>
          <p>{{ news.content }}</p>
        </li>
      </ul>
    </template>
  </Card>
</template>

<script>
import { Card } from 'primevue/card';

export default {
  name: 'NewsUpdates',
  components: {
    Card,
  },
  data() {
    return {
      newsList: [
        { title: 'Atualização 1', content: 'Detalhes da atualização 1...' },
        { title: 'Atualização 2', content: 'Detalhes da atualização 2...' },
        { title: 'Atualização 3', content: 'Detalhes da atualização 3...' },
      ],
    };
  },
};
</script>

<style scoped>
.news-card {
  margin: auto;
  max-width: 800px;
}

.titles-primary {
  font-size: 24px;
  margin-bottom: 1rem;
}

.news-list {
  list-style-type: none;
  padding: 0;
}

.news-list li {
  margin-bottom: 1.5rem;
}

.news-list h3 {
  margin: 0;
  font-size: 20px;
}

.news-list p {
  margin: 0.5rem 0 0;
}
</style>
