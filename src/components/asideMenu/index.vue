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
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据看板</span>
        </template>
        <router-link to="/databoard/index"
          ><el-menu-item index="5-1"
            ><i class="el-icon-notebook-2"></i>数据详情</el-menu-item
          ></router-link
        >
      </el-submenu>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">项目管理</span>
        </template>
        <router-link to="/project/setting"
          ><el-menu-item index="1-1"
            ><i class="el-icon-notebook-2"></i>设置项目</el-menu-item
          ></router-link
        >
        <router-link to="/project/demand"
          ><el-menu-item index="1-2"
            ><i class="el-icon-coordinate"></i>需求管理</el-menu-item
          ></router-link
        >
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </template>
        <router-link to="/user/allUser"
          ><el-menu-item index="2-2"
            ><i class="el-icon-coordinate"></i>成员管理</el-menu-item
          ></router-link
        >
        <router-link to="/user/addUser"
          ><el-menu-item index="2-3"
            ><i class="el-icon-circle-plus"></i>添加用户</el-menu-item
          ></router-link
        >
        <router-link to="/user/changePwd"
          ><el-menu-item index="2-4"
            ><i class="el-icon-s-check"></i>修改密码</el-menu-item
          ></router-link
        >
        <router-link to="/user/changeAvatar"
          ><el-menu-item index="2-5"
            ><i class="el-icon-picture-outline-round"></i>修改头像</el-menu-item
          ></router-link
        >
        <router-link to="/user/changeEmail"
          ><el-menu-item index="2-7"
            ><i class="el-icon-s-promotion"></i>修改邮箱</el-menu-item
          ></router-link
        >
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-cpu"></i>
          <span slot="title">缺陷管理</span>
        </template>
        <router-link to="/bug/create"
          ><el-menu-item index="4-1"
            ><i class="el-icon-folder-add"></i>创建任务</el-menu-item
          ></router-link
        >
        <router-link to="/bug/myCreate"
          ><el-menu-item index="4-2"
            ><i class="el-icon-folder-opened"></i>我的创建</el-menu-item
          ></router-link
        >
        <router-link to="/bug/allTask"
          ><el-menu-item index="4-3"
            ><i class="el-icon-folder"></i>所有任务</el-menu-item
          ></router-link
        >
        <router-link to="/bug/myTask"
          ><el-menu-item index="4-4"
            ><i class="el-icon-document-remove"></i>我的任务</el-menu-item
          ></router-link
        >
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </template>
        <router-link to="/system/log"
          ><el-menu-item index="6-1"
            ><i class="el-icon-folder-add"></i>日志</el-menu-item
          ></router-link
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import variables from "@/styles/variables.scss";
export default {
  name: "AsideMenu",
  data() {
    return {
      defaultActive: "5-1",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  computed: {
    variables() {
      return variables;
    },
  },
  mounted() {},
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
  position: fixed;
  overflow-x: hidden !important;
  box-sizing: inherit;
  z-index: 99;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
