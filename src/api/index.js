import axios from "axios";

const BASEURL = "http://localhost:9527";

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