<script setup lang="ts">
import { onMounted } from 'vue';
import { ref, reactive } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';

type Post = {
  text: string,
  timestamp: number
};

const posts = ref([] as Post[])

onMounted(() => {
  //setData("test");
  getPosts((data:any) => {
    Object.keys(data).forEach(e=>{
      posts.value.push(data[e]);
    })
    posts.value.sort((a,b) => b.timestamp - a.timestamp);
  })
})

</script>

<template>
  <main>
    <div v-for="post in posts">
      <p class="text">{{ post.text }}</p>
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
  font-size: small;
}
</style>