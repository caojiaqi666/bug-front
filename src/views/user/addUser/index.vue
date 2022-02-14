<template>
  <div class="wrap">
    <p class="warn-content" style="padding-left: 20px">
      状态组是相对于bug管理的状态的，角色组是共享文件夹和接口文档的权限，都是必须项，姓名，邮箱，姓名都必须是唯一值
    </p>
    <el-form ref="postForm" :model="postForm" class="form-container">
      <div class="createPost-main-container">
        <!--<el-col :span="24" >-->
        <div style="height: 30px" />

        <el-form-item style="margin-bottom: 40px" prop="title" label="姓名:">
          <el-input
            v-model="postForm.username"
            :maxlength="100"
            placeholder="请输入姓名"
            clearable
            style="width: 60%"
          />
        </el-form-item>

        <el-form-item style="margin-bottom: 40px" prop="title" label="密码:">
          <el-input
            v-model="postForm.password"
            autocomplete="new-password"
            :maxlength="100"
            placeholder="请输入密码"
            type="password"
            clearable
            style="width: 60%"
          />
        </el-form-item>

        <el-form-item style="margin-bottom: 40px" prop="title" label="确认:">
          <el-input
            v-model="postForm.repassword"
            auto-complete="off"
            :maxlength="100"
            placeholder="请输入密码"
            type="password"
            clearable
            style="width: 60%"
          />
        </el-form-item>

        <el-form-item style="margin-bottom: 40px" prop="title" label="邮箱:">
          <el-input
            v-model="postForm.email"
            autocomplete="off"
            :maxlength="100"
            placeholder="请输入邮箱"
            clearable
            style="width: 60%"
          />
        </el-form-item>

        <el-form-item style="margin-bottom: 40px" prop="title" label="权限:">
          <el-select v-model="postForm.power" placeholder="请选择">
            <el-option
              v-for="position in positions"
              :key="position.value"
              :label="position.label"
              :value="position.value"
            />
          </el-select>
        </el-form-item>
        <div>
          <el-button
            type="success"
            style="margin-left: 10px"
            plain
            @click="adduser"
            >添加</el-button
          >
          <el-button
            type="warning"
            style="margin-left: 20px"
            plain
            @click="clean"
            >清空</el-button
          >
        </div>
        <div style="margin-bottom: 30px; height: 30px" />
      </div>
    </el-form>
  </div>
</template>

<script>
// import { createUser } from "@/api/user";
import * as API from "@/api";
// import { getPositionKeyName } from "@/api/position";
export default {
  name: "Adduser",
  data() {
    return {
      postForm: {
        email: "",
        password: "",
        repassword: "",
        username: "",
        power: undefined,
      },
      number: {
        one: 1,
        two: 2,
      },
      positions: [
        {
          value: "0",
          label: "系统管理员",
        },
        {
          value: "1",
          label: "研发及测试人员",
        },
        {
          value: "2",
          label: "普通人员",
        },
      ],
      checkAll: false,
      rolegroups: [],
      checkedRoles: [],
      isIndeterminate: true,
      groups: null,
    };
  },
  activated() {
    this.getpositions();
  },
  created() {
    this.getpositions();
  },
  methods: {
    getpositions() {
      // getPositionKeyName().then((resp) => {
      //   this.positions = resp.data.data;
      // });
    },

    async adduser() {
      const regEmail = /^.*@.+\.[A-Za-zd]{2,5}$/;
      if (this.postForm.email === "") {
        this.$message({
          message: "请输入邮箱",
          type: "error",
        });
        return;
      }
      if (!regEmail.test(this.postForm.email)) {
        this.$message({
          message: "邮箱格式正确",
          type: "error",
        });
        return;
      }
      if (this.postForm.repassword !== this.postForm.password) {
        this.$message({
          message: "两次次密码不一致",
          type: "error",
        });
        return;
      }
      if (!this.postForm.power) {
        this.$message({
          message: "请选择权限",
          type: "error",
        });
        return;
      }
      let res = await API.addUser(this.postForm);
      if (res?.data?.state === 0) {
        this.$message({
          message: "添加用户成功",
          type: "success",
        });
        this.clean();
      } else if (res?.data?.state === 1) {
        this.$message({
          message: "添加失败,用户名已存在",
          type: "error",
        });
      } else {
        this.$message({
          message: "添加用户失败",
          type: "error",
        });
      }
    },
    clean() {
      this.postForm = {
        email: "",
        password: "",
        repassword: "",
      };
    },
  },
};
</script>

<style type="text/css">
.form-container .createPost-main-container .el-form-item {
  padding: 0px 15px 0px 15px;
}
</style>
