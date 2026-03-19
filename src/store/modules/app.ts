import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态
  const sidebar = ref({
    opened: true,
    withoutAnimation: false
  })
  const device = ref('desktop')
  const size = ref('default')

  // 切换侧边栏
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.value.opened = !sidebar.value.opened
    sidebar.value.withoutAnimation = withoutAnimation
  }

  // 关闭侧边栏
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.value.opened = false
    sidebar.value.withoutAnimation = withoutAnimation
  }

  // 打开侧边栏
  const openSidebar = (withoutAnimation: boolean) => {
    sidebar.value.opened = true
    sidebar.value.withoutAnimation = withoutAnimation
  }

  // 设置设备类型
  const setDevice = (device: string) => {
    device.value = device
  }

  // 设置主题大小
  const setSize = (size: string) => {
    size.value = size
    localStorage.setItem('size', size)
  }

  // 初始化主题大小
  const initSize = () => {
    const storedSize = localStorage.getItem('size')
    if (storedSize) {
      size.value = storedSize
    }
  }

  return {
    sidebar,
    device,
    size,
    toggleSidebar,
    closeSidebar,
    openSidebar,
    setDevice,
    setSize,
    initSize
  }
})