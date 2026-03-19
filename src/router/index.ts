import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'

// 静态路由
const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
      hidden: true
    }
  }
]

// 动态路由
const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '首页',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: {
          title: '数据看板',
          roles: ['superAdmin', 'platformOperator', 'merchantAdmin', 'finance', 'customerService']
        }
      }
    ]
  },
  // 系统管理模块
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/User.vue'),
        meta: {
          title: '用户管理',
          roles: ['superAdmin']
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/Role.vue'),
        meta: {
          title: '角色管理',
          roles: ['superAdmin']
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/Menu.vue'),
        meta: {
          title: '菜单管理',
          roles: ['superAdmin']
        }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/system/log/Log.vue'),
        meta: {
          title: '操作日志',
          roles: ['superAdmin', 'platformOperator']
        }
      }
    ]
  },
  // 商品管理模块
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '商品管理',
      icon: 'el-icon-goods'
    },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: () => import('@/views/product/list/ProductList.vue'),
        meta: {
          title: '商品列表',
          roles: ['superAdmin', 'platformOperator', 'merchantAdmin']
        }
      },
      {
        path: 'add',
        name: 'ProductAdd',
        component: () => import('@/views/product/add/ProductAdd.vue'),
        meta: {
          title: '新增商品',
          roles: ['superAdmin', 'merchantAdmin']
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/product/category/Category.vue'),
        meta: {
          title: '分类管理',
          roles: ['superAdmin', 'platformOperator', 'merchantAdmin']
        }
      },
      {
        path: 'spec',
        name: 'Spec',
        component: () => import('@/views/product/spec/Spec.vue'),
        meta: {
          title: '规格管理',
          roles: ['superAdmin', 'merchantAdmin']
        }
      },
      {
        path: 'stock',
        name: 'Stock',
        component: () => import('@/views/product/stock/Stock.vue'),
        meta: {
          title: '库存管理',
          roles: ['superAdmin', 'merchantAdmin']
        }
      }
    ]
  },
  // 订单管理模块
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '订单管理',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/list/OrderList.vue'),
        meta: {
          title: '订单列表',
          roles: ['superAdmin', 'platformOperator', 'merchantAdmin', 'finance', 'customerService']
        }
      },
      {
        path: 'detail',
        name: 'OrderDetail',
        component: () => import('@/views/order/detail/OrderDetail.vue'),
        meta: {
          title: '订单详情',
          roles: ['superAdmin', 'platformOperator', 'merchantAdmin', 'finance', 'customerService'],
          hidden: true
        }
      },
      {
        path: 'refund',
        name: 'Refund',
        component: () => import('@/views/order/refund/Refund.vue'),
        meta: {
          title: '退款售后',
          roles: ['superAdmin', 'platformOperator', 'merchantAdmin', 'finance', 'customerService']
        }
      }
    ]
  },
  // 商家管理模块
  {
    path: '/merchant',
    name: 'Merchant',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '商家管理',
      icon: 'el-icon-office-building'
    },
    children: [
      {
        path: 'audit',
        name: 'MerchantAudit',
        component: () => import('@/views/merchant/audit/MerchantAudit.vue'),
        meta: {
          title: '入驻审核',
          roles: ['superAdmin', 'platformOperator']
        }
      },
      {
        path: 'list',
        name: 'MerchantList',
        component: () => import('@/views/merchant/list/MerchantList.vue'),
        meta: {
          title: '商家列表',
          roles: ['superAdmin', 'platformOperator']
        }
      }
    ]
  },
  // 财务模块
  {
    path: '/finance',
    name: 'Finance',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '财务管理',
      icon: 'el-icon-money'
    },
    children: [
      {
        path: 'reconciliation',
        name: 'Reconciliation',
        component: () => import('@/views/finance/reconciliation/Reconciliation.vue'),
        meta: {
          title: '订单对账',
          roles: ['superAdmin', 'finance']
        }
      },
      {
        path: 'fund',
        name: 'Fund',
        component: () => import('@/views/finance/fund/Fund.vue'),
        meta: {
          title: '资金流水',
          roles: ['superAdmin', 'finance']
        }
      },
      {
        path: 'invoice',
        name: 'Invoice',
        component: () => import('@/views/finance/invoice/Invoice.vue'),
        meta: {
          title: '发票管理',
          roles: ['superAdmin', 'finance']
        }
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/finance/report/Report.vue'),
        meta: {
          title: '财务报表',
          roles: ['superAdmin', 'finance']
        }
      }
    ]
  },
  // 客服模块
  {
    path: '/customer',
    name: 'Customer',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '客服管理',
      icon: 'el-icon-chat-line-round'
    },
    children: [
      {
        path: 'ticket',
        name: 'Ticket',
        component: () => import('@/views/customer/ticket/Ticket.vue'),
        meta: {
          title: '售后工单',
          roles: ['superAdmin', 'customerService']
        }
      },
      {
        path: 'complaint',
        name: 'Complaint',
        component: () => import('@/views/customer/complaint/Complaint.vue'),
        meta: {
          title: '客诉管理',
          roles: ['superAdmin', 'customerService']
        }
      }
    ]
  },
  // 个人中心
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/layout/Layout.vue'),
    meta: {
      title: '个人中心',
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'index',
        name: 'ProfileIndex',
        component: () => import('@/views/profile/Profile.vue'),
        meta: {
          title: '个人信息',
          roles: ['superAdmin', 'platformOperator', 'merchantAdmin', 'finance', 'customerService']
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  
  // 检查是否登录
  if (!userStore.token) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
    return
  }
  
  // 检查是否有权限信息
  if (permissionStore.routes.length === 0) {
    // 获取用户信息
    await userStore.getUserInfo()
    // 生成路由
    await permissionStore.generateRoutes(userStore.roles)
    // 动态添加路由
    permissionStore.routes.forEach(route => {
      router.addRoute(route)
    })
    // 重新导航
    next({ ...to, replace: true })
  } else {
    next()
  }
})

export default router
export { constantRoutes, asyncRoutes }