<template>
  <div class="app-container">
    <BugTable type="all" />
  </div>
</template>

<script>
import * as API from "@/api";
import moment from "moment";
import BugTable from "../components/bugTable";

export default {
  name: "AllTask",
  data() {
    return {};
  },
  components: {
    BugTable
  },
};
</script>

<style lang="scss" scoped></style>
