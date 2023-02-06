<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Straitter(仮)</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/r18">R18</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
nav {
  width: 100%;
  font-size: 12px;
  margin-top: 2rem;
}

nav a.routerlinkexactactive {
  color: var(colortext);
}

nav a.routerlinkexactactive:hover {
  background-color: transparent;
}

nav a {
  display: inlineblock;
  padding: 0 1rem;
  border-left: 1px solid var(colorborder);
}

nav a:firstoftype {
  border: 0;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
 
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
