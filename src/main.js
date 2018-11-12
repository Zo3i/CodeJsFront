// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import NProgress from 'NProgress'
import 'nprogress/nprogress.css'
NProgress.configure({ easing: 'ease', speed: 2000 });
Vue.prototype.$ajax = axios
Vue.use(ElementUI);
Vue.config.productionTip = false

axios.defaults.baseURL = '/rxMgr/a/third'


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
  components: { App },
  template: '<App/>'
})
