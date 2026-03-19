<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="login-header">
        <h1>电商管理系统</h1>
        <p>请登录您的账号</p>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-position="top"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            autocomplete="off"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
            :disabled="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'

// 状态
const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref()
const loading = ref(false)

// 表单数据
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})

// 表单规则
const loginRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

// 方法
const handleLogin = async () => {
  // 表单验证
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        // 登录
        await userStore.login(loginForm.username, loginForm.password)
        // 获取用户信息
        await userStore.getUserInfo()
        // 跳转到首页
        router.push('/dashboard')
        ElMessage.success('登录成功')
      } catch (error) {
        ElMessage.error('登录失败，请检查用户名和密码')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);

  .login-form-wrapper {
    width: 400px;
    background-color: $bg-color-page;
    border-radius: $border-radius-base;
    box-shadow: $box-shadow-dark;
    padding: $spacing-xl;

    .login-header {
      text-align: center;
      margin-bottom: $spacing-xl;

      h1 {
        font-size: $font-size-xl;
        font-weight: 600;
        color: $primary-color;
        margin-bottom: $spacing-sm;
      }

      p {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }

    .login-form {
      .login-btn {
        width: 100%;
        height: 48px;
        font-size: $font-size-base;
      }
    }
  }
}
</style>