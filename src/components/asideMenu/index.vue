<template>
  <div class="menuBox">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
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
        <el-menu-item index="1-1">团队空间</el-menu-item>
        <el-menu-item index="1-2">需求管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">权限管理</span>
        </template>
        <el-menu-item index="2-1">成员管理</el-menu-item>
        <el-menu-item index="2-2">客户管理</el-menu-item>
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
      </el-submenu>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">数据看板</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">更多应用</span>
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
      isCollapse: false,
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
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menuBox {
  width: 200px;
  height: 1000px;
  background: #304156;
}
</style>
