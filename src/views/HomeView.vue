<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { ref, reactive } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';
import { fav } from '@/utils/firebase/write';
import { modText } from '@/utils/misc';

type Post = {
  text: string,
  timestamp: number,
  embed: boolean,
  r18: boolean,
  tags: string[],
  fav: number
};

type Fav = {
  id: number,
  fav: number
}

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

function clickStar(id: number){
  let f = favs.value.find(e=>e.id==id)
  fav(id, f.fav)
  f.fav += 1
}

watch(route, (n,p) => {
  location.reload();
})

</script>

<template>
  <main>
    <div v-for="post in posts">
      <p class="text"><div v-html="modText(post.text)"></div></p>
      <p class="info">
        <span class="date">{{ new Date(post.timestamp).toLocaleString() }}</span>
        <span class="fav" @click="clickStar(post.timestamp)">★{{ favs.find(e=>e.id==post.timestamp).fav }}</span>
        <span class="tag" v-for="tag in post.tags"><RouterLink :to="{name:'TagSearch',params:{tag:tag}}">{{ tag }}</RouterLink></span>
      </p>
    </div>
    <nav>
      <RouterLink class="page_link" v-for="n of pages+1" :to="{name:'home with page', params: {page: n-1}}" :key="n">
        <div v-if="page!=n-1">{{ n-1 }}</div>
      </RouterLink>
    </nav>
  </main>
</template>

<style scoped>
.text {
  font-size: large;
  white-space: pre-wrap;
}
.info {
  margin-left: 20px;
  font-size: small;
  font-style: italic;
}
.date{
  margin-right: 10px;
}
.tag{
  margin-left: 12px;
}
.page_link{
  margin-left: 4px;
}
</style>