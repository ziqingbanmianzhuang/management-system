//使用axios 进行二次封装：使用响应请求拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//第一步：利用axios对象的create方法，去创建axios实例（可以配置一些其他的配置：基础路径、超时的时间等）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径会携带/api
  timeout: 5000, //超时的时间的设置
})
//第二部：设置请求拦截器，
request.interceptors.request.use((config) => {
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  //如配置公共token
  //必须返回配置对象
  config.headers.token = localStorage.getItem('TOKEN')
  return config
})
//第三步：相应拦截器·

request.interceptors.response.use(
  (response) => {
    //成功的回调，可以用来简化参数，这里直接返回响应的data数据
    return response.data
    //指定失败的回调，一般用来处理请求网络错误
  },
  (error) => {
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    //@ts-ignore
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
//向外暴露
export default request
