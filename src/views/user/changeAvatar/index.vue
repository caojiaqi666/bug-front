<template>
  <div style="padding-left: 20px">
    <el-upload
      class="avatar-uploader"
      action="http://localhost:9527/upload/imgs"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :multiple="false"
      :on-success="handleAvatarSuccess"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button type="primary" @click="changeAvatar">修改头像</el-button>
    <!-- <img :src="imgServeUrl" alt=""> -->
  </div>
</template>
<script>
import * as API from "@/api";
export default {
  data() {
    return {
      imageUrl: "",
      imgServeUrl: "",
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //上传之后的检测
    beforeAvatarUpload(file) {
      //是否是图片格式
      let isImage = /^image\/(gif|jpeg|png)$/.test(file.type);
      //是否小于2M
      let isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error("上传头像必须是jpg/png/gif图片");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImage && isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传成功之后
    handleAvatarSuccess(res, file) {
      console.log("res: ", res);
      if (res.code == 0) {
        this.imgServeUrl = res.url;
        console.log("this.imgServeUrl : ", this.imgServeUrl);
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message({
          type: "success",
          message: "上传成功",
          duration: 1000,
        });
      } else {
        this.$message({
          type: "error",
          message: "上传失败" + res?.msg,
          duration: 1000,
        });
      }
    },
    async changeAvatar() {
      let res = await API.changeAvatar({ avatar: this.imgServeUrl });
      if (res?.data?.state == 0) {
        this.$store.dispatch("login", res.data.userInfo);
        this.$message.success(res?.data?.msg);
        this.imageUrl = "";
      } else {
        this.$message.error(res?.data?.msg || "未知错误");
      }
    },
  },
};
</script>

<style>
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
