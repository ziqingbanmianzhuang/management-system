//定义小仓库地数据的state类型
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
export interface CategoryState {
  c1Id: string | number
  c2Id: string | number
  c3Id: string | number
  c1Arr: CategoryObj[]
  c2Arr: CategoryObj[]
  c3Arr: CategoryObj[]
}
