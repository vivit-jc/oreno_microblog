<script setup lang="ts">
import { onMounted } from 'vue';
import { reactive } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';

const posts = reactive([])

onMounted(() => {
  //setData("test");
  let postarray: object[] = []
  getPosts((data: object) => {
    Object.keys(data).forEach(e=>{
      postarray.push(data[e]);
    })
    postarray.sort((a,b) => b.timestamp - a.timestamp);
    posts.values = postarray;
  })
})

</script>

<template>
  <main>
    <div v-for="post in posts.values">
      <p class="text">{{ post.text }}</p>
      <p class="date">{{ new Date(post.timestamp).toLocaleString() }}</p>
    </div>
  </main>
</template>

<style scoped>
.text {
  font-size: large;
}
.date {
  font-size: small;
}
</style>