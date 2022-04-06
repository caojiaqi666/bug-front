<template>
  <div class="app-container">
    <!-- <div class="filter-container">
      <p class="warn-content">
        管理员能修改所有信息，管理者只能修改下一级的信息或者创建下一级的用户账号
      </p>
    </div> -->

    <div class="control">
      <div class="control-item">
        <span>用户id：</span>
        <el-input v-model="searchId" placeholder="请输入内容"></el-input>
      </div>
      <div class="control-item">
        <span>姓名：</span>
        <el-input v-model="searchUsername" placeholder="请输入内容"></el-input>
      </div>
      <div class="control-item">
        <span>职位：</span>
        <el-select v-model="searchPower" placeholder="请选择">
          <el-option
            v-for="item in powerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="searchBtn">
        <el-button @click="getuserList" type="primary">查询</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="userlist"
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
      <el-table-column label="日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dateText }}</span>
        </template>
      </el-table-column>

      <el-table-column label="真实姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="职位" align="center">
        <template slot-scope="scope">
          <span>{{ powerOptions[scope.row.power].label }}</span>
        </template>
      </el-table-column>

      <el-table-column label="邮箱" class-name="status-col">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
          <!--<el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="400"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleResetPwd(scope.row)"
            >修改密码</el-button
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
              v-for="item in powerOptions"
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
      uid: 0,
      rolelist: [],
      dialogVisible: false,
      positionlist: [],
      userlist: [],
      changeForm: {},
      statusgroup: [],
      positionMap: new Map(),
      listLoading: false,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" },
      ],
      powerOptions: [
        {
          value: "0",
          label: "游客",
        },
        {
          value: "1",
          label: "普通用户",
        },
        {
          value: "2",
          label: "系统管理员",
        },
        {
          value: "3",
          label: "boss",
        },
      ],
      searchId: "",
      searchUsername: "",
      searchPower: "",
      pageSize: 10,
      pageNum: 1,
      totalNum: 10,
    };
  },
  activated() {
    this.getuserList();
  },
  created() {
    // 获取项目名
    this.getuserList();
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
    async getuserList() {
      let res = await API.selectUser({
        id: this.searchId,
        username: this.searchUsername,
        power: this.searchPower,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.totalNum = res?.data?.total || 0;
      if (res?.status === 200) {
        this.userlist = res?.data?.userList || [];
        console.log("res: ", this.userlist);
        this.userlist.forEach((item) => {
          item.dateText = moment(+item.createDate).format(
            "YYYY年MM月DD日 HH:mm"
          );
        });
      } else {
        this.$message.error(res?.data?.msg || "服务器错误");
      }
    },
    handleChangeInfo(row) {
      this.changeForm._id = row._id;
      this.dialogVisible = true;
    },
    handleRemove(row) {
      console.log("row._id: ", row._id);
      this.deleteUser(row._id);
    },
    handleResetPwd(row) {
      console.log("row: ", row);
      this.$prompt("请输入密码", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
      })
        .then(({ value }) => {
          console.log(row, value);
          const data = {
            _id: row._id,
            passwd: value,
          };
          console.log("data: ", data);
          this.changeInfo(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getuserList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getuserList();
    },
    async changeInfo(data) {
      let res = await API.changeInfo({ ...data });
      if (res?.data?.state == 0) {
        this.$message.success(res?.data?.msg || "操作成功");

        let es = await API.postClientIp({ type: 1 });
        console.log("es: ", es);
      } else {
        this.$message.error(res?.data?.msg || "操作失败");
      }
    },
    async deleteUser(_id) {
      let res = await API.deleteUser({ _id });
      if (res.status == 200 && res.data.state == 0) {
        this.$message.success(res?.data?.msg);
        let es = await API.postClientIp({ type: 1 });
        console.log("es: ", es);
      } else {
        this.$message.error(res?.data?.msg);
      }
      this.getuserList();
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
  margin-right: 30px;
  font-size: 16px;
  span {
    width: 100px;
  }
}
.searchBtn {
  margin-left: auto;
}
</style>
