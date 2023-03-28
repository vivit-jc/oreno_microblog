<script setup lang="ts">
import type { PropType } from 'vue';
import { onMounted } from 'vue';
import { ref } from '@vue/reactivity';
import { RouterLink } from 'vue-router';
import { setFav } from "@/utils/firebase/write"

let temp_fav = ref(0)

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    required: true
  },
  fav: {
    type: Object as PropType<Fav>,
    required: true
  }
})

onMounted(() => {
  temp_fav.value = props.fav.fav
})

function clickStar(fav: Fav){
  temp_fav.value += 1
  setFav(fav.id, temp_fav.value)
}
</script>

<template>
    <p class="info">
    <span class="date">{{ new Date(post.timestamp).toLocaleString() }}</span>
    <span class="fav" @click="clickStar(fav)">★{{ temp_fav }}</span>
    <span class="tag" v-for="tag in post.tags">
        <RouterLink :to="{name:'TagSearch',params:{tag:tag}}">{{ tag }}</RouterLink>
    </span>
    </p>
</template>