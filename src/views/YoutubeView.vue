<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getPosts } from '@/utils/firebase/read';
import InfoView from '../components/InfoView.vue';
import PageLink from '../components/PageLink.vue';

const route = useRoute()
const page = Number(route.params.page)
const at = 5 // 1ページあたりの表示数
let page_max = 0
const posts = ref([] as Post[])
let favs = ref([] as Fav[])
const loading = ref("loading...")

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
    page_max = Math.floor(posts.value.length/at)
    posts.value = posts.value.slice(page*at,page*at+at)
    if(posts.value.length==0){loading.value = "Tweetがありません。多分遡りすぎです。"}
  })
})

watch(route, () => {
  location.reload();
})
</script>

<template>
  <main>
    <PageLink :page="page" :max="page_max" jump_to="Youtube" />
    <div v-if="posts.length==0">
      {{ loading }}
    </div>
    <div v-for="(post,i) in posts" :key="i">
      <div v-html="post.text"></div>
      <InfoView :post="post" :fav="favs.find(e=>e.id==post.timestamp)??{id:0,fav:0}" />
    </div>
    <PageLink :page="page" :max="page_max" jump_to="Youtube" />
  </main>
</template>

<style scoped>

</style>