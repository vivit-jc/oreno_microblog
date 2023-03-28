<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';
import InfoView from '../components/InfoView.vue';

const posts = ref([] as Post[])
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
    posts.value = posts.value.filter(e=>e.embed && !e.r18 && e.text.match(/youtube/))
  })
})
</script>

<template>
  <main>
    <div v-for="post in posts">
      <div v-html="post.text"></div>
      <InfoView :post="post" :fav="favs.find(e=>e.id==post.timestamp)??{id:0,fav:0}" />
    </div>
  </main>
</template>

<style scoped>

</style>