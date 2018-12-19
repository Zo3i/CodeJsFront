import Vue from 'vue'
import Router from 'vue-router'
import Center from '@/components/user/center'

Vue.use(Router)

export default {
    path: '/user/center',
    component: Center,
    meta: { keepAlive: false },
  }
