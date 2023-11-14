<script setup>
import { ref } from 'vue'
import { useOpen } from '@/utils/useOpen.js'
import { useStateStore } from '@/store/stateStore.js'
import VFilter from '@/components/UI/VFilter/VFilter.vue'
import VInput from '@/components/UI/VInput/VInput.vue'
import VBtn from '@/components/UI/VBtn/VBtn.vue'
import VModal from '@/components/UI/VModal/VModal.vue'

const stateStore = useStateStore()
const { isOpen, toggle, close } = useOpen()
const input = ref(null)

const openModal = () => {
  toggle()
  setTimeout(() => {
    input.value.input.focus()
  }, 300)
}

const createTodo = () => {
  stateStore.createTodo()
  close()
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <VFilter />
        <VBtn @click="openModal" md>Создать</VBtn>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <VModal v-model="isOpen" v-if="isOpen">
          <template #title>Создать задачу</template>
          <template #default>
            <VInput
              v-model="stateStore.newTodo.title"
              @keydown.enter="createTodo"
              ref="input"
              placeholder="Введите название"
            />
          </template>
          <template #actions>
            <VBtn @click="close" color="primary">Отмена</VBtn>
            <VBtn @click="createTodo" color="yellow">Создать</VBtn>
          </template>
        </VModal>
      </Transition>
    </Teleport>
  </footer>
</template>

<style scoped lang="scss">
@import 'VFooter';
</style>
