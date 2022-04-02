<template>
  <div class="homeBox">
    <AsideMenu />
    <div class="right" :class="{ 'is-active': $store.state.isCollapse }">
      <NavBar />
      <div class="wrap">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AsideMenu from "@/components/asideMenu";
import NavBar from "@/components/navBar";
export default {
  components: { AsideMenu, NavBar },
};
</script>

<style lang="scss" scoped>
.homeBox {
  height: 100%;
  display: flex;
  flex-direction: row;
  transition: width 2s;
  .right {
    width: 100%;
    padding-left: 200px;
    .wrap {
      margin: 15px 20px;
    }
  }
  .is-active {
    padding-left: 64px;
  }
}
</style>
