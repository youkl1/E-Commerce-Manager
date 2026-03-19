import type { App } from 'vue'
import { useUserStore } from '@/store/modules/user'

// 权限指令
const hasPerm = {
  mounted(el: HTMLElement, binding: any) {
    const userStore = useUserStore()
    const { value } = binding
    const roles = userStore.roles

    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = roles.some(role => value.includes(role))

      if (!hasPermission) {
        el.style.display = 'none'
      }
    } else {
      throw new Error('v-hasPerm directive requires an array of roles')
    }
  }
}

// 注册指令
export default {
  install(app: App) {
    app.directive('hasPerm', hasPerm)
  }
}