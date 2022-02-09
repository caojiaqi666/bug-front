<template>
  <div class="homeBox">
    <AsideMenu />
    <NavBar />
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
  display: flex;
  flex-direction: row;
}
</style>
