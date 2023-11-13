import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFetching } from '@/utils/useFetching.js'
import { useLocalStore } from '@/utils/useLocalStore.js'

export const useStateStore = defineStore('stateStore', () => {
  const { getLocalItem, setLocalItem } = useLocalStore()
  const todosList = ref([])
  const page = ref(1)
  const limit = ref(10)

  const completedTodos = computed(() =>
    todosList.value.filter((item) => item.completed)
  )
  const uncompletedTodos = computed(() =>
    todosList.value.filter((item) => !item.completed)
  )

  const { fetching: fetchTodos } = useFetching(() => {
    const localTodos = getLocalItem('todos')
    if (localTodos) {
      todosList.value = localTodos
    } else {
      fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page.value}&_limit=${limit.value}`
      )
        .then((r) => r.json())
        .then((data) => {
          todosList.value = data
          setLocalItem('todos', data)
        })
        .catch((e) => {
          throw e
        })
    }
  })
  return {
    todosList,
    completedTodos,
    uncompletedTodos,
    fetchTodos,
  }
})
