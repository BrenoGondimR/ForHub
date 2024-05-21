<template>
  <div class="reviews-section">
    <div class="average-rating">
      <h2>Avaliações</h2>
      <div class="rating-score">
        <span class="score">{{ averageRating }}</span>
        <span class="stars">
          <span v-for="star in 5" :key="star" class="star">&#9733;</span>
        </span>
        <div class="total-ratings">{{ totalRatings }} avaliações</div>
      </div>
    </div>
    <div class="rating-distribution">
      <div class="rating-bar" v-for="(count, index) in ratingDistribution" :key="index">
        <div class="bar-label">{{ 5 - index }}.0</div>
        <div class="bar">
          <div class="bar-fill" :style="{ width: (count / totalRatings * 100) + '%' }"></div>
        </div>
        <div class="bar-count">{{ count }} avaliações</div>
      </div>
    </div>
    <div class="user-reviews">
      <h3>Comentários</h3>
      <div v-for="review in reviews" :key="review.id" class="user-review">
        <div class="user-info">
          <img :src="review.user.avatar" alt="User Avatar" class="user-avatar">
          <div>
            <div class="user-name">{{ review.user.name }}</div>
            <div class="review-date">{{ review.date }}</div>
          </div>
        </div>
        <div class="review-rating">
          <span v-for="star in review.rating" :key="star" class="star">&#9733;</span>
          <span v-for="star in 5 - review.rating" :key="star" class="star empty">&#9733;</span>
        </div>
        <div class="review-text">{{ review.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'CoworkingReviews',
  components: {

  },
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  data() {
    return {

    };
  },
  methods: {

  },
  computed: {
    averageRating() {
      const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      return (total / this.reviews.length).toFixed(1);
    },
    totalRatings() {
      return this.reviews.length;
    },
    ratingDistribution() {
      const distribution = [0, 0, 0, 0, 0];
      this.reviews.forEach(review => {
        distribution[5 - review.rating]++;
      });
      return distribution;
    }
  }
};
</script>

<style scoped>
.reviews-section {
  margin-top: 20px;
}



.average-rating {
  text-align: center;
  margin-bottom: 20px;
}

.rating-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}



.score {
  font-size: 3rem;
  font-weight: bold;
}

.stars {
  display: flex;
  font-size: 2rem;
  color: #eead2d;
}

.total-ratings {
  font-size: 1rem;
  color: #2e2e2e;
}

.rating-distribution {
  margin-bottom: 20px;
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
}

.bar-label {
  width: 30px;
  text-align: right;
  color: #2e2e2e;
}

.bar {
  flex: 1;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  height: 10px;
  position: relative;
}

.bar-fill {
  background: #eead2d;
  height: 100%;
}

.bar-count {
  width: 100px;
  text-align: left;
  color: #2e2e2e;
}

.user-reviews {
  margin-top: 30px;
}

.user-review {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: bold;
}

.review-date {
  font-size: 0.9rem;
  color: #808080;
}

.review-rating {
  display: flex;
  gap: 5px;
  font-size: 1.5rem;
  color: #eead2d;
}

.review-rating .empty {
  color: lightgray;
}

.review-text {
  margin-top: 10px;
}
</style>
