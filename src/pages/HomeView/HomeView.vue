<script setup>
import { useStateStore } from '@/store/stateStore.js'
import VList from '@/components/VList/VList.vue'
import VItem from '@/components/VItem/VItem.vue'
import { useLocalStore } from '@/utils/useLocalStore.js'

const stateStore = useStateStore()
const { setLocalItem } = useLocalStore()

const changeCompleted = (item, value) => {
  stateStore.todosList = stateStore.todosList.map((todo) => {
    if (todo.id === item.id) {
      return { ...todo, completed: value }
    } else {
      return todo
    }
  })
  setLocalItem('todos', stateStore.todosList)
}

stateStore.fetchTodos()
</script>
<template>
  <div class="page">
    <div class="container">
      <div class="page-content">
        <VList title="Невыполненные задачи">
          <TransitionGroup name="slide">
            <VItem
              v-for="item in stateStore.uncompletedTodos"
              :item="item"
              @change="changeCompleted"
              :key="item.id"
            />
          </TransitionGroup>
        </VList>
        <VList title="Выполненные задачи">
          <TransitionGroup name="slide">
            <VItem
              v-for="item in stateStore.completedTodos"
              :item="item"
              @change="changeCompleted"
              :key="item.id"
            />
          </TransitionGroup>
        </VList>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'HomeView';
</style>
