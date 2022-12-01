import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import {getToken} from "@/utils/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: ()=> import('@/views/Dashboard'),
    children:[
      {
        path:'system/user',
        name: 'User',
        component:()=> import('@/views/system/user')
      },
      {
        path:'system/role',
        name: 'Role',
        component:()=> import('@/views/system/role')
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (getToken()!== 'undefined' && getToken()){
    //已登录
    if (to.name ==='Login') next('/')
    else next()
  }else if (to.name!=='Login')
    next({name:'Login'})
  else next()
})

export default router
