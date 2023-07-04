import { localCache } from "@/utils/cache";
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
      children: [

        {
          path: "content",
          name: "content",
          component: () => import("@/views/content/content.vue"),
        },
        {
          path: "borrowBooks",
          name: "borrowBooks",
          component: () => import("@/views/borrowBooks/borrowBooks.vue"),
        },
        {
          path: "books",
          name: "books",
          component: () => import("@/views/books/books.vue"),
        },
        {
          path: "payfine",
          name: "payfine",
          component: () => import("@/views/payfine/payfine.vue"),
        },
        {
          path: "overUserInfo",
          name: "overUserInfo",
          component: () => import("@/views/overUserInfo/overUserInfo.vue"),
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/c-cpns/login-child.vue"),
    },

  ],
});

router.beforeEach((to) => {
  console.log("执行了路由守卫");
  const token = localCache.getCache("token");
  console.log("这是token", token)
  if (to.path == "/main" && !token) {
    console.log("这是正确的")
    return "/login";
  }

});

export default router;
