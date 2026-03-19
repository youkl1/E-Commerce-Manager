<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-code">404</div>
      <div class="error-message">页面不存在</div>
      <div class="error-desc">抱歉，您访问的页面不存在或已被删除</div>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.error-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $bg-color;

  .error-content {
    text-align: center;

    .error-code {
      font-size: 120px;
      font-weight: 600;
      color: $primary-color;
      margin-bottom: $spacing-md;
    }

    .error-message {
      font-size: $font-size-xl;
      font-weight: 500;
      color: $text-color-primary;
      margin-bottom: $spacing-sm;
    }

    .error-desc {
      font-size: $font-size-base;
      color: $text-color-secondary;
      margin-bottom: $spacing-xl;
    }
  }
}
</style>