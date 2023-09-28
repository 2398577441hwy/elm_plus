import { createRouter, createWebHistory } from "vue-router";

import App from '../App.vue'
const home = () => import('../views/home/index.vue')
const about = () => import('../views/about/index.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App,
      children:[
        {
          path:'',
          redirect:'/about'
        },
        {
          path:'/about',
          component:about
        },
        {
          path: '/home',
          component: home
        }
      ]
    },
  ]
})