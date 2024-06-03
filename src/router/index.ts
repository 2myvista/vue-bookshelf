import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useUserStore } from "@/stores/user";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
	path: '/list',
	name: 'about',
	component: () => import('../views/ListView.vue'),
	meta: {
		  requiredAuth: true
	  }
    }
  ]
})

router.beforeEach((to) => {
	const user = useUserStore();
	if (to.meta.requiredAuth && !user.isAuthorized) {
		return '/'
	}
})
export default router
