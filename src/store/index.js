import { createStore } from 'vuex'
import artical from './moudles/artical'
import city from './moudles/city'

const modules = {
  artical,
  city
}

export default createStore({
  modules,
  state: {
    screeWidth: 0
  },
  mutations: {
    SAVE_SCREEWIDTH (state, width) {
      state.screeWidth = width
    }
  },
  actions: {
  },
  getters: {
    screeWidth (state) {
      return state.screeWidth
    }
  }
})
