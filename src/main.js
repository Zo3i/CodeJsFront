// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import NProgress from 'NProgress'
import 'nprogress/nprogress.css'
import store from './store/store';
import * as types from './store/types'
import md5 from 'js-md5';
import global from './components/util/Global'


import hzqingVueTimeline from 'hzqing-vue-timeline'
Vue.use(hzqingVueTimeline)

Vue.prototype.GLOBAL = global
Vue.prototype.$md5 = md5;
NProgress.configure({ easing: 'ease', speed: 2000 });
Vue.prototype.$ajax = axios
Vue.use(ElementUI);
Vue.config.productionTip = false

// axios.defaults.baseURL = '/api'

// 响应拦截器即异常处理
axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          console.log(err.response)
          if (
            err.response.data.message === 'Header参数有误' ||
            err.response.data.message === '请重新登录!'
          ) {
            store.commit(types.LOGOUT)
            router.replace({
              path: '/user/login',
              query: { redirect: router.currentRoute.fullPath }
            })
          }
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    // message.err(err.message)
    return Promise.resolve(err.response)
  }
)


// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  console.log("flush")
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)


router.beforeEach((to, from, next) => {
  NProgress.start();
  NProgress.set(1)
  NProgress.inc()
  next()
});

router.afterEach(transition => {
  //停止加载条
  NProgress.done()
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
