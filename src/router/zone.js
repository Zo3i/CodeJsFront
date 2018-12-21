import Vue from 'vue'
import Router from 'vue-router'
import Zone from '@/components/user/zone'

Vue.use(Router)

export default {
    path: '/user/zone',
    component: Zone,
    meta: { keepAlive: false },
  }
