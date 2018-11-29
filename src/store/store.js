/**
 * Created by superman on 17/2/16.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
import { stringify } from 'querystring';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: localStorage.user || {},
    token: null,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [types.LOGOUT]: state => {
      localStorage.removeItem('token')
      state.token = null
    },
    [types.USER]: (state, data) => {
      localStorage.user = JSON.stringify(data)
      state.user = data
    },
  }
})
