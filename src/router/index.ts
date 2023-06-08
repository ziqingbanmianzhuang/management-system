//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes.ts'
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //使用前端路由，当切换到新路由的时候，想要页面滚动到顶部，或者保持原先的滚动位置，就像重新加载页面那样，vue-router可以允许自定仪路由切换时页面如何滚动
  scrollBehavior() {
    //return  期望滚动到哪一个位置
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
