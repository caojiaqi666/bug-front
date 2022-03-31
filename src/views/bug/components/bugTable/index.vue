<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <p class="warn-content">管理员能修改所有信息</p>
    </div> -->

    <div class="control">
      <div class="control-item">
        <el-input v-model="searchParams.searchId" placeholder="id"></el-input>
      </div>
      <div class="control-item">
        <el-input
          v-model="searchParams.submitter"
          placeholder="提交人"
        ></el-input>
      </div>
      <div class="control-item">
        <el-select v-model="searchParams.priority" placeholder="优先级">
          <el-option
            v-for="item in priorityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="control-item">
        <el-select v-model="searchParams.severity" placeholder="严重程度">
          <el-option
            v-for="item in severityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="control-item">
        <el-select v-model="searchParams.status" placeholder="状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="control-item">
        <el-input v-model="searchParams.title" placeholder="标题"></el-input>
      </div>

      <div class="searchBtn">
        <el-button @click="getBugsList" type="primary">查询</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="bugsList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关联项目" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.relationProject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.submitter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="受理人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.receiver }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.timeText }}</span>
        </template>
      </el-table-column>

      <el-table-column label="优先级" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.priText }}</span>
        </template>
      </el-table-column>

      <el-table-column label="严重程度" class-name="status-col">
        <template slot-scope="scope">
          <span>{{ scope.row.severityText }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" class-name="status-col">
        <template slot-scope="scope">
          <el-button size="mini" :type="statusArr[scope.row.status]">{{
            scope.row.statusText
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="320"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 0"
            @click="handleStart(scope.row._id)"
            >开始处理
          </el-button>
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 1"
            @click="handleFixed(scope.row._id)"
            >已解决
          </el-button>
          <el-button
            size="mini"
            type="text"
            v-if="scope.row.status == 0"
            @click="handleBack(scope.row._id)"
            >驳回
          </el-button>
          <el-button type="text" size="mini">
            <router-link
              target="_blank"
              :to="'/showbug/' + scope.row._id"
              class="link-type"
              align="center"
            >
              <span>查看详情</span>
            </router-link></el-button
          >
          <el-button
            size="mini"
            type="text"
            @click="handleChangeInfo(scope.row)"
            >更改信息
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="修改任务信息"
      width="30%"
    >
      <el-form ref="postForm">
        <el-form-item label="标题:">
          <el-input v-model="changeForm.title" />
        </el-form-item>
        <el-form-item label="优先级:">
          <el-select v-model="changeForm.priority" placeholder="请选择">
            <el-option
              v-for="item in priorityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="严重程度：">
          <el-select v-model="changeForm.severity" placeholder="请选择">
            <el-option
              v-for="item in severityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="HandlerUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
    >
    </el-pagination>
  </div>
</template>

<script>
import * as API from "@/api";
import moment from "moment";

export default {
  name: "BugTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger",
      };
      return statusMap[status];
    },
    toJobName(id, positionMap) {
      return positionMap.get(id);
    },
  },
  props: {
    type: String,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      totalNum: 0,
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
      statusOptions: [
        {
          value: 0,
          label: "待处理",
        },
        {
          value: 1,
          label: "处理中",
        },
        {
          value: 2,
          label: "已解决",
        },
        {
          value: 3,
          label: "已驳回",
        },
        {
          value: 4,
          label: "挂起",
        },
      ],
      listLoading: false,
      bugsList: [],
      dialogVisible: false,
      changeForm: {},
      searchParams: {
        _id: "",
        submitter: "",
        priority: "",
        severity: "",
        status: "",
        title: "",
      },
      statusArr: ["danger", "warning", "success", "primary", "info"],
    };
  },
  activated() {
    this.getBugsList();
  },
  created() {
    // 获取项目名
    this.getBugsList();
  },
  methods: {
    moment,
    cancel() {
      this.dialogVisible = false;
    },
    HandlerUpdate() {
      this.changeBug(this.changeForm);
      console.log("this.changeForm: ", this.changeForm);
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async getBugsList() {
      this.listLoading = true;
      let params = {
        ...this.searchParams,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if (this._props.type == "myCreate") {
        params.submitter = this.$store?.state?.userInfo.username;
      } else if (this._props.type == "myTask") {
        params.receiver = this.$store?.state?.userInfo.username;
      }
      let res = await API.selectBug(params);
      this.totalNum = res?.data.total || 0;
      if (res?.status === 200) {
        this.bugsList = res?.data?.bugsList || [];
        this.bugsList?.forEach((item) => {
          item.timeText = moment(+item.createTime).format(
            "YYYY年MM月DD日 HH:mm"
          );
          item.priText = `P${item.priority}`;
          const severityArr = ["致命", "严重", "一般", "轻微", "建议"];
          item.severityText = severityArr[item.severity];
          const statusArr = ["待处理", "处理中", "已解决", "已驳回", "挂起"];
          item.statusText = statusArr[item.status];
        });
      } else {
        this.$message.error(res?.data?.msg || "服务器错误");
      }
      this.listLoading = false;
    },
    handleChangeInfo(row) {
      this.changeForm._id = row._id;
      this.dialogVisible = true;
      // this.changeForm.title = row.title;
      // this.changeForm.priority = row.priority;
      // this.changeForm.severity = row.severity;
    },
    async handleRemove(row) {
      let res = await API.deleteBug(row.id);
      if (res?.status == 200 && res?.data?.state == 0) {
        this.$message.success(res?.data?.msg);
        window.location.reload();
      } else {
        this.$message.error(res?.data?.msg || "删除失败");
      }
    },
    toDetail(row) {
      this.$router.push({ path: "/showBug/" + row._id });
      const { href } = Router.resolve({
        path: `/showBug/${row.id}`,
      });
      window.open(href, "_blank");
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBugsList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getBugsList();
    },
    async changeBug(data) {
      let res = await API.changeBug({ ...data });
      if (res?.data?.state == 0) {
        this.$message.success(res?.data?.msg || "操作成功");
        this.getBugsList();
      } else {
        this.$message.error(res?.data?.msg || "操作失败");
      }
    },
    async handleStart(_id) {
      this.$alert("确定开始处理", "确定开始处理?", {
        confirmButtonText: "确定",
        callback: async (action) => {
          let res = await API.changeBug({ _id, status: 1 });
          if (res.status == 200 && res.data?.state == 0) {
            this.$message.success(res?.data?.msg);
            this.getBugsList();
          } else {
            this.$message.error(res?.data?.msg || "操作失败");
          }
        },
      });
    },
    async handleFixed(_id) {
      this.$alert("确定已解决", "确定已解决?", {
        confirmButtonText: "确定",
        callback: async (action) => {
          let res = await API.changeBug({ _id, status: 2 });
          if (res.status == 200 && res.data?.state == 0) {
            this.$message.success(res?.data?.msg);
            this.getBugsList();
          } else {
            this.$message.error(res?.data?.msg || "操作失败");
          }
        },
      });
    },
    async handleBack(_id) {
      this.$alert("确定驳回", "确定驳回?", {
        confirmButtonText: "确定",
        callback: async (action) => {
          let res = await API.changeBug({ _id, status: 3 });
          if (res.status == 200 && res.data?.state == 0) {
            this.$message.success(res?.data?.msg);
            this.getBugsList();
          } else {
            this.$message.error(res?.data?.msg || "操作失败");
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  float: right;
  margin-top: 20px;
}
.control {
  display: flex;
  margin: 20px 0px;
}
.control-item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  font-size: 16px;
  span {
    width: 100px;
  }
}
.searchBtn {
  margin-left: auto;
}
</style>
