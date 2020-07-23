import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

//重复路由不跳转
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
//本地环境
// const _import = require("./_import_" + process.env.NODE_ENV).default;
//线上环境
const _import = require("./_import_production.js").default;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: _import("layout/Layout"),
    children: [
      {
        path: "/",
        name: "manager",
        component: _import("layout/Layout"),
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
