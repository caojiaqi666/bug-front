<template>
  <div>
    <div class="components-container">
      <div>
        <h1 style="text-align: center">{{ bug.title }}</h1>
      </div>

      <el-card class="box-card" style="background-color: #8cbda4">
        <el-row>
          <el-col :span="5">
            <span>项目名: {{ bug.relationProject }}</span>
          </el-col>
          <el-col :span="5">
            <span>受理人：{{ bug.receiver }}</span>
          </el-col>
          <el-col :span="5">
            <span>提交时间：{{ bug.createTime }}</span>
          </el-col>
          <el-col :span="4">
            <span>优先级：{{ bug.priority }}</span>
          </el-col>
          <el-col :span="4">
            <span>严重程度：{{ bug.severity }}</span>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card" style="background-color: #8cbda4">
        <el-row>
          <el-col :span="5">
            <span>当前状态: {{ bug.status }}</span>
          </el-col>
          <el-col :span="5">
            <span>缺陷类型：{{ bug.bugType }}</span>
          </el-col>
          <el-col :span="5">
            <span>备注：{{ bug.remarks }}</span>
          </el-col>
        </el-row>
      </el-card>

      <div id="main">
        <mavon-editor
          style="width: 100%; min-height: 10px"
          :value="bug.content"
          :box-shadow="false"
          :subfield="false"
          :toolbars-flag="false"
          default-open="preview"
          :editable="false"
          :scroll-style="true"
        />
      </div>
      <div
        v-for="(cc, index) in bug.comments"
        :key="index"
        style="margin-bottom: 5px"
      >
        <el-card class="box-card">
          <p>
            {{ cc.date | parseTime("{y}-{m}-{d} {h}:{i}") }}, 处理人:{{
              cc.user
            }}， 事件：{{ cc.info }}
          </p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "@/api";

export default {
  name: "ShowBug",
  data() {
    return {
      users: [],
      loading: false,
      bug: {},
      statusOptions: [],
      dialogFormVisible: false,
      textMap: {
        update: "Edit",
        create: "Create",
      },
      dialogStatus: "",
      temp: {
        id: undefined,
        remark: "",
        status: "",
        selectusers: "",
      },
      myBackToTopStyle: {
        right: "50px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1", // 按钮的背景颜色 The background color of the button
      },
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const url = window.location.href;
      const ul = url.split("/");
      const id = ul[ul.length - 1];
      let res = await API.selectBug({ _id: id });
      if (res?.status == 200 && res?.data) {
        this.bug = res?.data?.bugsList?.[0];
        console.log("this.bug: ", this.bug);
        document.title = this.bug.title;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
    .editor-container {
      min-height: 500px;
      margin: 0 0 30px;
      .editor-upload-btn-container {
        text-align: right;
        margin-right: 10px;
        .editor-upload-btn {
          display: inline-block;
        }
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}
</style>
<style>
#tinymcecontent img {
  max-width: 800px;
  text-align: center;
}
</style>
