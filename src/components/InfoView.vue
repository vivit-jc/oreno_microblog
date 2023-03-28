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
    <span class="fav animoBorderMarker" @click="clickStar(fav)">★{{ temp_fav }}</span>
    <span class="tag" v-for="tag in post.tags">
        <RouterLink :to="{name:'TagSearch',params:{tag:tag}}">{{ tag }}</RouterLink>
    </span>
    </p>
</template>

<style scoped>

.animoBorderMarker{
  display:inline-block;
  position:relative;
  cursor:pointer
}
.animoBorderMarker::after{
  content:'';
  position:absolute;
  z-index:-1;
  top:85%;
  left:-.1px;
  right:-.1px;
  bottom:0;
  transition:top .1s ease-in-out;
  background-color:rgba(243,156,18,.8)
}
.animoBorderMarker:hover::after{top:0}
        
</style>