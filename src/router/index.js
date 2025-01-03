import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/login',
      name: 'auth',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/meetings',
      name: 'meetings',
      component: () => import('../views/Meetings.vue'),
    },
    {
      path: '/createmeeting',
      name: 'create',
      component: () => import('../views/CreateMeeting.vue'),
    },
  ],
})

export default router
