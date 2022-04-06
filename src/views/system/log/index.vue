<template>
  <div id="log" style="padding-left: 20px">
    <p class="warn-content" style="padding-bottom: 20px">操作日志</p>
    <!-- <div class="filter-container">
      <div style="margin-left: 10px">
        <el-select
          v-model="listQuery.classify"
          placeholder="分类"
          clearable
          class="filter-item"
        >
          <el-option
            v-for="(item, index) in classifys"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>

        <el-date-picker
          v-model="value2"
          type="daterange"
          value-format="timestamp"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate"
        />

        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
          >搜索</el-button
        >
      </div>
    </div> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%; min-height: 350px"
    >
      <el-table-column label="id" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dateText }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.typeText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="ip" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.ip }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operator }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operation }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import * as API from "@/api";
import moment from "moment";
export default {
  name: "Log",
  data() {
    return {
      list: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        classify: "",
        starttime: 0,
        endtime: 0,
      },
      count: 10,
      classifys: [],
      value2: "",
      pageSize: 10,
      pageNum: 1,
      totalNum: 0,
    };
  },
  activated() {
    this.classifylist();
  },
  created() {
    this.handleFilter();
    this.classifylist();
  },
  methods: {
    classifylist() {
      // logClassify().then(resp => {
      //   this.classifys = resp.data.classify;
      // });
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.handleFilter();
    },
    changeDate(e) {
      if (e.length === 0) {
        this.listQuery.starttime = 0;
        this.listQuery.endtime = 0;
      } else {
        this.listQuery.starttime = e[0] / 1000;
        this.listQuery.endtime = e[1] / 1000;
      }
    },

    async handleFilter() {
      let res = await API.searchIpList({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      });
      console.log("res: ", res);
      if (res.status == 200 && res.data?.state == 0) {
        this.list = res.data.ipsList || [];
        this.list.forEach((item, index) => {
          item.dateText = moment(+item.date).format("YYYY年MM月DD日 HH:mm");
          item.typeText = ["登录", "修改用户信息", "修改任务"][item.type];
        });
        this.count = res.data.total;
      } else {
        this.$message.error(res?.data?.msg || "未知错误");
      }
      // this.listQuery.page = res.data.page;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.handleFilter();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.handleFilter();
    },
  },
};
</script>

<style scoped></style>
<style>
#log .el-date-editor .el-range-separator {
  width: 7%;
}
.filter-container .filter-item {
  display: inline-fix;
  vertical-align: middle;
  margin-bottom: 3px;
}
</style>
