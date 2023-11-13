<script setup>
import VCheckbox from '@/components/VCheckbox/VCheckbox.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="item">
    <div class="item-title">{{ item.title }}</div>
    <div class="item-actions">
      <VCheckbox v-model="item.completed" title="Статус" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'VItem';
</style>
