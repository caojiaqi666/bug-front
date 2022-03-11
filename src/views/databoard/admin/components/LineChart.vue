<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce1 } from "@/utils";
import { searchLineData } from "@/api/index";

export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    // chartData: {
    //   type: Object,
    //   default: null
    // }
  },
  data() {
    return {
      chart: null,
      chartData: {
        createdData: [],
        completedData: [],
        xData: [],
      },
    };
  },

  mounted() {
    this.x();
    this.getdata();
    if (this.autoResize) {
      this.__resizeHanlder = debounce1(() => {
        if (this.chart) {
          this.chart.resize();
        }
      }, 100);
      window.addEventListener("resize", this.__resizeHanlder);
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName("menuBox")[0];
    sidebarElm.addEventListener("transitionend", this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    $dateFormat(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    x() {
      let dateArr = []; // 前七天日期
      for (let i = 7; i >= 1; i--) {
        let formTime = this.$dateFormat(
          new Date(new Date().setHours(0, 0, 0, 0) - 86400 * i * 1000)
        ).split(" ")[0];
        dateArr.push(formTime);
      }
      this.chartData.xData = dateArr;
    },
    async getdata() {
      let res = await searchLineData();
      if (res?.status == 200 && res?.data?.state == 0) {
        console.log("res: ", res);
        this.chartData.createdData = res?.data?.createBugs;
        this.chartData.completedData = res?.data?.completedBugs;
      }
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions(data) {
      var { createdData, completedData, xData } = data;
      this.chart.setOption({
        xAxis: {
          data: xData,
          boundaryGap: false,
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: true,
          },
        },
        legend: {
          data: ["created", "completed"],
        },
        series: [
          {
            name: "创建",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: createdData,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "完成",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: completedData,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      });
    },
  },
};
</script>
