<script setup>
import { computed, ref } from 'vue'
import { useStateStore } from '@/store/stateStore.js'
import { useFiltersStore } from '@/store/filtersStore.js'
import { useOpen } from '@/utils/useOpen.js'
import VList from '@/components/VList/VList.vue'
import VItem from '@/components/VItem/VItem.vue'
import VModal from '@/components/UI/VModal/VModal.vue'
import VBtn from '@/components/UI/VBtn/VBtn.vue'
import VInput from '@/components/UI/VInput/VInput.vue'

const stateStore = useStateStore()
const filtersStore = useFiltersStore()
const { isOpen, toggle, close } = useOpen()
const input = ref(null)
const editItem = ref(null)

const changeCompleted = (item, value) => {
  stateStore.changeCompleted(item, value)
}

const deleteTodo = (item) => {
  stateStore.deleteTodo(item)
}

const editTodo = (item) => {
  editItem.value = item
  openModal()
}

const confirmEditTodo = () => {
  stateStore.editTodo(editItem.value)
  closeModal()
}

const openModal = () => {
  toggle()
  setTimeout(() => {
    input.value.input.focus()
  }, 300)
}

const closeModal = () => {
  close()
  editItem.value = null
}

const showUncompletedTodos = computed(
  () =>
    (Boolean(stateStore.uncompletedTodos.length) &&
      filtersStore.activeFilter.value === null) ||
    filtersStore.activeFilter.value === false
)

const showCompletedTodos = computed(
  () =>
    (Boolean(stateStore.completedTodos.length) &&
      filtersStore.activeFilter.value === null) ||
    filtersStore.activeFilter.value === true
)

stateStore.fetchTodos()
</script>
<template>
  <div class="page">
    <div class="container">
      <div class="page-content">
        <VList>
          <Transition name="slide">
            <div v-if="showUncompletedTodos" class="list-content">
              <div class="list-title">Невыполненные задачи</div>
              <TransitionGroup name="slide">
                <VItem
                  v-for="item in stateStore.uncompletedTodos"
                  :item="item"
                  @change="changeCompleted"
                  @edit="editTodo"
                  @delete="deleteTodo"
                  :key="item.id"
                />
              </TransitionGroup>
            </div>
          </Transition>
          <Transition name="slide">
            <div v-if="showCompletedTodos" class="list-content">
              <div class="list-title">Выполненные задачи</div>
              <TransitionGroup name="slide">
                <VItem
                  v-for="item in stateStore.completedTodos"
                  :item="item"
                  @change="changeCompleted"
                  @edit="editTodo"
                  @delete="deleteTodo"
                  :key="item.id"
                />
              </TransitionGroup>
            </div>
          </Transition>
        </VList>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <VModal v-model="isOpen" v-if="isOpen">
          <template #title>Редактировать задачу</template>
          <template #default>
            <VInput
              v-model="editItem.title"
              @keydown.enter="confirmEditTodo"
              ref="input"
              placeholder="Введите название"
            />
          </template>
          <template #actions>
            <VBtn @click="closeModal" color="primary">Отмена</VBtn>
            <VBtn @click="confirmEditTodo" color="yellow">Сохранить</VBtn>
          </template>
        </VModal>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
@import 'HomeView';
</style>
