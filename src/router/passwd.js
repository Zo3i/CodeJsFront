import Vue from 'vue'
import Router from 'vue-router'
import Passwd from '@/components/user/passwd'

Vue.use(Router)

export default {
    path: '/user/passwd',
    component: Passwd,
    meta: { keepAlive: false },
  }
