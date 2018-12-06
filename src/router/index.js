import Vue from 'vue'
import Router from 'vue-router'
import First from './first'
import Work from './work'
import Login from './login'
import Sign from './sign'
import AnswerList from './answer'


Vue.use(Router)

export default new Router({
  routes: [
    First,
    Work,
    Login,
    Sign,
    AnswerList
  ]
})
