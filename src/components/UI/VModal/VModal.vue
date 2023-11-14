<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emits('update:modelValue', false)
  emits('close')
}
</script>

<template>
  <div @click="close" @keydown.esc="close" class="modal" tabindex="0">
    <div @click.stop class="modal-body">
      <div class="modal-title">
        <slot name="title"></slot>
      </div>
      <div class="modal-content">
        <slot name="default"></slot>
      </div>
      <div class="modal-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './VModal';
</style>
