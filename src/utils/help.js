import { ref } from 'vue'

export function createSearch () {
  const condition = ref('');

  const handleSearch = (callback) => {
    callback(condition.value)
  }

  return {
    condition,
    handleSearch
  }
}