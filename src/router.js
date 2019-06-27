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
    name: '标准列表页',
    redirect: 'normal',
    component: MainLayout,
    meta: {
      icon: 'ios-home-outline'
    },
    children: [{
      path: 'normal',
      name: '标准列表页',
      component: () => import('@/views/home/Home')
    }],
  },
  { 
    path: '/nestMenu',
    name: '测试递归menu',
    meta: {
      icon: 'ios-heart-outline'
    },
    children: [{
        path: 'a',
        name: '标题1',
        children: [{
            path: 'aa',
            name: '标题1-1',
          },
          {
            path: 'bb',
            name: '标题1-2',
          }
        ]
      },
      {
        path: 'b',
        name: '标题2',
      }
    ]
  },
  {
    path: '/',
    name: '组件通信',
    redirect: 'normal',
    component: MainLayout,
    meta: {
      icon: 'ios-home-outline'
    },
    children: [{
      path: 'props',
      name: 'props',
      component: () => import('@/views/componentsCommunication/PropsWay')
    },{
      path: 'eventBus',
      name: 'eventBus',
      component: () => import('@/views/componentsCommunication/PropsWay')
    },{
      path: 'vuex',
      name: 'vuex',
      component: () => import('@/views/componentsCommunication/PropsWay')
    },{
      path: 'provideInject',
      name: 'provide&inject',
      component: () => import('@/views/componentsCommunication/PropsWay')
    },{
      path: 'observer',
      name: '观察者',
      component: () => import('@/views/componentsCommunication/ObserverWay')
    },{
      path: 'other',
      name: '其他',
      component: () => import('@/views/componentsCommunication/ObserverWay')
    }],
  },
  {
    path: '/parallelCoordinate',
    name: '平行坐标',
    component: MainLayout,
    meta: {
      icon: 'ios-stats-outline'
    },
    children: [{
        path: 'introduce',
        component: () => import('@/views/parallelCoordinate/Introduce'),
        name: '平行坐标简介',
      },
      {
        path: 'application',
        component: () => import('@/views/parallelCoordinate/Application'),
        name: '平行坐标应用',
      }
    ]
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: MainLayout,
    meta: {
      icon: 'ios-stats-outline'
    },
    children: [{
        path: 'baseChart',
        component: () => import('@/views/echarts/BaseChart'),
        name: 'base chart',
      },
      {
        path: 'glChart',
        component: () => import('@/views/echarts/GlChart'),
        name: 'gl chart',
      }
    ]
  },
  {
    path: '/map',
    name: 'map11',
    component: MainLayout,
    meta: {
      icon: 'ios-stats-outline'
    },
    children: [{
        path: 'basemap',
        component: () => import('@/views/map/BaseMap'),
        name: 'GaoDeMap',
      }
    ]
  }
]

export default new Router({
  routes: routesData
})