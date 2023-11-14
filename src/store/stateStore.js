import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as makeUUID } from 'uuid'
import { useFetching } from '@/utils/useFetching.js'
import { useLocalStore } from '@/utils/useLocalStore.js'

export const useStateStore = defineStore('stateStore', () => {
  const { getLocalItem, setLocalItem } = useLocalStore()
  const todosList = ref([])
  const page = ref(1)
  const limit = ref(10)
  const newTodo = ref({
    title: '',
    completed: false,
  })

  const createTodo = () => {
    todosList.value = [...todosList.value, { ...newTodo.value, id: makeUUID() }]
    newTodo.value = {
      title: '',
      completed: false,
    }
    setLocalItem('todos', todosList.value)
  }

  const deleteTodo = (item) => {
    todosList.value = todosList.value.filter((todo) => todo.id !== item.id)
    setLocalItem('todos', todosList.value)
  }

  const editTodo = (item) => {
    todosList.value = todosList.value.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, title: item.title }
      } else {
        return todo
      }
    })
    setLocalItem('todos', todosList.value)
  }

  const changeCompleted = (item, value) => {
    todosList.value = todosList.value.map((todo) => {
      if (todo.id === item.id) {
        return { ...todo, completed: value }
      } else {
        return todo
      }
    })
    setLocalItem('todos', todosList.value)
  }

  const { fetching: fetchTodos } = useFetching(() => {
    const localTodos = getLocalItem('todos')
    if (localTodos && localTodos.length) {
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

  const completedTodos = computed(() =>
    todosList.value.filter((item) => item.completed)
  )

  const uncompletedTodos = computed(() =>
    todosList.value.filter((item) => !item.completed)
  )

  return {
    todosList,
    completedTodos,
    uncompletedTodos,
    newTodo,
    fetchTodos,
    createTodo,
    deleteTodo,
    editTodo,
    changeCompleted,
  }
})
