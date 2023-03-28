<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { ref } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';
import InfoView from '../components/InfoView.vue';
import { delayLoadTweetScript } from '@/utils/misc';

const route = useRoute()
const page = Number(route.params.page)
const posts = ref([] as Post[])
const loading = ref("loading...")
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
    posts.value = posts.value.filter(e=>e.embed && !e.r18&& e.text.match(/twitter/)).slice(page*10,page*10+10)
    if(posts.value.length==0){loading.value = "Tweetがありません。多分遡りすぎです。"}
  })
  delayLoadTweetScript()
})

watch(route, (n,p) => {
  location.reload();
})
</script>

<template>
  <main>
    <nav>
      <RouterLink :to="{name:'Tweets', params: {page: page-1} }" v-if="page>0">&lt;</RouterLink>
      <RouterLink :to="{name:'Tweets', params: {page: page+1} }" >&gt;</RouterLink>
    </nav>
    <div v-if="posts.length==0">
      {{ loading }}
    </div>
    <div v-for="post in posts">
      <div v-html="post.text"></div>
      <InfoView :post="post" :fav="favs.find(e=>e.id==post.timestamp)??{id:0,fav:0}" />
    </div>
  </main>
</template>