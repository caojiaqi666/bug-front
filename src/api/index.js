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
