<template>
  <div class="navBar">
    <div class="hamburger-container">
      <div style="padding: 0 15px" @click="toggleClick">
        <svg
          :class="{ 'is-active': $store.state.isCollapse }"
          class="hamburger"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
        >
          <path
            d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
          />
        </svg>
      </div>
    </div>
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(item, index) in breadList"
          :key="index"
          >{{ item.name }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right-menu">
      <Search
        id="header-search"
        class="right-menu-item"
        style="margin-right: 20px"
      />
      <el-popover
        class="avatar-wrapper"
        placement="bottom"
        trigger="manual"
        v-model="visible"
      >
        <div style="text-align: center">
          <el-button type="primary" @click="handleLogOut">退出登录</el-button>
        </div>
        <img
          slot="reference"
          @click="visible = !visible"
          :src="$store.state.userInfo.avatar"
          alt=""
        />
      </el-popover>
    </div>
  </div>
</template>

<script>
import Search from "@/components/HeaderSearch";
import * as API from "@/api";
export default {
  name: "NavBar",
  data() {
    return {
      visible: false,
      breadList: [],
    };
  },
  components: {
    Search,
  },
  methods: {
    toggleClick() {
      this.$store.dispatch("changeClollapse", null);
    },
    handleShowPop() {
      this.visible = !this.visible;
    },
    async handleLogOut() {
      let res = await API.loginout({});
      if (res?.data?.state == 0) {
        this.$store.dispatch("logOut", {});
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.breadList = this.$route.matched || [];
    let cookieUserInfo = sessionStorage.getItem("userInfo");
    if (cookieUserInfo) {
      this.$store.dispatch("login", JSON.parse(cookieUserInfo));
    }
  },
  watch: {
    $route(val) {
      this.breadList = val.matched || [];
    },
  },
};
</script>

<style lang="scss" scoped>
.el-popper {
  width: 50px !important;
  text-align: center !important;
}
.navBar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    padding: 0 15px;
  }
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }

  .hamburger.is-active {
    transform: rotate(180deg);
  }
  .right-menu {
    // width: 120px;
    height: 50px;
    // background: pink;
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .search {
      width: 40px;
      height: 40px;
      margin-top: 20px;
    }
    .avatar-wrapper {
      margin-right: 30px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
