<script setup>
import { useOpen } from '@/utils/useOpen.js'
import { computed, ref } from 'vue'

const { isOpen, toggle, close } = useOpen()

const filters = [
  {
    id: 1,
    title: 'Без фильтра',
    value: null,
  },
  {
    id: 2,
    title: 'Выполненные',
    value: true,
  },
  {
    id: 3,
    title: 'Не выполненные',
    value: false,
  },
]

const activeFilter = ref(filters[0])
const filteredFilters = computed(() =>
  filters.filter((item) => item.id !== activeFilter.value.id)
)
const setFilter = (value) => {
  activeFilter.value = value
  close()
}
</script>

<template>
  <div class="filter">
    <div @click.stop="toggle" :class="['filter-btn', { active: isOpen }]">
      {{ activeFilter.title }}
    </div>
    <transition name="slide">
      <div v-if="isOpen" :class="['filter-list', { active: isOpen }]">
        <div
          v-for="item in filteredFilters"
          @click="setFilter(item)"
          :key="item.id"
          class="filter-item"
        >
          {{ item.title }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import 'VFilter';
</style>
