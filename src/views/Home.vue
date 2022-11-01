<script setup>
import { mdiMovieRoll, mdiMovieSearchOutline } from '@mdi/js';
import HomeLink from '../components/Actions/Links/HomeLink.vue';

const links = [
  { to: '/movies', icon: mdiMovieSearchOutline, text: 'movies' },
  { to: '/sessions', icon: mdiMovieRoll, text: 'sessions' },
];
</script>

<template>
  <main
    class="h-full w-full p-7 flex flex-col gap-24 items-center justify-center"
  >
    <h1 class="text-5xl md:text-7xl lg:text-9xl">cinematique</h1>
    <div class="flex flex-col lg:flex-row items-center justify-center gap-7">
      <HomeLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :icon="link.icon"
        :text="link.text"
      />
    </div>
  </main>
</template>
