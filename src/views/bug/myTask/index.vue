<template>
  <div class="app-container">
    <BugTable type="myTask" />
  </div>
</template>

<script>
import * as API from "@/api";
import moment from "moment";
import BugTable from "../components/bugTable";

export default {
  name: "MyTask",
  data() {
    return {};
  },
  components: {
    BugTable
  },
};
</script>

<style lang="scss" scoped></style>
