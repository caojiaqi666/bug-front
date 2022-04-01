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
            <span>提交时间：{{ bug.createTimeText }}</span>
          </el-col>
          <el-col :span="4">
            <span>优先级：{{ bug.priorityText }}</span>
          </el-col>
          <el-col :span="4">
            <span>严重程度：{{ bug.severityText }}</span>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="box-card" style="background-color: #8cbda4">
        <el-row>
          <el-col :span="5">
            <span>当前状态: {{ bug.statusText }}</span>
          </el-col>
          <el-col :span="5">
            <span>缺陷类型：{{ bug.bugTypeText }}</span>
          </el-col>
          <el-col :span="5">
            <span>备注：{{ bug.remarks }}</span>
          </el-col>
        </el-row>
      </el-card>

      <div id="main" class="box-card">
        <mavon-editor
          style="width: 100%; min-height: 10px; margin: 5px 0;"
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
        v-for="(item, index) in bug.comments"
        :key="index"
        style="margin-bottom: 5px"
      >
        <el-card class="box-card">
          <p>处理人:{{ item.user }}， 事件：{{ item.info }}</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
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
    moment,
    async fetchData() {
      const url = window.location.href;
      const ul = url.split("/");
      const id = ul[ul.length - 1];
      let res = await API.selectBug({ _id: id });
      if (res?.status == 200 && res?.data) {
        let bugDes = res?.data?.bugsList?.[0];
        bugDes.createTimeText = moment(+bugDes.createTime).format(
          "YYYY年MM月DD日 HH:mm"
        );
        bugDes.priority = bugDes.priority;
        const severityArr = ["致命", "严重", "一般", "轻微", "建议"];
        bugDes.severityText = severityArr[bugDes.severity];
        const statusArr = ["待处理", "处理中", "已解决", "已驳回", "挂起"];
        bugDes.statusText = statusArr[bugDes.status];
        let priorityOptions = ["P0", "P1", "P2", "P3"];
        bugDes.priorityText = priorityOptions[bugDes.priority];
        let bugTypeArr = [
          "功能问题",
          "界面问题",
          "兼容问题",
          "用户体验问题",
          "接口问题",
          "性能问题",
          "安全问题",
          "环境问题",
          "程序逻辑错误",
          "程序校验错误",
          "安全漏洞",
        ];
        bugDes.bugTypeText = bugTypeArr[bugDes.bugType];
        this.bug = bugDes;
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
  #tinymcecontent img {
    max-width: 800px;
    text-align: center;
  }
}
</style>
