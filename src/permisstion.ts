// 路由鉴权：鉴权，项目中路由能不能被访问的权限设置（某一个路由什么条件下可以被访问，什么条件下不可以被访问）
import router from '@/router'
import useUserStore from './store/moudles/user'
import pinia from './store'
import nprogress from 'nprogress'
import setting from './setting.ts'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
let userStore = useUserStore(pinia)
// 1：任意路由切换实现进度条业务---nprogress
//2.路由鉴权（路由组件访问权限地设置）
//全部路由组件，登录|404|任意路由|首页|数据大屏|权限管理|商品管理

//用户未登录：可以访问login,其余六个路由不能访问（指向login）
//用户登录成功：不可以访问login(指向首页)，其余地路由可以访问
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (to.path == '/login') {
      // 登录成功不能再访问login，指向首页
      next({ path: '/' })
    } else {
      // 登录成功之后访问其他路由（登录排除）
      // 如果有用户信息
      if (username) {
        next()
      } else {
        // 如果没有用户信息，在守卫这里发请求获取到用户信息再放行
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
