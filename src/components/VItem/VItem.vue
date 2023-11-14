<script setup>
import VCheckbox from '@/components/UI/VCheckbox/VCheckbox.vue'
import VBtn from '@/components/UI/VBtn/VBtn.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emits = defineEmits(['change', 'edit', 'delete'])

const changeCompleted = (e) => {
  emits('change', props.item, e)
}

const clickDelete = () => {
  emits('delete', props.item)
}

const clickEdit = () => {
  emits('edit', props.item)
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
        class="item-checkbox"
      />
      <VBtn @click="clickEdit" color="yellow">Редактировать</VBtn>
      <VBtn @click="clickDelete" color="red">Удалить</VBtn>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'VItem';
</style>
