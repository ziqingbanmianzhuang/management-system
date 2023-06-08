<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item>
        <el-select
          label="一级分类"
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          label="二级分类"
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          label="三级分类"
          v-model="categoryStore.c3Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
// 引入仓库
import useCategoryStore from '@/store/moudles/category'
// 引入分类接口方法
// 引入生命周期函数
import { onMounted } from 'vue'
let categoryStore = useCategoryStore()
// 组件挂载完毕
onMounted(() => {
  getC1()
})
//获取一级分类的数据方法·
const getC1 = () => {
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''

  categoryStore.getC1()
}
const handler = () => {
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
const handler1 = () => {
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''

  categoryStore.getC3()
}
//接受父组件传递过来scene
defineProps(['scene'])
</script>

<style lang="scss" scoped></style>
