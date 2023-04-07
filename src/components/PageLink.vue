<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  jump_to: {
    type: String,
    required: true
  }
})

</script>

<template>
<nav>
    <RouterLink class="page_link" v-for="n of max+1" :to="{name:jump_to, params: {page: n-1}}" :key="n">
      <span v-if="page!=n-1">{{ n-1 }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.page_link{
  margin-left: 4px;
}
</style>