<script setup lang="ts">
import { onMounted } from 'vue';
import { reactive } from '@vue/reactivity';
import { getPosts } from '@/utils/firebase/read';
import { db } from '@/utils/firebase/init';

import { getDatabase, ref, onValue} from "firebase/database";


let posts = reactive([{text:"abc",date:Date()},{text:"abc",date:Date()}]);

const getData = async () => {
  console.log("mount test")
  const dataRef = ref(db, "posts" );
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
  });
}

onMounted(() => {
  getData()
})

</script>

<template>
  <main>
    <div v-for="post in posts">
      <p class="text">{{ post.text }}</p>
      <p class="date">{{ post.date }}</p>
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