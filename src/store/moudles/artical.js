import { setLocalstorage, getLocalstorage } from '../../utils/localstorage'


const state = {
  articalList: getLocalstorage('articalList') || []
}

const getters = {
  articalList (state) {
    return state.articalList
  }
}

const mutations = {
  SAVE_ARTICAL (state, item) {
    state.articalList.push(item);
    setLocalstorage('articalList', state.articalList);
  }
}

export default {
  state,
  getters,
  mutations
}
