<template>
  <div class="page-container">
    <h1 class="page-title">商品列表</h1>
    
    <!-- 搜索和操作栏 -->
    <el-card class="search-card">
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="searchForm.categoryId" placeholder="请选择商品分类">
              <el-option label="全部" value="" />
              <el-option label="手机数码" value="1" />
              <el-option label="家用电器" value="2" />
              <el-option label="服装鞋包" value="3" />
              <el-option label="食品饮料" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="searchForm.status" placeholder="请选择商品状态">
              <el-option label="全部" value="" />
              <el-option label="上架" value="1" />
              <el-option label="下架" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleAdd" icon="Plus">新增商品</el-button>
      </div>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="table-card">
      <el-table :data="productList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="categoryName" label="商品分类" />
        <el-table-column prop="price" label="商品价格" />
        <el-table-column prop="stock" label="库存" />
        <el-table-column prop="status" label="商品状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="warning" size="small" @click="handleStatus(scope.row)">
              {{ scope.row.status === 1 ? '下架' : '上架' }}
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 状态

// 搜索表单
const searchForm = reactive({
  name: '',
  categoryId: '',
  status: ''
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 商品列表
const productList = reactive([
  {
    id: 1,
    name: 'iPhone 14 Pro',
    categoryName: '手机数码',
    price: '¥7999.00',
    stock: 100,
    status: 1,
    createTime: '2023-12-01 00:00:00'
  },
  {
    id: 2,
    name: 'MacBook Pro 16',
    categoryName: '手机数码',
    price: '¥19999.00',
    stock: 50,
    status: 1,
    createTime: '2023-12-02 00:00:00'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    categoryName: '手机数码',
    price: '¥1999.00',
    stock: 200,
    status: 1,
    createTime: '2023-12-03 00:00:00'
  },
  {
    id: 4,
    name: 'iPad Pro 12.9',
    categoryName: '手机数码',
    price: '¥8999.00',
    stock: 80,
    status: 0,
    createTime: '2023-12-04 00:00:00'
  },
  {
    id: 5,
    name: 'Apple Watch Series 8',
    categoryName: '手机数码',
    price: '¥2999.00',
    stock: 150,
    status: 1,
    createTime: '2023-12-05 00:00:00'
  }
])

// 方法
const handleSearch = () => {
  // 搜索逻辑
  console.log('搜索', searchForm)
}

const resetForm = () => {
  searchForm.name = ''
  searchForm.categoryId = ''
  searchForm.status = ''
}

const handleAdd = () => {
  // 跳转到新增商品页面
  console.log('新增商品')
}

const handleEdit = (row: any) => {
  // 跳转到编辑商品页面
  console.log('编辑商品', row)
}

const handleStatus = (row: any) => {
  // 上下架操作
  ElMessage.success(row.status === 1 ? '商品已下架' : '商品已上架')
}

const handleDelete = (id: number) => {
  // 删除逻辑
  ElMessage.success('删除成功')
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
}

const handleCurrentChange = (current: number) => {
  pagination.currentPage = current
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.search-card {
  margin-bottom: $spacing-md;

  .search-form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .demo-form-inline {
      flex: 1;
    }
  }
}

.table-card {
  .pagination {
    margin-top: $spacing-lg;
    display: flex;
    justify-content: flex-end;
  }
}
</style>