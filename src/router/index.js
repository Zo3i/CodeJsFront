import Vue from 'vue'
import Router from 'vue-router'
import First from './first'
import Work from './work'
import Login from './login'
import Sign from './sign'
import AnswerList from './answer'
import Center from './center'
import Zone from './zone'
import Rank from './rank'
import UserRank from './userRank'
import Question from './question'
import Passwd from './passwd'
import CreateQuestion from './createQuestion'

Vue.use(Router)

export default new Router({
  routes: [
    First,
    Work,
    Login,
    Sign,
    AnswerList,
    Center,
    Zone,
    Rank,
    UserRank,
    Question,
    Passwd,
    CreateQuestion
  ]
})
