import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  currentUser: {},
  users: [],
  logged: false,
  errors: null
}

const mutations = {
  LOGIN_USER (state, currentUser) {
    state.currentUser = currentUser
    state.logged = true
  },
  LOGOUT_USER (state) {
    state.currentUser = {}
    state.logged = false
  },
  UPDATE_AVATAR (state, avatar) {
    state.currentUser.avatar = avatar
  },
  UPDATE_PROFILE (state, profile) {
    state.currentUser = profile
  },
  SET_ERRORS (state, value) {
    state.errors = value
  },
  GET_ALL_USERS (state, users) {
    state.users = users
  },
  DELETE_USER (state, user) {
    state.users.$remove(user)
  },
  UPDATE_USER (state, users) {
    state.users = users
  },
  UPDATE_CURRENT_USER (state, user) {
    state.currentUser = user
  },
  CREATE_USER (state, user) {
    state.users.push(user)
  },
}


export default new Vuex.Store({
  state,
  mutations
})