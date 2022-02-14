<template>
  <div class="app-container">
    <div class="filter-container">
      <p class="warn-content">
        管理员能修改所有信息，管理者只能修改下一级的信息或者创建下一级的用户账号
      </p>
    </div>

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
        <!-- <el-input v-model="searchParams.status" placeholder="状态"></el-input> -->
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
      <el-table-column label="标题" align="center" width="300">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.submitter }}</span>
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
          <span>{{ scope.row.statusText }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="400"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toDetail(scope.row)"
            >查看详情</el-button
          >
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

    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="提示"
      width="30%"
    >
      <el-form ref="postForm" />
      <el-form ref="postForm">
        <el-form-item label="真实姓名">
          <el-input v-model="changeForm.username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="changeForm.email" />
        </el-form-item>

        <el-form-item label="职位：">
          <el-select v-model="changeForm.power" placeholder="请选择">
            <el-option
              v-for="item in priorityOptions"
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
        searchId: "",
        submitter: "",
        priority: "",
        severity: "",
        status: "",
        title: "",
      },
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
      this.changeInfo(this.changeForm);
      console.log("this.changeForm: ", this.changeForm);
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async getBugsList() {
      this.listLoading = true;
      let res = await API.selectBug({
        ...this.searchParams,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      console.log("res: ", res);
      this.totalNum = res?.data.total || 0;
      if (res?.status === 200) {
        this.bugsList = res?.data?.bugsList || [];
        console.log("res: ", res);
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
    },
    handleRemove(row) {
      console.log("row._id: ", row._id);
    },
    toDetail(row) {
      console.log("row: ", row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBugsList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getBugsList();
    },
    async changeInfo(data) {
      let res = API.changeInfo({ ...data });
      if (res?.data?.state == 0) {
        this.$message.success(res?.data?.msg || "操作成功");
      } else {
        this.$message.error(res?.data?.msg || "操作失败");
      }
    },
    async deleteBug(_id) {
      // let res = API.deleteBug({ _id });
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
