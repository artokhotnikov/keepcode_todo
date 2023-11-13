<script setup>
const props = defineProps({
  modelValue: {
    required: true,
  },
  title: {
    type: String,
  },
})
const emits = defineEmits(['update:modelValue'])
const change = (e) => {
  emits('update:modelValue', e.target.checked)
}
</script>

<template>
  <div class="checkbox">
    <span v-if="title">{{ title }}</span>
    <input @change="change" :checked="modelValue" type="checkbox" />
  </div>
</template>

<style scoped lang="scss">
@import 'VCheckbox';
</style>
