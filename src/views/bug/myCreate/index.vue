<template>
  <div class="app-container">
    <BugTable type="myCreate" />
  </div>
</template>

<script>
import * as API from "@/api";
import moment from "moment";
import BugTable from "../components/bugTable";

export default {
  name: "MyCreate",
  data() {
    return {};
  },
  components: {
    BugTable
  },
};
</script>

<style lang="scss" scoped></style>
