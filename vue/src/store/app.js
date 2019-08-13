import { getSwaggerConfig, saveSwaggerConfig } from '../utils/store'

const state = {
  swaggerConfig: getSwaggerConfig() // swagger配置
}

const mutations = {
  updateState (state, payload) {
    Object.keys(payload).forEach(key => {
      state[key] = payload
    })
  },
  addSwaggerConfig (state, data) {
    state.swaggerConfig.push(data)
    saveSwaggerConfig(state.swaggerConfig)
  }
}

const actions = {
}

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
}
