<template>
  <div class="tabbar-right">
    <el-button
      size="small"
      icon="Refresh"
      circle
      @click="updateRefsh"
    ></el-button>
    <el-button
      size="small"
      icon="FullScreen"
      circle
      @click="fullScreen"
    ></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img
      :src="userStore.avatar"
      alt=""
      style="width: 24px; height: 24px; margin-left: 10px"
    />
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down></arrow-down>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/moudles/setting'
import useUserStore from '@/store/moudles/user'
import { useRouter, useRoute } from 'vue-router'
let layOutSettingStore = useLayOutSettingStore()
let $router = useRouter()
let $route = useRoute()
let userStore = useUserStore() // 刷新（重新销毁并创建组件）
const updateRefsh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh
}
// 全屏模式
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) document.documentElement.requestFullscreen()
  else document.exitFullscreen()
}
const logout = async () => {
  // 第一件事：需要向服务器发请求（退出登录接口）
  // 第二件事：仓库里关于相关数据地清空
  // 第三件事：跳转到登陆页面
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style lang="scss" scoped></style>
