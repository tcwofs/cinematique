<script setup>
const props = defineProps({
  d: { type: String, required: true },
  viewBox: { type: String, default: '0 0 24 24' },
  size: { type: [Number, String], default: 6 },
});
</script>

<template>
  <svg
    :class="`h-${props.size} w-${props.size}`"
    aria-hidden="true"
    :viewBox="viewBox"
  >
    <path fill="currentColor" :d="props.d" />
  </svg>
</template>
