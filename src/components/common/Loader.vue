<script setup>
import { mdiMovieRoll } from '@mdi/js';
import Icon from './Icon.vue';
</script>

<template>
  <div class="flex flex-col">
    <Icon v-bind="$attrs" class="animate-spin mx-auto" :d="mdiMovieRoll" />
    <span class="mx-auto">loading...</span>
  </div>
</template>
