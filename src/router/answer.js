import Vue from 'vue'
import Router from 'vue-router'
import AnswerList from '@/components/work/answerList'

Vue.use(Router)

export default {
    path: '/work/answerList',
    component: AnswerList,
    meta: { keepAlive: false },
  }
