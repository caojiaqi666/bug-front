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
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>团队空间</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-menu">
      <div class="search">
        <svg
          t="1644388089973"
          class="icon"
          viewBox="0 0 1030 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2213"
          width="16"
          height="16"
        >
          <path
            d="M738.618409 646.405992c96.606263 96.606263 192.944918 192.944918 290.889218 290.621611-31.310063 29.169204-62.352519 57.803193-93.662582 86.972397-93.662582-93.662582-190.001237-190.001237-286.875107-286.875107-104.099269 71.451169-215.691545 95.535833-336.917687 66.901844-96.87387-22.746627-175.015224-75.732887-233.621239-156.282708-120.690927-165.648966-98.747122-390.439162 42.81718-530.130212 149.860131-147.719272 377.861615-153.339027 534.947145-33.450922C814.08369 205.389036 876.436208 448.644141 738.618409 646.405992zM728.984544 407.700212C728.984544 230.008915 585.814598 86.036146 408.658514 86.036146 231.502431 86.036146 86.994448 230.276522 86.994448 407.164998c0 178.226513 143.972768 322.466888 321.664066 321.664066C587.152634 728.293849 728.984544 585.926725 728.984544 407.700212z"
            p-id="2214"
          ></path>
        </svg>
      </div>
      <div class="avatar-wrapper">
        <img src="../../assets/img/avatar.gif" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};
  },
  methods: {
    toggleClick() {
      this.$store.dispatch("changeClollapse", null);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
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
    width: 120px;
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
      }
    }
  }
}
</style>
