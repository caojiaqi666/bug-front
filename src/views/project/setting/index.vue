<template>
  <div class="app-container" style="padding-left: 20px">
    <div class="filter-container">
      <!-- <p class="warn-content">
        如果删除的此项目的某参与者， 在他任务里面还是会显示，只不过没操作权限
      </p> -->
    </div>

    <div class="control">
      <div class="control-item">
        <el-input v-model="searchParams._id" placeholder="id"></el-input>
      </div>
      <div class="control-item">
        <el-input
          v-model="searchParams.projectName"
          placeholder="项目名称"
        ></el-input>
      </div>
      <div class="control-item">
        <el-select v-model="searchParams.state" placeholder="状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="searchBtn">
        <el-button
          type="primary"
          @click="
            dialogFormVisible = true;
            createOrChange = true;
          "
          >创建项目</el-button
        >
        <el-button @click="getProjectList" type="primary">查询</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="projectList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.details }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.creator }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.stimeText }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="结束时间" class-name="status-col">
        <template slot-scope="scope">
          <span>{{ scope.row.etimeText }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="项目状态" class-name="status-col">
        <template slot-scope="scope">
          {{ scope.row.statusText }}
        </template>
      </el-table-column>

      <el-table-column label="当前进度" class-name="status-col">
        <template slot-scope="scope"> {{ scope.row.process }}% </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleChangeInfo(scope.row)"
            >更改信息
          </el-button>
          <el-button size="mini" type="danger" @click="handleRemove(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
    <div>
      <el-dialog title="创建项目" :visible.sync="dialogFormVisible">
        <el-form :model="createForm">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input
              v-model="createForm.projectName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="详情" :label-width="formLabelWidth">
            <el-input
              v-model="createForm.details"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="进度" :label-width="formLabelWidth">
            <el-input
              v-model="createForm.process"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="createForm.state" placeholder="请选择项目状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="createProject">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as API from "@/api";
import moment from "moment";

export default {
  name: "Usermanager",
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
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      totalNum: 0,
      statusOptions: [
        {
          value: 0,
          label: "正在沟通",
        },
        {
          value: 1,
          label: "准备就绪待启动",
        },
        {
          value: 2,
          label: "已启动进行中",
        },
        {
          value: 3,
          label: "暂时挂起",
        },
        {
          value: 4,
          label: "完成",
        },
      ],
      listLoading: false,
      projectList: [],
      dialogFormVisible: false,
      searchParams: {
        _id: "",
        projectName: "",
        state: "",
      },
      dialogFormVisible: false,
      createForm: {
        projectName: "",
        details: "",
        process: "",
        state: "",
      },
      formLabelWidth: "50px",
      createOrChange: true,
    };
  },
  activated() {
    this.getProjectList();
  },
  created() {
    // 获取项目名
    this.getProjectList();
  },
  methods: {
    moment,
    cancel() {
      this.dialogFormVisible = false;
    },
    HandlerUpdate() {
      this.changeInfo(this.createForm);
      this.dialogFormVisible = false;
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    async getProjectList() {
      this.listLoading = true;
      let res = await API.selectProject({
        ...this.searchParams,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.totalNum = res?.data.total || 0;
      if (res?.status === 200) {
        this.projectList = res?.data?.projectList || [];
        this.projectList?.forEach((item) => {
          item.stimeText = moment(+item.startTime).format(
            "YYYY年MM月DD日 HH:mm"
          );
          item.etimeText = moment(+item.endTime).format("YYYY年MM月DD日 HH:mm");
          const statusArr = [
            "正在沟通",
            "准备就绪待启动",
            "已启动进行中",
            "暂时挂起",
            "完成",
          ];
          item.statusText = statusArr[item.state];
        });
      } else {
        this.$message.error(res?.data?.msg || "服务器错误");
      }
      this.listLoading = false;
    },
    handleChangeInfo(row) {
      this.createOrChange = false;
      this.createForm.projectName = row.projectName;
      this.createForm.details = row.details;
      this.createForm.process = row.process;
      this.createForm.state = row.state;
      this.dialogFormVisible = true;
    },
    async handleRemove(row) {
      let res = await API.deleteProject(row.id);
      if (res?.status == 200 && res?.data?.state == 0) {
        this.$message.success(res?.data?.msg);
        this.getProjectList();
      } else {
        this.$message.error(res?.data?.msg || "删除失败");
      }
    },
    toDetail(row) {
      console.log("row: ", row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getProjectList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getProjectList();
    },
    async changeInfo(data) {
      let res = API.changeInfo({ ...data });
      if (res?.data?.state == 0) {
        this.$message.success(res?.data?.msg || "操作成功");
      } else {
        this.$message.error(res?.data?.msg || "操作失败");
      }
    },
    async createProject() {
      if (this.createOrChange) {
        this.dialogFormVisible = true;
        let res = await API.createProject(this.createForm);
        if (res?.status == 200 && res?.data?.state == 0) {
          this.$message.success(res?.data?.msg);
        } else {
          this.$message.error(res?.data?.msg || "未知错误");
        }
        this.dialogFormVisible = false;
      } else {
        console.log(111);
        this.HandlerUpdate();
      }
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
