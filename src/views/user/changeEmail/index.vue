<template>
  <div>
    <el-form class="form-container">
      <p style="margin-left: 20px" v-if="!emailState">您暂未设置邮箱,请设置</p>
      <div style="height: 20px" />
      <el-form-item label="邮箱:">
        <el-input
          v-model="email"
          :maxlength="100"
          placeholder="请输入邮箱"
          style="width: 60%"
        />
      </el-form-item>

      <div>
        <el-button
          v-if="emailState"
          type="success"
          style="margin-left: 20px"
          plain
          @click="changeEmail"
          >修改</el-button
        >
        <el-button
          v-if="!emailState"
          type="success"
          style="margin-left: 20px"
          plain
          @click="changeEmail"
          >设置</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import * as API from "@/api";
export default {
  name: "Changepwd",
  data() {
    return {
      email: "",
      emailState: false,
    };
  },
  mounted() {
    this.getEmailHandle();
  },
  methods: {
    getEmailHandle() {
      let email = this.$store.state.userInfo?.email;
      if (email) {
        this.email = email;
        this.emailState = true;
      }
    },
    async changeEmail() {
      let res = await API.changeEmail({
        email: this.email,
      });
      if (res?.status == 200 && res?.data?.state == 0) {
        this.$message.success(res?.data?.msg);
      } else {
        this.$message.error(res?.data?.msg || "未知错误");
      }
    },
  },
};
</script>

<style type="text/css">
.el-form-item {
  margin-left: 20px;
}
</style>
