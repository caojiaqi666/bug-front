import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  // {
  //   path: "/project",
  //   component: Home,
  //   redirect: "/project/team",
  //   children: [
  //     {
  //       path: "team",
  //       component: () => import("@/views/team/index"),
  //       name: "team",
  //     },
  //     {
  //       path: "demand",
  //       component: () => import("@/views/demand/index"),
  //       name: "demand",
  //     },
  //   ],
  // },
  {
    path: "/user",
    component: Home,
    redirect: "/user/userGroup",
    children: [
      {
        path: "userGroup",
        component: () => import("@/views/user/userGroup/index"),
        name: "userGroup",
      },
      {
        path: "allUser",
        component: () => import("@/views/user/allUser/index"),
        name: "allUser",
      },
      {
        path: "addUser",
        component: () => import("@/views/user/addUser/index"),
        name: "addUser",
      },
      {
        path: "changePwd",
        component: () => import("@/views/user/changePwd/index"),
        name: "changePwd",
      },
      {
        path: "changeAvatar",
        component: () => import("@/views/user/changeAvatar/index"),
        name: "changeAvatar",
      },
      {
        path: "changeEmail",
        component: () => import("@/views/user/changeEmail/index"),
        name: "changeEmail",
      },
    ],
  },
  // {
  //   path: "/test",
  //   component: Home,
  //   redirect: "/test/jtest",
  //   children: [
  //     {
  //       path: "jtest",
  //       component: () => import("@/views/jtest/index"),
  //       name: "jtest",
  //     },
  //     {
  //       path: "case",
  //       component: () => import("@/views/case/index"),
  //       name: "case",
  //     },
  //     {
  //       path: "plan",
  //       component: () => import("@/views/plan/index"),
  //       name: "plan",
  //     },
  //     {
  //       path: "review",
  //       component: () => import("@/views/review/index"),
  //       name: "review",
  //     },
  //     {
  //       path: "report",
  //       component: () => import("@/views/report/index"),
  //       name: "report",
  //     },
  //   ],
  // },
  {
    path: "/bug",
    component: Home,
    redirect: "/bug/create",
    children: [
      {
        path: "create",
        component: () => import("@/views/bug/create/index"),
        name: "create",
      },
      // {
      //   path: "myCreate",
      //   component: () => import("@/views/bug/myCreate/index"),
      //   name: "myCreate",
      // },
      {
        path: "allTask",
        component: () => import("@/views/bug/allTask/index"),
        name: "allTask",
      },
      // {
      //   path: "myTask",
      //   component: () => import("@/views/bug/myTask/index"),
      //   name: "myTask",
      // },
      {
        path: '/showBug',
        component: Home,
        redirect: 'noredirect',
        hidden: true,
        children: [
          {
            path: ':id',
            component: () => import('@/views/bug/showBug/index'),
            name: 'showBug',
            // meta: { title: 'backToTop' }
          }
        ]
      }
    ],
  },
  // {
  //   path: "/dataBoard",
  //   component: Home,
  //   children: [
  //     {
  //       path: "index",
  //       component: () => import("@/views/dataBoard/index"),
  //       name: "dataBoard",
  //     },
  //   ],
  // },
  // {
  //   path: "/system",
  //   component: Home,
  //   name: "system",
  //   children: [
  //     {
  //       path: "log",
  //       component: () => import("@/views/log/index"),
  //       name: "log",
  //     },
  //     {
  //       path: "rubbish",
  //       component: () => import("@/views/rubbish/index"),
  //       name: "rubbish",
  //     },
  //     {
  //       path: "defaultConf",
  //       component: () => import("@/views/defaultConf/index"),
  //       name: "defaultConf",
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

// export const asyncRouterMap = [
//   /** When your routing table is too long, you can split it into small modules**/
//   componentsRouter,
//   system,
//   userRoute,
//   bugRouter,
//   docRouter,
//   setting,
//   { path: "*", redirect: "/404", hidden: true }
// ];
