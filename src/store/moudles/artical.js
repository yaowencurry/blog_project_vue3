import { setLocalstorage, getLocalstorage } from '../../utils/localstorage'


const state = {
  articalList: getLocalstorage('articalList') || [],
  isAdmin: getLocalstorage('isAdmin') || '0'
}

const getters = {
  articalList (state) {
    return state.articalList
  },
  isAdmin (state) {
    return state.isAdmin
  }
}

const mutations = {
  SAVE_ARTICAL (state, item) {
    state.articalList.push(item);
    setLocalstorage('articalList', state.articalList);
  },
  SAVE_IS_ADMIN (state, sts) {
    console.log(sts)
    state.isAdmin = sts;
    setLocalstorage('isAdmin', sts);
  }
}

export default {
  state,
  getters,
  mutations
}
