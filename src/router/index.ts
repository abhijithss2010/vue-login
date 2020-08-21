import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (
        sessionStorage.getItem("is-auth") &&
        sessionStorage.getItem("is-auth") === "1"
      ) {
        next();
      } else {
        next({ name: "Login" });
      }
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
