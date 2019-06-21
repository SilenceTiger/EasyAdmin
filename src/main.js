import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import './style/common.less' //共有样式

/**
 * 前端mock
 * 开发环境自测的时候引入
 * 开发环境-联调的时候使用vue.config.js中的proxy连接到自己本地的后台服务或者小伙伴机器的IP地址的时候注释掉
 * 生成发布环境当然也是注释啦
 */

import './mock'

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
