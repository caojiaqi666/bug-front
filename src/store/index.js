import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isCollapse: false,
  },
  actions: {
    login(context, value) {
      context.commit("LOGIN", value);
    },
    logOut(context, value) {
      context.commit("LOGOUT", value);
    },
    changeClollapse(context, value) {
      context.commit("CHANGECLOLLAPSE", value);
    },
  },
  mutations: {
    LOGIN(state, value) {
      console.log("触发loginvalue: ", value);
      sessionStorage.setItem("userInfo", value);
      sessionStorage.getItem("userInfo");
      state.userInfo = value;
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    LOGOUT(state, value) {
      state.userInfo = {};
      sessionStorage.removeItem("userInfo");
    },
    CHANGECLOLLAPSE(state, value) {
      state.isCollapse = !state.isCollapse;
    },
  },
  modules: {},
});
