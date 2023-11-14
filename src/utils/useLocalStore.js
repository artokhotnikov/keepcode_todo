export const useLocalStore = () => {
  const getLocalItem = (key) => {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    } else {
      return null
    }
  }

  const setLocalItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  return {
    getLocalItem,
    setLocalItem,
  }
}
