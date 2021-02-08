import { createStore } from 'vuex'
import artical from './moudles/artical'

const modules = {
  artical,
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
