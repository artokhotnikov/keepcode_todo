<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    required: true,
  },
  placeholder: {
    required: false,
  },
})

const emits = defineEmits(['update:modelValue', 'input'])

const input = ref(null)

defineExpose({
  input,
})

const onInput = (e) => {
  emits('update:modelValue', e.target.value)
  emits('input', e.target.value)
}
</script>

<template>
  <input
    ref="input"
    @input="onInput"
    :value="modelValue"
    :placeholder="placeholder"
  />
</template>

<style scoped lang="scss">
@import './VInput';
</style>
