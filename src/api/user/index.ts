//统一管理拥护相关的接口
// import type { loginForm,loginResponseData,userResponseData } from './type';
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'
import request from '@/utils/request'
//统一管理接口
enum API {
  // LOGIN_URL = "/user/login",
  LOGIN_URL = '/admin/acl/index/login',
  // USERINFO_URL="/user/info"
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
//暴露请求参数
//登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
