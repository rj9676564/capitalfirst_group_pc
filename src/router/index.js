import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: ()=>import('@/views/Home.vue'),
      meta:{title:'Home'},
      redirect:'/home/main',
      children:[
        {
          path: 'main',
          component: ()=>import('@/views/main.vue'),
          meta:{title:'Home'},
        },
        {
          path: 'faq',
          component: ()=>import('@/views/faq.vue'),
          meta:{title:'FAQS'},
        },
        {
          path: 'contact',
          component: ()=>import('@/views/contact.vue'),
          meta:{title:'contact'},
        },
        {
          path: 'deposit',
          component: ()=>import('@/views/deposit.vue'),
          meta:{title:'deposit'},
        },
        {
          path: 'withdraw',
          component: ()=>import('@/views/withdraw.vue'),
          meta:{title:'withdraw'},
        },
        {
          path: 'history',
          component: ()=>import('@/views/history.vue'),
          meta:{title:'history'},
        },
        {
          path: 'recharge',
          component: ()=>import('@/views/recharge.vue'),
          meta:{title:'recharge'},
        },
        {
          path: 'market',
          component: ()=>import('@/views/market.vue'),
          meta:{title:'Home'}
        },
     
      ]
    },
    {
      path: '/login',
      component: ()=>import('@/views/login.vue'),
    },
    {
      path: '/forgot',
      component: ()=>import('@/views/forgot.vue'),
    },
    {
      path: '/kyc',
      component: ()=>import('@/views/kyc.vue'),
      meta:{title:'realname'},
      redirect:'/kyc/realname',
      children:[
        {
          path: 'realname',
          component: ()=>import('@/views/realname.vue'),
          meta:{title:'realname'},
        },
        {
          path: 'about',
          component: ()=>import('@/views/about.vue'),
          meta:{title:'about'},
        },
        {
          path: 'bank',
          component: ()=>import('@/views/bank.vue'),
          meta:{title:'bank'},
        },
        {
          path: 'changePwd',
          component: ()=>import('@/views/changePwd.vue'),
          meta:{title:'changePwd'},
        },
        {
          path: 'changePayPwd',
          component: ()=>import('@/views/changePayPwd.vue'),
          meta:{title:'changePayPwd'},
        },
        {
          path: 'order',
          component: ()=>import('@/views/order.vue'),
          meta:{title:'order'},
        },
        {
          path: 'collet',
          component: ()=>import('@/views/collet.vue'),
          meta:{title:'collet'},
        },
        {
          path: 'user_assets',
          component: ()=>import('@/views/user_assets.vue'),
          meta:{title:'user_assets'},
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  const token = sessionStorage.getItem('token')
  if((to.path !== '/login' && to.path !== '/forgot') && !token){
    next('/login')
    // next()
  }else{
    next()
  }
})
 
export default router