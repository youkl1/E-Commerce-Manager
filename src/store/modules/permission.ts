import { defineStore } from 'pinia'
import { ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '@/router'
import type { UserRole } from './user'

export const usePermissionStore = defineStore('permission', () => {
  // 状态
  const routes = ref<RouteRecordRaw[]>([])
  const addRoutes = ref<RouteRecordRaw[]>([])

  // 生成路由
  const generateRoutes = async (roles: UserRole[]) => {
    let accessedRoutes: RouteRecordRaw[] = []

    // 检查用户是否有超级管理员权限
    if (roles.includes('superAdmin')) {
      accessedRoutes = asyncRoutes
    } else {
      // 过滤出用户有权限的路由
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }

    routes.value = accessedRoutes
    addRoutes.value = accessedRoutes
    return accessedRoutes
  }

  // 过滤路由
  const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: UserRole[]): RouteRecordRaw[] => {
    const res: RouteRecordRaw[] = []

    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }

  // 检查权限
  const hasPermission = (roles: UserRole[], route: RouteRecordRaw): boolean => {
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta?.roles?.includes(role))
    } else {
      return true
    }
  }

  // 重置路由
  const resetRoutes = () => {
    routes.value = []
    addRoutes.value = []
  }

  return {
    routes,
    addRoutes,
    generateRoutes,
    resetRoutes
  }
})