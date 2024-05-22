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
      path: '/home/:page?',
      name: 'home with page',
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
      path: '/tweets/:page?',
      name: 'Tweets',
      component: () => import('../views/TweetsView.vue')
    },
    {
      path: '/youtube/:page?',
      name: 'Youtube',
      component: () => import('../views/YoutubeView.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/tag_search/:tag',
      name: 'TagSearch',
      component: () => import('../views/TagSearchView.vue')
    }
  ]
})

export default router
