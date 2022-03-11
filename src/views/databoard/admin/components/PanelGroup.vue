<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="user" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户</div>
          <!--<count-to class="card-panel-num" :startVal="0" :endVal="102400" :duration="2600"></count-to>-->

          <div class="card-panel-num">{{ userTotal }}</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户组</div>
          <div class="card-panel-num">{{ groupCount }}</div>
          <!--<count-to class="card-panel-num" :startVal="0" :endVal="81212" :duration="3000"></count-to>-->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="bug" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">总任务</div>
          <div class="card-panel-num">{{ bugTotal }}</div>
          <!--<count-to class="card-panel-num" :startVal="0" :endVal="9280" :duration="3200"></count-to>-->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="star" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">完成的任务</div>
          <div class="card-panel-num">{{ completeBugs }}</div>
          <!--<count-to class="card-panel-num" :startVal="0" :endVal="13600" :duration="3600"></count-to>-->
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { searchData } from "@/api/index";

export default {
  data() {
    return {
      userTotal: 0,
      bugTotal: 0,
      completeBugs: 0,
      projectnames: [],
      groupCount: 0,
    };
  },
  watch: {},
  created() {
    // this.getpname()
    this.getlist();
  },
  methods: {
    async getlist() {
      let res = await searchData();
      if (res?.status == 200) {
        this.userTotal = res?.data?.userTotal || 0;
        this.bugTotal = res?.data?.bugTotal || 0;
        this.completeBugs = res?.data?.completeBugs || 0;
        this.groupCount = 0;
      } else {
        this.$message = res?.data?.msg || "未知错误";
      }
    },
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
