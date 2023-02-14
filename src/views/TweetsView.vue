<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { ref, reactive } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';

type Post = {
  text: string,
  timestamp: number,
  embed: boolean,
  r18: boolean
};

const route = useRoute()
const page = Number(route.params.page)
const posts = ref([] as Post[])
const loading = ref("loading...")

onMounted(() => {
  getPosts((data:any) => {
    Object.keys(data).forEach(e=>{
      posts.value.push(data[e]);
    })
    posts.value.sort((a,b) => b.timestamp - a.timestamp);
    posts.value = posts.value.filter(e=>e.embed && !e.r18&& e.text.match(/twitter/)).slice(page*10,page*10+10)
    if(posts.value.length==0){loading.value = "Tweetがありません。多分遡りすぎです。"}
  })
  setTimeout(() => {
    let tweetScript = document.createElement('script')
    tweetScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    tweetScript.setAttribute('async', 'true')
    document.head.appendChild(tweetScript)
  }, 500)
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
      <p class="date">{{ new Date(post.timestamp).toLocaleString() }}</p>
    </div>
  </main>
</template>

<style scoped>
.text {
  font-size: large;
  white-space: pre-wrap;
}
.date {
  margin-left: 20px;
  font-size: small;
  font-style: italic;
}
</style>