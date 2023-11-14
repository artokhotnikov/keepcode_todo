<script setup>
defineProps({
  color: {
    default: 'primary',
  },
  md: {
    type: Boolean,
  },
})

const emits = defineEmits(['click'])
</script>

<template>
  <button :class="['btn', color, { md: md }]" @click="emits('click')" v-ripple>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import 'VBtn';
</style>
