<script setup lang="ts">
import { onMounted } from 'vue';
import { ref, reactive } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';

type Post = {
  text: string,
  timestamp: number,
  embed: boolean,
  r18: boolean
};

const posts = ref([] as Post[])

onMounted(() => {
  getPosts((data:any) => {
    Object.keys(data).forEach(e=>{
      posts.value.push(data[e]);
    })
    posts.value.sort((a,b) => b.timestamp - a.timestamp);
    posts.value = posts.value.filter(e=>e.embed && !e.r18)
  })
  setTimeout(() => {
    let tweetScript = document.createElement('script')
    tweetScript.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    tweetScript.setAttribute('async', 'true')
    document.head.appendChild(tweetScript)
  }, 200)
})
</script>

<template>
  <main>
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