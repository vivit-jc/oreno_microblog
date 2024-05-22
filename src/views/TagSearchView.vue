<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getPosts } from '@/utils/firebase/read';
import { delayLoadTweetScript, modText } from '@/utils/misc';
import InfoView from '../components/InfoView.vue';

const posts = ref([] as Post[])
const route = useRoute()
const tag = route.params.tag
let favs = ref([] as Fav[])

onMounted(() => {
  getPosts((data:any) => {
    Object.keys(data).forEach(e=>{
      if(typeof data[e].fav != "number"){
        data[e].fav = 0
      } 
      posts.value.push(data[e]);
      favs.value.push({id: data[e].timestamp, fav: data[e].fav})
    })
    posts.value.sort((a,b) => b.timestamp - a.timestamp);
    posts.value = posts.value.filter(e=>e.tags&&e.tags.find(t=>t===tag))
  })
  delayLoadTweetScript()
})

watch(route, () => {
  location.reload();
})
</script>

<template>
  <main>
    <div v-for="(post,i) in posts" :key="i">
      <div class="text" v-html="modText(post.text)"></div>
      <InfoView :post="post" :fav="favs.find(e=>e.id==post.timestamp)??{id:0,fav:0}" />
    </div>
  </main>
</template>

<style scoped>
.text {
  font-size: large;
  white-space: pre-wrap;
}
</style>