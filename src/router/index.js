import Vue from 'vue'
import Router from 'vue-router'
import First from './first'
import Work from './work'


Vue.use(Router)

export default new Router({
  routes: [
    First,
    Work
  ]
})
