import { ref } from 'vue'

export const useFetching = (cb) => {
  const isLoading = ref(false)
  const error = ref('')

  const fetching = async (args) => {
    try {
      isLoading.value = true
      return await cb(args)
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }
  return {
    isLoading,
    error,
    fetching,
  }
}
