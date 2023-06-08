import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
// svg需要配置代码
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入全局样式
import '@/styles/index.scss'
import router from './router'
import pinia from './store'
//#region
//测试代码，测试假的接口能否使用
// import axios from 'axios'
// axios({
//   url: '/api/user/login',
//   method: 'post',
//   data: {
//     username: 'admin',
//     password:'111111'
//   }
// })
//#endregion
//引入自定义插件对象，注册整个项目全局组件
import globalComponent from '@/components/index.ts'
// 引入路由鉴权文件
import './permisstion'
const app = createApp(App)
//安装自定义插件
app.use(globalComponent)
app.use(ElementPlus, {
  locale: zhCn,
})
//注册模板路由
app.use(router)
//注册仓库
app.use(pinia)
import 'virtual:svg-icons-register'
//将应用挂载到节点上
app.mount('#app')
