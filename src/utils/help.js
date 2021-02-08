import { ref, reactive } from 'vue'
import $api from '../api/index'

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

export function articalListHelp () {
  const state = reactive({
    list:[]
  })
  
  const isLoging = ref(true)

  const getArticalList = async (obj) => {
    isLoging.value = true
    state.list = await $api.GET_ARTICAL_LIST(obj);
    isLoging.value = false
  }

  return {
    state,
    getArticalList,
    isLoging
  }
}