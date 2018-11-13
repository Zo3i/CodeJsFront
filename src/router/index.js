import Vue from 'vue'
import Router from 'vue-router'
import First from './first'
import Work from './work'
import Login from './login'


Vue.use(Router)

export default new Router({
  routes: [
    First,
    Work,
    Login
  ]
})
