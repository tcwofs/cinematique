import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/Movies.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('../views/Movie.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: () => ({ path: '/' }) },
  ],
});

export default router;
