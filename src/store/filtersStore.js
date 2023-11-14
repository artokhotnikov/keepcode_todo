import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFiltersStore = defineStore('filtersStore', () => {
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

  const setFilter = (value) => {
    activeFilter.value = value
  }

  const filteredFilters = computed(() =>
    filters.filter((item) => item.id !== activeFilter.value.id)
  )

  return {
    filteredFilters,
    activeFilter,
    setFilter,
  }
})
