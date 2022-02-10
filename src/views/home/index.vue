<template>
  <div class="homeBox">
    <AsideMenu />
    <div class="right">
      <NavBar />
      <router-view />
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
  .right {
    width: 100%;
  }
}
</style>
