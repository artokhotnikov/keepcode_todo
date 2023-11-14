<script setup>
import { useOpen } from '@/utils/useOpen.js'
import { useFiltersStore } from '@/store/filtersStore.js'

const { isOpen, toggle, close } = useOpen()
const filtersStore = useFiltersStore()

const setFilter = (value) => {
  filtersStore.setFilter(value)
  close()
}
</script>

<template>
  <div v-click-outside="close" class="filter">
    <div @click.stop="toggle" :class="['filter-btn', { active: isOpen }]">
      {{ filtersStore.activeFilter.title }}
    </div>
    <transition name="slide">
      <div v-if="isOpen" :class="['filter-list', { active: isOpen }]">
        <div
          v-for="item in filtersStore.filteredFilters"
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
