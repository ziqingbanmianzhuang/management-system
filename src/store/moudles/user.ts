//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入登录的数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type.ts'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
//引入请求接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user/index.ts'
//引入常量路由
import { constantRoute } from '@/router/routes'
//创见用户小仓库
let useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户的唯一标识,
      menuRoutes: constantRoute, //仓库存储生成菜单的需要的数组（路由）
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      //登录请求

      let res: loginResponseData = await reqLogin(data)
      //如果登陆成功200
      //由于pinia|vuex存储其实时利用js对象
      if (res.code === 200) {
        this.token = res.data as string
        //本地存储持久化存储一份
        SET_TOKEN(res.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    // 获取用户信息地方法
    async userInfo() {
      let userinfo: userInfoResponseData = await reqUserInfo() //获取用户信息存储在仓库中（用户头像和名字）
      if (userinfo.code == 200) {
        this.username = userinfo.data.name
        this.avatar = userinfo.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(userinfo.message))
      }
    },
    async userLogout() {
      let res: any = await reqLogout()
      if (res.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        localStorage.removeItem('TOKEN')
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
  },
  //异步|逻辑的地方
  getters: {},
})
//对外暴露获取小仓库的方法
export default useUserStore
