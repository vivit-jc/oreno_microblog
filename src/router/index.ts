import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/r18',
      name: 'r18',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdultView.vue')
    },
    {
      path: '/tweets',
      name: 'Tweets',
      component: () => import('../views/TweetsView.vue')
    },
    {
      path: '/youtube',
      name: 'Youtube',
      component: () => import('../views/YoutubeView.vue')
    },
  ]
})

export default router
