<script setup>
import { mdiMovieRoll } from '@mdi/js';
import Icon from './Icon.vue';
</script>

<template>
  <div class="flex flex-col">
    <Icon
      v-bind="$attributes"
      class="animate-spin w-16 h-16 mx-auto"
      :d="mdiMovieRoll"
    />
    <span>Loading...</span>
  </div>
</template>
