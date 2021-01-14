export default {
  name: 'city',
  namespaced: true,
  state: {
    cityName: ''
  },
  getters: {
    getState (state) {
      return state
    }
  },
  mutations: {
    changeCity (state, cityName) {
      state.cityName = cityName
    }
  }
}
