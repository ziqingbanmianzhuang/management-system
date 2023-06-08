// 小仓库，layout组件相关配置仓库
import { defineStore } from 'pinia'
let useOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, //拥护控制菜单折叠还是收起,
      refsh: false, //仓库这个属性用于控制刷新效果
    }
  },
})
export default useOutSettingStore
