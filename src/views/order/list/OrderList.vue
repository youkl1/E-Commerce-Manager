<template>
  <div class="page-container">
    <h1 class="page-title">订单列表</h1>
    
    <!-- 搜索和操作栏 -->
    <el-card class="search-card">
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNo" placeholder="请输入订单号" />
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.status" placeholder="请选择订单状态">
              <el-option label="全部" value="" />
              <el-option label="待付款" value="1" />
              <el-option label="待发货" value="2" />
              <el-option label="已发货" value="3" />
              <el-option label="已完成" value="4" />
              <el-option label="已取消" value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="订单时间">
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
      <el-table :data="orderList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="customerName" label="客户名称" />
        <el-table-column prop="amount" label="订单金额" />
        <el-table-column prop="status" label="订单状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusName(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.row)">查看详情</el-button>
            <el-button type="warning" size="small" @click="handleShip(scope.row)" v-if="scope.row.status === 2">发货</el-button>
            <el-button type="danger" size="small" @click="handleCancel(scope.row)" v-if="scope.row.status === 1">取消订单</el-button>
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

// 状态
const dateRange = ref<[string, string]>(['', ''])

// 搜索表单
const searchForm = reactive({
  orderNo: '',
  customerName: '',
  status: ''
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 订单列表
const orderList = reactive([
  {
    id: 1,
    orderNo: '202312120001',
    customerName: '张三',
    amount: '¥1234.56',
    status: 4,
    createTime: '2023-12-12 10:00:00'
  },
  {
    id: 2,
    orderNo: '202312120002',
    customerName: '李四',
    amount: '¥5678.90',
    status: 2,
    createTime: '2023-12-12 09:30:00'
  },
  {
    id: 3,
    orderNo: '202312120003',
    customerName: '王五',
    amount: '¥9876.54',
    status: 3,
    createTime: '2023-12-12 09:00:00'
  },
  {
    id: 4,
    orderNo: '202312120004',
    customerName: '赵六',
    amount: '¥3456.78',
    status: 1,
    createTime: '2023-12-12 08:30:00'
  },
  {
    id: 5,
    orderNo: '202312120005',
    customerName: '孙七',
    amount: '¥6789.01',
    status: 5,
    createTime: '2023-12-12 08:00:00'
  }
])

// 方法
const handleSearch = () => {
  // 搜索逻辑
  console.log('搜索', searchForm, dateRange.value)
}

const resetForm = () => {
  searchForm.orderNo = ''
  searchForm.customerName = ''
  searchForm.status = ''
  dateRange.value = ['', '']
}

const handleExport = () => {
  // 导出逻辑
  ElMessage.success('导出成功')
}

const handleDetail = (row: any) => {
  // 跳转到订单详情页面
  console.log('订单详情', row)
}

const handleShip = (row: any) => {
  // 发货操作
  ElMessage.success('发货成功')
}

const handleCancel = (row: any) => {
  // 取消订单
  ElMessage.success('订单已取消')
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
}

const handleCurrentChange = (current: number) => {
  pagination.currentPage = current
}

const getStatusType = (status: number): string => {
  switch (status) {
    case 1:
      return 'info'
    case 2:
      return 'warning'
    case 3:
      return 'primary'
    case 4:
      return 'success'
    case 5:
      return 'danger'
    default:
      return 'default'
  }
}

const getStatusName = (status: number): string => {
  const statusMap: Record<number, string> = {
    1: '待付款',
    2: '待发货',
    3: '已发货',
    4: '已完成',
    5: '已取消'
  }
  return statusMap[status] || '未知状态'
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