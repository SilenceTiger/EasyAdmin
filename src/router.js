import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from '@/components/MainLayout'

Vue.use(Router)
/**
 * meta中目前只存放 icon数据,icon长啥样需要去iview官网找
 * 当路由的子路由只有一个时，不形成层级关系，如标准列表页，名字会使用子路由的name
 */

export const routesData = [
  {
    path: '/',
    name: 'visualization',
    redirect: 'normal',
    component: MainLayout,
    meta: {
      icon: 'ios-stats-outline'
    },
    children: [{
      path: 'normal',
      name: '房产高级搜索',
      component: () => import('@/views/map/Visualization')
    }],
  },
  // {
  //   path: '/',
  //   name: 'visualization',
  //   component: MainLayout,
  //   meta: {
  //     icon: 'ios-stats-outline'
  //   },
  //   children: [{
  //       path: 'visualization',
  //       component: () => import('@/views/map/Visualization'),
  //       name: '房产高级搜索',
  //     }
  //   ]
  // }
]

export default new Router({
  routes: routesData
})