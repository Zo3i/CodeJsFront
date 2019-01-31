import Vue from 'vue'
import Router from 'vue-router'
import UserRank from '@/components/user/userRank'

Vue.use(Router)

export default {
    path: '/user/userRank',
    component: UserRank,
    meta: { keepAlive: false },
  }
