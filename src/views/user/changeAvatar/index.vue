<template>
  <div id="head" style="padding-left: 20px">
    <p class="warn-content">修改个人头像</p>
    <el-button type="primary" @click="toggleShow">设置头像</el-button>
    <!-- <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload> -->
    <img :src="avatar" />
  </div>
</template>

<script>
export default {
  name: "HeadImg",
  components: {},
  data() {
    return {
      show: false,
      imgname: "head",
      url: process.env.VUE_APP_BASE_API + "/upload/headimg",
      params: {
        // token: getToken(),
        name: "avatar",
      },
      headers: {
        smail: "*_~",
        // Authorization: "Bearer " + getToken(),
      },
      avatar: '',
      imageUrl: "",
    };
  },
  computed: {
    avatar1: {
      get() {
        return this.$store.state.user.avatar;
      },
      set(val) {
        this.$store.commit("user/SET_AVATAR", val);
      },
    },
  },
  created() {
        console.log('this.$store.state: ', this.$store.state);
    this.checktoken();
  },
  methods: {
    checktoken() {
      // if (getToken() === "") {
      //   this.$router.push("/login");
      // }
    },
    toggleShow() {
      this.show = !this.show;
      this.imgname = new Date().valueOf().toString();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
