import request from './request'

// 登录请求参数
interface LoginParams {
  username: string
  password: string
}

// 登录响应
interface LoginResponse {
  code: number
  message: string
  token: string
}

// 获取用户信息响应
interface UserInfoResponse {
  code: number
  message: string
  id: number
  username: string
  name: string
  email: string
  phone: string
  roles: string[]
  avatar: string
  tenantId?: number
  tenantName?: string
}

// 登录
export const loginApi = (params: LoginParams): Promise<LoginResponse> => {
  // Mock 数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '登录成功',
        token: 'mock-token-' + Date.now()
      })
    }, 500)
  })
  // 实际接口调用
  // return request.post<LoginResponse>('/login', params)
}

// 获取用户信息
export const getUserInfoApi = (): Promise<UserInfoResponse> => {
  // Mock 数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '获取用户信息成功',
        id: 1,
        username: 'admin',
        name: '超级管理员',
        email: 'admin@example.com',
        phone: '13800138000',
        roles: ['superAdmin'],
        avatar: 'https://img.icons8.com/ios-filled/50/000000/user.png'
      })
    }, 500)
  })
  // 实际接口调用
  // return request.get<UserInfoResponse>('/user/info')
}

// 退出登录
export const logoutApi = (): Promise<{ code: number; message: string }> => {
  // Mock 数据
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '退出登录成功'
      })
    }, 500)
  })
  // 实际接口调用
  // return request.post<{ code: number; message: string }>('/logout')
}