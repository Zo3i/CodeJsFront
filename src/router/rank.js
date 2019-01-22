import Vue from 'vue'
import Router from 'vue-router'
import Rank from '@/components/user/rank'

Vue.use(Router)

export default {
    path: '/user/rank',
    component: Rank,
    meta: { keepAlive: false },
  }
