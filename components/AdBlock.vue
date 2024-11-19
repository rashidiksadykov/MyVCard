<template>
  <div class="ad-block" v-html="advertCode">
  

  
  </div>
</template>

<script>
export default {
  props: {
    advertCode: {
      type: String,
      required: true, // Передаваемый HTML-код обязателен
    },
  },
};
</script>

<style scoped>
.ad-block {
  margin: 10px 0;
}
</style>
