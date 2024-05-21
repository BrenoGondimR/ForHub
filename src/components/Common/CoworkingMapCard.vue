<template>
  <Card style="width: 20rem; overflow: hidden">
    <template #header>
      <Galleria :value="images" :numVisible="5" containerStyle="max-width: 640px"
                :showThumbnails="false" :showIndicators="true" :changeItemOnIndicatorHover="true">
        <template #item="slotProps">
          <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block; max-height: 200px;" />
        </template>
      </Galleria>
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle><Rating v-model="rating" readonly :cancel="false" /></template>
    <template #content>
      <p class="m-0">
        {{ description }}
      </p>
      <p class="m-0" style="font-weight: 600;">
        {{ price }}
      </p>
    </template>
  </Card>
</template>

<script>
export default {
  name: "CoworkingMapCard",
  props: {
    title: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    ratingValue: {
      type: Number,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rating: this.ratingValue,
    };
  },
  methods: {
    updateRatingValue(newValue) {
      this.rating = newValue;
      this.$emit('update:ratingValue', newValue);
    }
  }
}
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
