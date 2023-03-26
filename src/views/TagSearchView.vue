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
  tags: string[]
};

type Fav = {
  id: number,
  fav: number
}

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
})

function clickStar(id: number){
  let f = favs.value.find(e=>e.id==id)
  if(f==undefined){
    return false
  }
  fav(id, f.fav)
  f.fav += 1
}

function favcount(values: Fav[],id: number){
  const f = values.find(e=>e.id==id)
  if(f==undefined){return 0}
  return f.fav
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
        <span class="fav" @click="clickStar(post.timestamp)">★{{ favcount(favs,post.timestamp) }}</span>
        <span class="tag" v-for="tag in post.tags"><RouterLink :to="{name:'TagSearch',params:{tag:tag}}">{{ tag }}</RouterLink></span>
      </p>
    </div>
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
</style>