<template>
  <div class="page-container">
    <h1 class="page-title">操作日志</h1>
    
    <!-- 搜索和操作栏 -->
    <el-card class="search-card">
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="操作人">
            <el-input v-model="searchForm.username" placeholder="请输入操作人" />
          </el-form-item>
          <el-form-item label="操作类型">
            <el-select v-model="searchForm.operationType" placeholder="请选择操作类型">
              <el-option label="新增" value="add" />
              <el-option label="编辑" value="edit" />
              <el-option label="删除" value="delete" />
              <el-option label="查询" value="query" />
              <el-option label="登录" value="login" />
            </el-select>
          </el-form-item>
          <el-form-item label="操作时间">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="success" @click="handleExport">导出</el-button>
      </div>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="table-card">
      <el-table :data="logList" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="操作人" />
        <el-table-column prop="operationType" label="操作类型">
          <template #default="scope">
            <el-tag :type="getOperationType(scope.row.operationType)">
              {{ getOperationTypeName(scope.row.operationType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operationContent" label="操作内容" />
        <el-table-column prop="ipAddress" label="IP地址" />
        <el-table-column prop="userAgent" label="用户代理" />
        <el-table-column prop="createTime" label="操作时间" />
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

// 状态
const dateRange = ref<[string, string]>(['', ''])

// 搜索表单
const searchForm = reactive({
  username: '',
  operationType: ''
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 日志列表
const logList = reactive([
  {
    id: 1,
    username: 'admin',
    operationType: 'login',
    operationContent: '用户登录',
    ipAddress: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createTime: '2023-12-12 10:00:00'
  },
  {
    id: 2,
    username: 'admin',
    operationType: 'add',
    operationContent: '新增用户',
    ipAddress: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createTime: '2023-12-12 10:05:00'
  },
  {
    id: 3,
    username: 'admin',
    operationType: 'edit',
    operationContent: '编辑角色',
    ipAddress: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createTime: '2023-12-12 10:10:00'
  },
  {
    id: 4,
    username: 'admin',
    operationType: 'delete',
    operationContent: '删除菜单',
    ipAddress: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createTime: '2023-12-12 10:15:00'
  },
  {
    id: 5,
    username: 'admin',
    operationType: 'query',
    operationContent: '查询订单',
    ipAddress: '127.0.0.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createTime: '2023-12-12 10:20:00'
  }
])

// 方法
const handleSearch = () => {
  // 搜索逻辑
  console.log('搜索', searchForm, dateRange.value)
}

const resetForm = () => {
  searchForm.username = ''
  searchForm.operationType = ''
  dateRange.value = ['', '']
}

const handleExport = () => {
  // 导出逻辑
  ElMessage.success('导出成功')
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
}

const handleCurrentChange = (current: number) => {
  pagination.currentPage = current
}

const getOperationType = (type: string): string => {
  switch (type) {
    case 'add':
      return 'success'
    case 'edit':
      return 'warning'
    case 'delete':
      return 'danger'
    case 'query':
      return 'info'
    case 'login':
      return 'primary'
    default:
      return 'default'
  }
}

const getOperationTypeName = (type: string): string => {
  const typeMap: Record<string, string> = {
    add: '新增',
    edit: '编辑',
    delete: '删除',
    query: '查询',
    login: '登录'
  }
  return typeMap[type] || type
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