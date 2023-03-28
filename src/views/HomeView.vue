<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { ref } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';
import { modText } from '@/utils/misc';
import InfoView from '../components/InfoView.vue';

let posts = ref([] as Post[])
const route = useRoute()
let page = Number(route.params.page)
let pages = 0
let favs = ref([] as Fav[])

onMounted(() => {
  if(Number.isNaN(page)){
    page = 0
  }
  getPosts((data:any) => {
    Object.keys(data).forEach(e=>{
      if(typeof data[e].fav != "number"){
        data[e].fav = 0
      } 
      posts.value.push(data[e]);
      favs.value.push({id: data[e].timestamp, fav: data[e].fav})
    })
    posts.value.sort((a,b) => b.timestamp - a.timestamp);
    posts.value = posts.value.filter(e=>!e.embed)
    pages = Math.floor(posts.value.length/100)
    posts.value = posts.value.slice(page*100,page*100+100)
  })
})

watch(route, (n,p) => {
  location.reload();
})

</script>

<template>
  <main>
    <div v-for="post in posts">
      <p class="text"><div v-html="modText(post.text)"></div></p>
      <InfoView :post="post" :fav="favs.find(e=>e.id==post.timestamp)??{id:0,fav:0}" />
    </div>
    <nav>
      <RouterLink class="page_link" v-for="n of pages+1" :to="{name:'home with page', params: {page: n-1}}" :key="n">
        <span v-if="page!=n-1">{{ n-1 }}</span>
      </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
.text {
  font-size: large;
  white-space: pre-wrap;
}
.page_link{
  margin-left: 4px;
}
</style>