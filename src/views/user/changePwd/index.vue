<template>
  <div>
    <p class="warn-content" style="padding-left: 20px">修改密码</p>
    <el-form class="form-container">
      <div style="height: 20px" />
      <el-form-item label="旧密码:">
        <el-input
          v-model="oldpassword"
          :maxlength="100"
          placeholder="请输入标题"
          type="password"
          clearable
          style="width: 60%"
        />
      </el-form-item>

      <el-form-item label="新密码:">
        <el-input
          v-model="newpassword"
          :maxlength="100"
          placeholder="请输入标题"
          type="password"
          clearable
          style="width: 60%"
        />
      </el-form-item>

      <el-form-item label="新密码:">
        <el-input
          v-model="repassword"
          :maxlength="100"
          placeholder="请输入标题"
          type="password"
          clearable
          style="width: 60%"
        />
      </el-form-item>

      <div>
        <el-button
          type="success"
          style="margin-left: 20px"
          plain
          @click="changepwd"
          >修改</el-button
        >
        <el-button type="warning" style="margin-left: 20px" plain @click="clean"
          >清空</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
// import { updatePassword } from "@/api/user";
import * as API from "@/api";
export default {
  name: "Changepwd",
  data() {
    return {
      oldpassword: "",
      newpassword: "",
      repassword: "",
    };
  },
  methods: {
    async changepwd() {
      if (this.newpassword !== this.repassword) {
        this.$message({
          message: "新密码不一致",
          type: "error",
        });
        return;
      }
      const ch = {
        oldpasswd: this.oldpassword,
        newpasswd: this.newpassword,
      };
      let res = await API.changePwd(ch);
      if (res.status == 200 && res.data?.code == 0) {
        this.$message.success(res?.data?.msg || "修改成功");
        this.clean();
      } else {
        this.$message.success(res?.data?.msg || "未知错误");
      }
    },
    clean() {
      this.oldpassword = "";
      this.newpassword = "";
      this.repassword = "";
    },
  },
};
</script>

<style type="text/css">
.el-form-item {
  margin-left: 20px;
}
</style>
