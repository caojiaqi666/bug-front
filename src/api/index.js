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

// 修改密码
export const changePwd = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/changePwd`,
    data,
    withCredentials: true,
  });
};

// 修改邮箱
export const changeEmail = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/changeEmail`,
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

// 修改本人头像
export const changeAvatar = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/changeAvatar`,
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

// 修改bug
export const changeBug = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/changeBug`,
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

// 上传图片接口
export const uploadImgs = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/upload/imgs`,
    data,
    withCredentials: true,
  });
};

// 创建项目
export const createProject = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/createProject`,
    data,
    withCredentials: true,
  });
};

// 删除项目
export const deleteProject = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/deleteProject`,
    data,
    withCredentials: true,
  });
};

// 修改项目
export const changeProject = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/changeProject`,
    data,
    withCredentials: true,
  });
};

// 查找项目
export const selectProject = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/selectProject`,
    data,
    withCredentials: true,
  });
};