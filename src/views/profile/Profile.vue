<template>
  <div class="profile-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      <div class="profile-form">
        <el-form :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" disabled />
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="form.role" disabled />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="所属平台">
            <el-input v-model="form.platform" disabled />
          </el-form-item>
          <el-form-item label="最后登录时间">
            <el-input v-model="form.lastLoginTime" disabled />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存修改</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

interface FormData {
  username: string
  role: string
  email: string
  phone: string
  platform: string
  lastLoginTime: string
}

const form = ref<FormData>({
  username: '',
  role: '',
  email: '',
  phone: '',
  platform: '',
  lastLoginTime: ''
})

// 角色映射
const roleMap: Record<string, string> = {
  superAdmin: '超级管理员',
  platformOperator: '平台运营',
  merchantAdmin: '商家管理员',
  finance: '财务角色',
  customerService: '客服角色'
}

onMounted(() => {
  // 从store获取用户信息
  if (userStore.userInfo) {
    form.value = {
      username: userStore.userInfo.username || '',
      role: roleMap[userStore.roles[0]] || '',
      email: userStore.userInfo.email || '',
      phone: userStore.userInfo.phone || '',
      platform: userStore.userInfo.platform || '',
      lastLoginTime: userStore.userInfo.lastLoginTime || ''
    }
  }
})

const handleSubmit = () => {
  // 模拟保存操作
  ElMessage.success('保存成功')
}

const resetForm = () => {
  if (userStore.userInfo) {
    form.value = {
      username: userStore.userInfo.username || '',
      role: roleMap[userStore.roles[0]] || '',
      email: userStore.userInfo.email || '',
      phone: userStore.userInfo.phone || '',
      platform: userStore.userInfo.platform || '',
      lastLoginTime: userStore.userInfo.lastLoginTime || ''
    }
  }
}
</script>

<style scoped lang="scss">
.profile-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .profile-form {
    margin-top: 20px;
  }
}
</style>