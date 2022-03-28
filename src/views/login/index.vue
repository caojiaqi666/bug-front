<template>
  <div class="login-container">
    <div class="login" v-if="loginStatus">
      <el-form
        ref="loginForm"
        class="login-form"
        :model="loginForm"
        :rules="loginRules"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">Login Form</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip1"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <i class="el-icon-unlock"></i>
            </span>
            <el-input
              :key="passwordType1"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType1"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock1"
              @blur="capsTooltip1 = false"
              @keyup.enter.native="debounce(handleLogin)"
            />
            <span class="show-pwd" @click="showPwd1">
              <i class="el-icon-view"></i>
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="debounce(handleLogin)"
          >登录</el-button
        >

        <div style="position: relative">
          <div class="tips">
            <span>Username : admin</span>
            <span>Password : 123123</span>
          </div>
          <div class="tips">
            <span style="margin-right: 18px">Username : admin2</span>
            <span>Password : 123123</span>
          </div>

          <el-button
            class="thirdparty-button"
            type="primary"
            @click="loginStatus = false"
          >
            去注册
          </el-button>
        </div>
      </el-form>
    </div>
    <div class="register" v-else>
      <el-form
        ref="registerForm"
        :model="registerForm"
        :rules="registerRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">Register Form</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip
          v-model="capsTooltip2"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password1">
            <span class="svg-container">
              <i class="el-icon-unlock"></i>
            </span>
            <el-input
              :key="passwordType2"
              ref="password1"
              v-model="registerForm.password1"
              :type="passwordType2"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock2"
              @blur="capsTooltip2 = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd2">
              <i class="el-icon-view"></i>
            </span>
          </el-form-item>
        </el-tooltip>

        <el-tooltip
          v-model="capsTooltip3"
          content="Caps lock is On"
          placement="right"
          manual
        >
          <el-form-item prop="password">
            <span class="svg-container">
              <i class="el-icon-unlock"></i>
            </span>
            <el-input
              :key="passwordType3"
              ref="password2"
              v-model="registerForm.password2"
              :type="passwordType3"
              placeholder="请再次输入密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock3"
              @blur="capsTooltip3 = false"
              @keyup.enter.native="debounce(handleLogin)"
            />
            <span class="show-pwd" @click="showPwd3">
              <i class="el-icon-view"></i>
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="debounce(handleRegister)"
          >注册</el-button
        >

        <div style="position: relative">
          <div class="tips">
            <span>Username : admin</span>
            <span>Password : 123123</span>
          </div>
          <div class="tips">
            <span style="margin-right: 18px">Username : admin2</span>
            <span>Password : 123123</span>
          </div>

          <el-button
            class="thirdparty-button"
            type="primary"
            @click="loginStatus = true"
          >
            去登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import * as API from "@/api/index";
import { debounce } from "@/utils/index";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      loginStatus: true,
      loginForm: {
        username: "admin",
        password: "123123",
      },
      registerForm: {
        username: "",
        password1: "",
        password2: "",
      },
      loginRules: {
        /*用户名规则*/
        username: [
          {
            validator(rule, value, callback) {
              if (/^[\w\u4e00-\u9fa5]{2,8}$/.test(value)) {
                callback();
              } else {
                callback(new Error("用户名不满足规则"));
              }
            },
            required: true,
            trigger: "blur",
          },
        ],

        /*密码规则*/
        password: [
          {
            validator(rule, value, callback) {
              if (
                /^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/.test(value)
              ) {
                callback();
              } else {
                callback(new Error("密码不满足规则"));
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
      },
      registerRules: {
        /*用户名规则*/
        username: [
          {
            validator(rule, value, callback) {
              if (/^[\w\u4e00-\u9fa5]{2,8}$/.test(value)) {
                callback();
              } else {
                callback(new Error("用户名不满足规则"));
              }
            },
            required: true,
            trigger: "blur",
          },
        ],

        /*密码规则*/
        password1: [
          {
            validator(rule, value, callback) {
              if (
                /^[\w\[\]\/\\\-!@#$%^&*()+=|,.<>?:;"'{}]{6,18}$/.test(value)
              ) {
                callback();
              } else {
                callback(new Error("密码不满足规则"));
              }
            },
            required: true,
            trigger: "blur",
          },
        ],

        /*再次输入密码规则*/
        password2: [
          {
            validator: (rule, value, callback) => {
              if (value === this.registerForm.pass) {
                callback();
              } else {
                callback("两次输入密码不一致");
              }
            },
            required: true,
            trigger: "blur",
          },
        ],
      },
      passwordType1: "password",
      passwordType2: "password",
      passwordType3: "password",
      capsTooltip1: false,
      capsTooltip2: false,
      capsTooltip3: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username1.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password1.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    debounce,
    checkCapslock1(e) {
      const { key } = e;
      this.capsTooltip1 = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    checkCapslock2(e) {
      const { key } = e;
      this.capsTooltip2 = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    checkCapslock3(e) {
      const { key } = e;
      this.capsTooltip3 = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd1() {
      if (this.passwordType1 === "password") {
        this.passwordType1 = "";
      } else {
        this.passwordType1 = "password";
      }
      this.$nextTick(() => {
        this.$refs.password1.focus();
      });
    },
    showPwd2() {
      if (this.passwordType2 === "password") {
        this.passwordType2 = "";
      } else {
        this.passwordType2 = "password";
      }
      this.$nextTick(() => {
        this.$refs.password2.focus();
      });
    },
    showPwd3() {
      if (this.passwordType3 === "password") {
        this.passwordType3 = "";
      } else {
        this.passwordType3 = "password";
      }
      this.$nextTick(() => {
        this.$refs.password3.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const { username, password } = this.loginForm;
          this.loading = true;
          let res = await API.toLogin({ username, passwd: password });
          if (res?.status == 200) {
            if (res?.data?.state == 0) {
              this.$message.close();
              this.$message({
                message: "登录成功",
                type: "success",
              });
              // 更新vuex
              this.$store.dispatch("login", res?.data?.user);
              setTimeout(() => {
                this.$router.push("/dataBoard/index");
              }, 500);
            } else if (res?.data?.state == 1) {
              this.$message.close();
              this.$message({
                message: "用户名不存在",
                type: "warning",
              });
            } else if (res?.data?.state == 2) {
              this.$message.close();
              this.$message({
                message: "用户名或密码错误",
                type: "error",
              });
            } else {
              this.$message.close();
              this.$message({
                message: res?.msg || "未知错误",
                type: "error",
              });
            }
          } else {
            this.$message.close();
            this.$message({
              message: "服务器错误",
              type: "error",
            });
          }
          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          const { username, password1 } = this.registerForm;
          this.loading = true;
          let res = await API.toRegister({ username, passwd: password1 });
          if (res?.status == 200) {
            if (res?.data?.state == 0) {
              this.$message.close();
              this.$message({
                message: "注册成功，请登录",
                type: "success",
              });
            } else if (res?.data?.state == 1) {
              this.$message.close();
              this.$message({
                message: "用户名已存在",
                type: "warning",
              });
            } else {
              this.$message.close();
              this.$message({
                message: res?.data?.msg || "未知错误",
                type: "error",
              });
            }
          } else {
            this.$message.close();
            this.$message({
              message: "服务器错误",
              type: "error",
            });
          }
          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
