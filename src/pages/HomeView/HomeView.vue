<script setup>
import { useStateStore } from '@/store/stateStore.js'
import VList from '@/components/VList/VList.vue'
import VItem from '@/components/VItem/VItem.vue'

const stateStore = useStateStore()

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
              :key="item.id"
            />
          </TransitionGroup>
        </VList>
        <VList title="Выполненные задачи">
          <TransitionGroup name="slide">
            <VItem
              v-for="item in stateStore.completedTodos"
              :item="item"
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
