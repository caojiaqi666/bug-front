import axios from "axios";

const BASEURL = process.env.NODE_ENV === "development" ? "http://localhost:9527" : ""

// 登录接口
export const toLogin = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/login`,
    data,
  });
};

// 注册接口
export const toRegister = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/register`,
    data,
  });
};

// 添加用户
export const addUser = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/addUser`,
    data,
  });
};

// 查询用户列表
export const selectUser = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/selectUser`,
    data,
  });
};

// 修改用户信息
export const changeInfo = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/changeInfo`,
    data,
  });
};

// 删除用户
export const deleteUser = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/deleteUser`,
    data,
  });
};

// 创建bug任务
export const createBug = async (data) => {
  return await axios({
    method: "POST",
    url: `${BASEURL}/createBug`,
    data,
  });
};