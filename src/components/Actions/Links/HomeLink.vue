<script setup>
import { RouterLink } from 'vue-router';
import Icon from '../../common/Icon.vue';

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, default: '' },
  text: { type: String, default: '' },
});
</script>

<template>
  <RouterLink
    :to="props.to"
    class="btn h-32 w-64 lg:w-96 lg:h-64 flex-shrink flex"
  >
    <span
      class="flex flex-col text-3xl font-normal text-base-100 my-auto lowercase"
    >
      <Icon
        v-if="props.icon"
        class="lg:w-24 lg:h-24 h-16 w-16 m-auto"
        :d="props.icon"
      />
      <span v-if="props.text">{{ props.text }}</span>
    </span>
  </RouterLink>
</template>
