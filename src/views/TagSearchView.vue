<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { ref, reactive } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';

type Post = {
  text: string,
  timestamp: number,
  embed: boolean,
  r18: boolean,
  tags: string[]
};

const posts = ref([] as Post[])
const route = useRoute()
const tag = route.params.tag

onMounted(() => {
  getPosts((data:any) => {
    Object.keys(data).forEach(e=>{
      posts.value.push(data[e]);
    })
    posts.value.sort((a,b) => b.timestamp - a.timestamp);
    posts.value = posts.value.filter(e=>!e.embed&&e.tags&&e.tags.find(t=>t===tag))
  })
})

watch(route, (n,p) => {
  location.reload();
})
</script>

<template>
  <main>
    <div v-for="post in posts">
      <p class="text">{{ post.text }}</p>
      <p class="info">
        <span class="date">{{ new Date(post.timestamp).toLocaleString() }}</span>
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
  margin: 3px;
}
</style>