<template>
  <div class="tabbar-left">
    <!-- 顶部左侧静态 -->
    <el-icon @click="changeIcon">
      <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight" style="margin-left: 10px">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        v-show="item.meta.title"
        :to="item.path"
      >
        <el-icon style="margin-right: 5px">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/moudles/setting'
let LayOutSettingStore = useLayOutSettingStore()
import { useRoute } from 'vue-router'
const $route = useRoute()
// import { ref } from 'vue'
// //定义一个响应式数据控制图标切换
// let fold = ref(false)
// 点击图标地方法
const changeIcon = () => {
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style lang="scss" scoped></style>
