import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  currentUser: {},
  users: [],
  form: {
    show: false,
    busy: false,
    success: false,
    errors: {}
  }
}

const mutations = {
  LOGIN_USER (state, currentUser) {
    state.currentUser = currentUser
  },
  LOGOUT_USER (state) {
    state.currentUser = {}
  },
  UPDATE_AVATAR (state, avatar) {
    state.currentUser.avatar = avatar
  },
  UPDATE_PROFILE (state, profile) {
    state.currentUser = profile
  },
  SET_ERRORS (state, errors) {
    state.form.errors = errors
  },
  GET_ALL_USERS (state, users) {
    state.users = users
  },
  DELETE_USER (state, user) {
    state.users.$remove(user)
  },
  UPDATE_USERS (state, users) {
    state.users = users
  },
  UPDATE_CURRENT_USER (state, user) {
    state.currentUser = user
  },
  CREATE_USER (state, user) {
    state.users.push(user)
  },
  SET_FORM_BUSY (state, value) {
    state.form.busy = value
  },
  SET_FORM_SHOW (state, value) {
    state.form.show = value
  },
  CLEAR_FORM (state, value) {
    state.form.busy = false
    state.form.show = false
    state.form.errors = {}
  }
}


export default new Vuex.Store({
  state,
  mutations
})