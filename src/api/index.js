import axios from "axios";
import router from "../router/index.js";

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response?.data?.state == 5) {
      return router.push({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath },
      });
    } else if (response?.data?.state == 4) {
      console.log("权限不够");
    }
    return response;
  },
  (error) => {
    console.log("error: ", error);
    return Promise.reject(error);
  }
);

const BASEURL =
  process.env.NODE_ENV === "development" ? "http://localhost:9527" : "";

// 登录接口
export const toLogin = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/login`,
    data,
    withCredentials: true,
  });
};

// 注册接口
export const toRegister = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/register`,
    data,
    withCredentials: true,
  });
};

// 添加用户
export const addUser = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/addUser`,
    data,
    withCredentials: true,
  });
};

// 查询用户列表
export const selectUser = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/selectUser`,
    data,
    withCredentials: true,
  });
};

// 修改用户信息
export const changeInfo = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/changeInfo`,
    data,
    withCredentials: true,
  });
};

// 删除用户
export const deleteUser = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/deleteUser`,
    data,
    withCredentials: true,
  });
};

// 创建bug任务
export const createBug = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/createBug`,
    data,
    withCredentials: true,
  });
};

// 查询bug任务
export const selectBug = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/selectBug`,
    data,
    withCredentials: true,
  });
};

// 删除bug任务
export const deleteBug = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/deleteBug`,
    data,
    withCredentials: true,
  });
};


// 查询数据看板数据
export const searchData = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/searchData`,
    data,
    withCredentials: true,
  });
};

// 查询数据看板折线图数据
export const searchLineData = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/searchLineData`,
    data,
    withCredentials: true,
  });
};
