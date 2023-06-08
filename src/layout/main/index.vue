<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/moudles/setting'
import { nextTick, ref, watch } from 'vue'
let layOutSettingStore = useLayOutSettingStore()
//控制当前组件是否销毁重建
let flag = ref(true)
//监听仓库内部组件是否发生变化，说明用户点击过刷新按钮
watch(
  () => layOutSettingStore.refsh,
  () => {
    //只要点击刷新按钮，就重新销毁组件
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
