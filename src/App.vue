<script setup>
import { useRoute } from 'vue-router'
import VHeader from '@/components/VHeader/VHeader.vue'
import VFooter from '@/components/VFooter/VFooter.vue'

const route = useRoute()
</script>

<template>
  <main class="main">
    <VHeader />
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade-page" mode="out-in">
          <suspense>
            <component :is="Component" :key="route.fullPath"></component>
          </suspense>
        </transition>
      </template>
    </RouterView>
    <VFooter />
  </main>
</template>

<style scoped></style>
