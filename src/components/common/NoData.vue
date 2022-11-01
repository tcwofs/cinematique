<script setup>
import { mdiDatabaseSearchOutline } from '@mdi/js';
import Icon from './Icon.vue';
</script>

<template>
  <div class="flex flex-col">
    <Icon v-bind="$attrs" class="mx-auto" :d="mdiDatabaseSearchOutline" />
    <span class="mx-auto">no data</span>
  </div>
</template>
