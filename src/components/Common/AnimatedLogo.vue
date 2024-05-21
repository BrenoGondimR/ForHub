<template>
  <img style="width: 500px;margin: auto;display: flex;" v-if="showLogo" src="@/assets/img/animatedlogo.svg" alt="Animated Logo" />
</template>

<script>
export default {
  props: {
    showLogo: {
      type: Boolean,
      required: true,
      default: true
    },
  },
  data() {
    return {

    };
  },
  mounted() {

  },
};
</script>

<style scoped>
.animated-logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
