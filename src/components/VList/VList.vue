<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="list">
    <div class="list-title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
@import 'VList';
</style>
