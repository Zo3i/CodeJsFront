import Vue from 'vue'
import Router from 'vue-router'
import Sign from '@/components/user/sign'

Vue.use(Router)

export default {
    path: '/user/sign',
    component: Sign,
    name: "登录",
    meta: { keepAlive: false },
  }
