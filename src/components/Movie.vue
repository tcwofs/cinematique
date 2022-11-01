<script setup>
import { RouterLink } from 'vue-router';

const movie = defineProps({
  name: { type: String, required: true },
  id: { type: [Number, String], required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
});
</script>

<template>
  <RouterLink
    :to="`/movie/${movie.id}`"
    class="card shadow-xl image-full rounded-none group transition-all before:transition-all duration-1000 hover:before:!bg-opacity-80 md:before:!bg-opacity-0 before:!bg-opacity-80"
  >
    <figure>
      <img
        :src="movie.image"
        class="w-full group-hover:scale-110 transition-transform delay-150 duration-500"
        :alt="`${movie.name} poster`"
      />
    </figure>
    <div
      class="card-body group-hover:opacity-100 md:opacity-0 transition-opacity"
    >
      <h2 class="card-title" v-html="movie.name"></h2>
      <div
        v-if="movie.description"
        class="relative h-full w-full md:opacity-100 opacity-0 group-hover:opacity-100"
      >
        <div
          class="absolute inset-x-0 inset-y-2 overflow-auto"
          v-html="movie.description"
        ></div>
      </div>

      <div class="card-actions justify-end mb-0 mt-auto">
        <RouterLink
          class="btn btn-primary lowercase"
          :to="`/movie/${movie.id}`"
        >
          Select
        </RouterLink>
      </div>
    </div>
  </RouterLink>
</template>
