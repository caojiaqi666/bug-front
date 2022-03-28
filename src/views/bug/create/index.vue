<template>
  <div class="wrap">
    <div class="left">
      <el-form
        :label-position="labelPosition"
        label-width="30px"
        :model="bugInfoForm"
        :rules="bugInforules"
      >
        <!-- <el-form-item label="关联需求">
          <el-input v-model="bugInfoForm.relationDemand"></el-input>
        </el-form-item> -->
        <el-form-item label="标题">
          <el-input v-model="bugInfoForm.title"></el-input>
        </el-form-item>
        <el-form-item label="详细描述">
          <TuiEditor
            v-model="bugInfoForm.content"
            ref="myQuillEditor"
          ></TuiEditor>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="bugInfoForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div class="control" style="margin-top: 30px">
        <el-button type="primary" @click="handleRemove">清空</el-button>
        <el-button type="success" @click="handleSubmit">提交</el-button>
      </div>
    </div>
    <div class="right">
      <el-form
        :label-position="labelPosition"
        label-width="30px"
        :model="bugInfoForm"
      >
        <el-form-item label="关联项目">
          <!-- <el-input v-model="bugInfoForm.relationProject"></el-input> -->
          <el-select v-model="bugInfoForm.relationProject" placeholder="请选择">
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受理人">
          <el-select v-model="bugInfoForm.receiver" placeholder="请选择">
            <el-option
              v-for="item in receiverOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="bugInfoForm.receiver"></el-input> -->
        </el-form-item>
        <el-form-item label="缺陷类型">
          <el-select v-model="bugInfoForm.bugType" placeholder="请选择">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
        ></el-form-item>
        <el-form-item label="优先级">
          <el-select v-model="bugInfoForm.priority" placeholder="请选择">
            <el-option
              v-for="item in priorityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="严重程度">
          <el-select v-model="bugInfoForm.severity" placeholder="请选择">
            <el-option
              v-for="item in severityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as API from "@/api";
import moment from "moment";
import TuiEditor from "@/components/TuiEditor";
export default {
  name: "CreateForm",
  data() {
    return {
      labelPosition: "top",
      bugInfoForm: {
        relationProject: "",
        relationDemand: "",
        title: "",
        receiver: "",
        severity: 2,
        bugType: 0,
        priority: 2,
        remarks: "",
        content: `[缺陷描述]
[重现步骤]
[期望结果]
[实际结果]
[原因定位]
[修复建议]`,
      },
      typeOptions: [
        {
          value: 0,
          label: "功能问题",
        },
        {
          value: 1,
          label: "界面问题",
        },
        {
          value: 2,
          label: "兼容问题",
        },
        {
          value: 3,
          label: "用户体验问题",
        },
        {
          value: 4,
          label: "接口问题",
        },
        {
          value: 5,
          label: "性能问题",
        },
        {
          value: 6,
          label: "安全问题",
        },
        {
          value: 7,
          label: "环境问题",
        },
        {
          value: 8,
          label: "程序逻辑错误",
        },
        {
          value: 9,
          label: "程序校验错误",
        },
        {
          value: 10,
          label: "安全漏洞",
        },
      ],
      priorityOptions: [
        {
          value: 0,
          label: "P0",
        },
        {
          value: 1,
          label: "P1",
        },
        {
          value: 2,
          label: "P2",
        },
        {
          value: 3,
          label: "P3",
        },
      ],
      severityOptions: [
        {
          value: 0,
          label: "致命",
        },
        {
          value: 1,
          label: "严重",
        },
        {
          value: 2,
          label: "一般",
        },
        {
          value: 3,
          label: "轻微",
        },
        {
          value: 4,
          label: "建议",
        },
      ],
      receiverOptions: [],
      projectOptions: [],
      bugInforules: {
        // title: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  components: { TuiEditor },
  mounted() {
    this.getProjectList();
    this.getUserList();
  },
  methods: {
    moment,
    handleRemove() {
      this.bugInfoForm = {
        relationProject: "",
        relationDemand: "",
        title: "",
        receiver: "",
        severity: 2,
        bugType: 0,
        priority: 2,
        remarks: "",
        content: `[缺陷描述]
[重现步骤]
[期望结果]
[实际结果]
[原因定位]
[修复建议]`,
      };
    },
    async handleSubmit() {
      let res = await API.createBug(this.bugInfoForm);
      console.log("res: ", res);
      if (res?.status == 200 && res?.data?.state == 0) {
        this.$message({
          message: res?.data?.msg || "创建任务成功",
          type: "success",
        });
        this.handleRemove();
      } else {
        this.$message({
          message: res?.data?.msg || "创建任务失败",
          type: "error",
        });
      }
    },
    async getProjectList() {
      this.listLoading = true;
      let res = await API.selectProject({});
      if (res?.status === 200) {
        let projectList = res?.data?.projectList || [];
        projectList?.forEach((item) => {
          this.projectOptions.push({
            value: item.projectName,
            label: item.projectName,
          });
        });
      } else {
        this.$message.error(res?.data?.msg || "服务器错误");
      }
      this.listLoading = false;
    },
    async getUserList() {
      let res = await API.selectUser({});
      console.log("res: ", res);
      if (res?.status === 200) {
        let receiverOptions = res?.data?.userList || [];
        receiverOptions?.forEach((item) => {
          this.receiverOptions.push({
            value: item.username,
            label: item.username,
          });
        });
      } else {
        this.$message.error(res?.data?.msg || "服务器错误");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .el-form-item {
    margin: 0 !important;
  }
  .el-form-item__label {
    margin: 0 !important;
  }
  .left {
    width: 60%;
    border-right: 1px solid rgb(175, 166, 166);
    padding: 0 40px 0 0;
  }
  .right {
    width: 40%;
    padding: 0 0px 0 40px;
    .el-input {
      width: 60%;
    }
  }
}
</style>
