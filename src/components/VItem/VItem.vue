<script setup>
import VCheckbox from '@/components/VCheckbox/VCheckbox.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
const emits = defineEmits(['change'])
const changeCompleted = (e) => {
  emits('change', props.item, e)
}
</script>

<template>
  <div class="item">
    <div class="item-title">{{ item.title }}</div>
    <div class="item-actions">
      <VCheckbox
        :value="item.completed"
        @change="changeCompleted"
        title="Статус"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'VItem';
</style>
