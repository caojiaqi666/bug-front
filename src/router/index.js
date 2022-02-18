import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "首页",
    redirect: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/login",
    name: "登录页",
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
    name: "用户管理",
    redirect: "/user/userGroup",
    children: [
      {
        path: "userGroup",
        component: () => import("@/views/user/userGroup/index"),
        name: "用户组",
      },
      {
        path: "allUser",
        component: () => import("@/views/user/allUser/index"),
        name: "成员管理",
      },
      {
        path: "addUser",
        component: () => import("@/views/user/addUser/index"),
        name: "添加用户",
      },
      {
        path: "changePwd",
        component: () => import("@/views/user/changePwd/index"),
        name: "修改密码",
      },
      {
        path: "changeAvatar",
        component: () => import("@/views/user/changeAvatar/index"),
        name: "修改头像",
      },
      {
        path: "changeEmail",
        component: () => import("@/views/user/changeEmail/index"),
        name: "修改邮箱",
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
    name: "缺陷管理",
    redirect: "/bug/create",
    children: [
      {
        path: "create",
        component: () => import("@/views/bug/create/index"),
        name: "创建任务",
      },
      // {
      //   path: "myCreate",
      //   component: () => import("@/views/bug/myCreate/index"),
      //   name: "我的创建",
      // },
      {
        path: "allTask",
        component: () => import("@/views/bug/allTask/index"),
        name: "全部任务",
      },
      // {
      //   path: "myTask",
      //   component: () => import("@/views/bug/myTask/index"),
      //   name: "我的任务",
      // },
      {
        path: 'showBug',
        component: Home,
        hidden: true,
        children: [
          {
            path: ':id',
            component: () => import('@/views/bug/showBug/index'),
            name: '查看详情',
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
