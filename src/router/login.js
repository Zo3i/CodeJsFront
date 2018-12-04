import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/login'

Vue.use(Router)

export default {
    path: '/user/login',
    component: Login,
    meta: { keepAlive: false },
  }
