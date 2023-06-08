<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0">左</el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到我的managemet system</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              class="login-btn"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
let $route = useRoute()
//引入获取当前时间地函数
import { getTime } from '@/utils/time'
//引入用户相关的小仓库
import useUserStore from '@/store/moudles/user'
let useStore = useUserStore()
//创建路由器
let $router = useRouter()
//获取表单
let loginForms = ref()
//收集账号与密码的数据
let loginForm = reactive({ username: 'admin', password: 'atguigu123' })
//登录按钮
//通知仓库去发登陆请求
//请求成功=》在首页展示数据的地方
//请求失败=》弹出登录失败的信息

//定义变量控制加载效果
let loading = ref(false)
const login = async () => {
  //登陆之前对表单进行校验
  //保证全部表单校验通过之后再发请求
  await loginForms.value.validate()

  //点击登录按钮开始加载
  loading.value = true
  try {
    //登录成功
    await useStore.userLogin(loginForm)
    loading.value = false //加载结束
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    //提示成功的信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
  } catch (error) {
    //登录失败
    loading.value = false //加载结束
    //提示错误信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
//自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
  //rule为校验规则对象
  //value为表单元素文本内容
  //函数：如果符合条件callback放行通过
  //如果不符合条件callback方法，注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少为五位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  //rule为校验规则对象
  //value为表单元素文本内容
  //函数：如果符合条件callback放行通过
  //如果不符合条件callback方法，注入错误提示信息
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('账号长度至少为六位'))
  }
}

//定义表单数据对象
const rules = {
  //required:代表这个字段必要校验
  //min:文本长度可以为多少位
  //max:文本长度最多多少位
  //message 错误的提示信息
  //trigger:检验表单的时机，change,文本要发生变化的时候出发检验，blur:失去焦点的时候触发校验规则
  username: [
    // { required: true, min: 5, max: 10, message: '账号为5-10位', trigger: 'change' }
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码为6-15位', trigger: 'change' }
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
