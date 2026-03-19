<template>
  <div class="product-add-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>新增商品</span>
        </div>
      </template>
      <div class="product-form">
        <el-form :model="form" label-width="100px">
          <el-form-item label="商品名称" required>
            <el-input v-model="form.name" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="商品分类" required>
            <el-select v-model="form.categoryId" placeholder="请选择商品分类">
              <el-option 
                v-for="category in categories" 
                :key="category.id" 
                :label="category.name" 
                :value="category.id" 
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" required>
            <el-input-number v-model="form.price" :min="0" :step="0.01" placeholder="请输入商品价格" />
          </el-form-item>
          <el-form-item label="商品库存" required>
            <el-input-number v-model="form.stock" :min="0" placeholder="请输入商品库存" />
          </el-form-item>
          <el-form-item label="商品状态">
            <el-switch v-model="form.status" active-text="上架" inactive-text="下架" />
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input 
              v-model="form.description" 
              type="textarea" 
              :rows="4" 
              placeholder="请输入商品描述" 
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
            <el-button @click="handleCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

interface FormData {
  name: string
  categoryId: number
  price: number
  stock: number
  status: boolean
  description: string
}

const form = ref<FormData>({
  name: '',
  categoryId: 0,
  price: 0,
  stock: 0,
  status: true,
  description: ''
})

// 模拟分类数据
const categories = ref([
  { id: 1, name: '电子产品' },
  { id: 2, name: '服装鞋帽' },
  { id: 3, name: '家居用品' },
  { id: 4, name: '食品饮料' }
])

const handleSubmit = () => {
  // 模拟保存操作
  ElMessage.success('商品保存成功')
  router.push('/product/list')
}

const handleCancel = () => {
  router.push('/product/list')
}
</script>

<style scoped lang="scss">
.product-add-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .product-form {
    margin-top: 20px;
  }
}
</style>