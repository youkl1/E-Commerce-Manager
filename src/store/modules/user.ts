import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi, getUserInfoApi, logoutApi } from '@/api/user'

// 用户角色类型
export type UserRole = 'superAdmin' | 'platformOperator' | 'merchantAdmin' | 'finance' | 'customerService'

// 用户信息接口
interface UserInfo {
  id: number
  username: string
  name: string
  email: string
  phone: string
  roles: UserRole[]
  avatar: string
  tenantId?: number
  tenantName?: string
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)
  const roles = ref<UserRole[]>([])
  const loading = ref<boolean>(false)

  // 登录
  const login = async (username: string, password: string) => {
    loading.value = true
    try {
      const res = await loginApi({ username, password })
      token.value = res.token
      localStorage.setItem('token', res.token)
      return res
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取用户信息
  const getUserInfo = async () => {
    loading.value = true
    try {
      const res = await getUserInfoApi()
      userInfo.value = res
      roles.value = res.roles
      return res
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 退出登录
  const logout = async () => {
    loading.value = true
    try {
      await logoutApi()
      token.value = ''
      userInfo.value = null
      roles.value = []
      localStorage.removeItem('token')
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  // 初始化用户信息
  const initUserInfo = () => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
    }
  }

  return {
    token,
    userInfo,
    roles,
    loading,
    login,
    getUserInfo,
    logout,
    initUserInfo
  }
})