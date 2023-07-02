import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/main.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/c-cpns/login-child.vue"),
    },
  ],
});

export default router;
