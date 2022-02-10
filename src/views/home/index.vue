<template>
  <div class="homeBox">
    <AsideMenu />
    <div class="right">
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
  .right {
    width: 100%;
    .wrap {
      margin: 15px 20px;
    }
  }
}
</style>
