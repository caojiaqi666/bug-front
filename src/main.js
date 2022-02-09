import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/reset.scss" // 清除默认样式
import "@/plugins/element.js"; // 引入elementui
import "@/styles/element-variables.scss"; // 改变element主题色
import "@/styles/index.scss"; // 全局样式

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
