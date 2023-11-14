<script setup>
defineProps({
  title: {
    type: String,
  },
  value: {
    required: true,
  },
})

const emits = defineEmits(['change'])

const change = (e) => {
  emits('change', e.target.checked)
}
</script>

<template>
  <div class="checkbox">
    <span v-if="title">{{ title }}</span>
    <input @change="change" :checked="value" type="checkbox" />
  </div>
</template>

<style scoped lang="scss">
@import 'VCheckbox';
</style>
