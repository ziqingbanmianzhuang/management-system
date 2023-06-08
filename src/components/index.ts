//引入项目中的全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'
//全局对象
const allGlobalComponent = { SvgIcon, Category }
//引入element-plus 提供方全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//对外暴露插件对象
export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      //@ts-ignore
      app.component(key, allGlobalComponent[key])
    })
    //将element-plus提供的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
