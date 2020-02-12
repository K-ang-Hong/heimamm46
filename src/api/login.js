// 登录接口
// 导入axiox
import axios from 'axios';

// 更加方便的设置每个模块的请求 一般会创建create


const loginRequest = axios.create({
    baseURL:process.env.VUE_APP_URL,
    withCredentials: true,
})

// 把注册相关的接口调用 抽取为函数 并暴露 带名字的暴露
export function login(data) {
  return loginRequest({
    url:"/login",
    method:"post",
    data
  });
}