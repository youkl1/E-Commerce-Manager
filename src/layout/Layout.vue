<template>
  <div class="app-container">
    <!-- 头部 -->
    <header class="app-header">
      <div class="header-left">
        <el-button
          type="text"
          class="sidebar-toggle"
          @click="toggleSidebar"
        >
          <el-icon><component :is="sidebarOpened ? 'ArrowLeft' : 'ArrowRight'" /></el-icon>
        </el-button>
        <div class="logo">
          <h1>电商管理系统</h1>
        </div>
      </div>
      <div class="header-right">
        <el-dropdown @command="handleCommand">
          <span class="user-info">
            <img :src="userAvatar" alt="用户头像" class="user-avatar" />
            <span class="user-name">{{ userName }}</span>
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="settings">设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                <span style="color: #f56c6c">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </header>
    <div class="app-main">
      <!-- 侧边栏 -->
      <aside
        class="app-sidebar"
        :class="{ 'sidebar-collapsed': !sidebarOpened }"
      >
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          router
          :collapse="!sidebarOpened"
          :collapse-transition="false"
        >
          <template v-for="route in routes" :key="route.path">
            <el-menu-item
              v-if="!route.children || route.children.length === 0"
              :index="route.path"
            >
              <el-icon :size="20"><component :is="route.meta?.icon || 'Menu'" /></el-icon>
              <template #title>{{ route.meta?.title }}</template>
            </el-menu-item>
            <el-sub-menu
              v-else
              :index="route.path"
            >
              <template #title>
                <el-icon :size="20"><component :is="route.meta?.icon || 'Menu'" /></el-icon>
                <span>{{ route.meta?.title }}</span>
              </template>
              <el-menu-item
                v-for="child in route.children" 
                :key="child.path"
                :index="route.path + '/' + child.path"
              >
                {{ child.meta?.title }}
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </aside>
      <!-- 内容区域 -->
      <main class="app-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { ArrowLeft, ArrowRight, ArrowDown, Menu } from '@element-plus/icons-vue'

// 状态
const appStore = useAppStore()
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const route = useRoute()
const router = useRouter()

// 计算属性
const sidebarOpened = computed(() => appStore.sidebar.opened)
const routes = computed(() => permissionStore.routes)
const userAvatar = computed(() => userStore.userInfo?.avatar || 'https://img.icons8.com/ios-filled/50/000000/user.png')
const userName = computed(() => userStore.userInfo?.name || '未知用户')
const activeMenu = computed(() => {
  const path = route.path
  return path
})

// 方法
const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}

const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile/index')
      break
    case 'settings':
      // 跳转到设置页面
      break
    case 'logout':
      userStore.logout().then(() => {
        router.push('/login')
      })
      break
  }
}

// 生命周期
onMounted(() => {
  // 初始化用户信息
  userStore.initUserInfo()
  // 初始化主题大小
  appStore.initSize()
})
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.app-header {
  height: $header-height;
  background-color: $bg-color-page;
  box-shadow: $box-shadow-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 $spacing-lg;
  z-index: 100;

  .header-left {
    display: flex;
    align-items: center;
    gap: $spacing-md;

    .sidebar-toggle {
      font-size: 20px;
      color: $text-color-primary;
    }

    .logo {
      h1 {
        font-size: $font-size-lg;
        font-weight: 600;
        color: $primary-color;
        margin: 0;
      }
    }
  }

  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      gap: $spacing-sm;
      cursor: pointer;

      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: $border-radius-circle;
      }

      .user-name {
        font-size: $font-size-sm;
        color: $text-color-primary;
      }
    }
  }
}

.app-main {
  flex: 1;
  display: flex;
  overflow: hidden;

  .app-sidebar {
    width: $sidebar-width;
    background-color: $bg-color-page;
    box-shadow: $box-shadow-light;
    transition: width 0.3s ease;
    overflow-y: auto;

    &.sidebar-collapsed {
      width: $sidebar-width-collapsed;
    }

    .sidebar-menu {
      border-right: none;

      .el-menu-item {
        height: 60px;
        line-height: 60px;
        font-size: $font-size-sm;

        &:hover {
          background-color: $bg-color-light;
        }

        &.is-active {
          color: $primary-color;
          background-color: rgba($primary-color, 0.1);

          &:hover {
            background-color: rgba($primary-color, 0.1);
          }
        }
      }

      .el-sub-menu {
        .el-sub-menu__title {
          height: 60px;
          line-height: 60px;
          font-size: $font-size-sm;

          &:hover {
            background-color: $bg-color-light;
          }
        }

        .el-menu-item {
          height: 50px;
          line-height: 50px;
          padding-left: 40px !important;

          &:hover {
            background-color: $bg-color-light;
          }

          &.is-active {
            color: $primary-color;
            background-color: rgba($primary-color, 0.1);

            &:hover {
              background-color: rgba($primary-color, 0.1);
            }
          }
        }
      }
    }
  }

  .app-content {
    flex: 1;
    overflow-y: auto;
    background-color: $bg-color;
  }
}
</style>