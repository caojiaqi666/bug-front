<template>
  <div class="menuBox">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="$store.state.isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      mode="vertical"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">项目管理</span>
        </template>
        <el-menu-item index="1-1">
        <router-link to="/">团队空间</router-link></el-menu-item>
        <el-menu-item index="1-2">需求管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">用户管理</span>
        </template>
        <router-link to="/user/userGroup"><el-menu-item index="2-1">用户组</el-menu-item></router-link>
        <router-link to="/user/allUser"><el-menu-item index="2-2">成员管理</el-menu-item></router-link>
        <router-link to="/user/addUser"><el-menu-item index="2-3">添加用户</el-menu-item></router-link>
        <router-link to="/user/changePwd"><el-menu-item index="2-4">修改密码</el-menu-item></router-link>
        <router-link to="/user/changeAvatar"><el-menu-item index="2-5">修改头像</el-menu-item></router-link>
        <router-link to="/user/"><el-menu-item index="2-6">修改用户名</el-menu-item></router-link>
        <router-link to="/user/changeEmail"><el-menu-item index="2-7">修改邮箱</el-menu-item></router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">测试管理</span>
        </template>
        <el-menu-item index="3-1">提测管理</el-menu-item>
        <el-menu-item index="3-2">用例管理</el-menu-item>
        <el-menu-item index="3-2">测试计划</el-menu-item>
        <el-menu-item index="3-2">用例评审</el-menu-item>
        <el-menu-item index="3-2">测试报告</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">缺陷管理</span>
        </template>
        <router-link to="/bug/create"><el-menu-item index="4-1">创建任务</el-menu-item></router-link>
        <router-link to="/bug/myCreate"><el-menu-item index="4-2">我的创建</el-menu-item></router-link>
        <router-link to="/bug/allTask"><el-menu-item index="4-3">所有任务</el-menu-item></router-link>
        <router-link to="/bug/myTask"><el-menu-item index="4-4">我的任务</el-menu-item></router-link>
      </el-submenu>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
         <router-link to="/bug/myTask"><el-menu-item index="5-1">数据看板</el-menu-item></router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import variables from "@/styles/variables.scss";
export default {
  name: "AsideMenu",
  data() {
    return {
      defaultActive: "1-1"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    variables() {
      return variables;
    },
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menuBox {
  height: 100%;
  background: #304156;
  // position: fixed;
  overflow-x: hidden !important;
  box-sizing: inherit;
}
</style>
