<template>
  <div class="reconciliation-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>订单对账</span>
        </div>
      </template>
      <div class="reconciliation-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNo" placeholder="请输入订单编号" />
          </el-form-item>
          <el-form-item label="商家名称">
            <el-input v-model="searchForm.merchantName" placeholder="请输入商家名称" />
          </el-form-item>
          <el-form-item label="对账状态">
            <el-select v-model="searchForm.status" placeholder="请选择对账状态">
              <el-option label="全部" value="" />
              <el-option label="待对账" value="pending" />
              <el-option label="已对账" value="reconciled" />
              <el-option label="异常" value="exception" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="reconciliation-list">
        <el-table :data="reconciliations" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="orderNo" label="订单编号" width="180" />
          <el-table-column prop="merchantName" label="商家名称" />
          <el-table-column prop="amount" label="订单金额" width="120" />
          <el-table-column prop="commission" label="佣金" width="100" />
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">
                {{ getStatusText(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handleView(scope.row)">查看</el-button>
              <el-button 
                v-if="scope.row.status === 'pending'" 
                size="small" 
                type="primary" 
                @click="handleReconcile(scope.row)"
              >
                对账
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

interface Reconciliation {
  id: number
  orderNo: string
  merchantName: string
  amount: string
  commission: string
  status: string
  createTime: string
}

interface SearchForm {
  orderNo: string
  merchantName: string
  status: string
}

const reconciliations = ref<Reconciliation[]>([
  { id: 1, orderNo: '202403190001', merchantName: '测试商家1', amount: '5999.00', commission: '599.90', status: 'pending', createTime: '2024-03-19 10:00:00' },
  { id: 2, orderNo: '202403190002', merchantName: '测试商家2', amount: '999.00', commission: '99.90', status: 'reconciled', createTime: '2024-03-19 11:00:00' },
  { id: 3, orderNo: '202403190003', merchantName: '测试商家3', amount: '1999.00', commission: '199.90', status: 'exception', createTime: '2024-03-19 12:00:00' }
])

const searchForm = ref<SearchForm>({
  orderNo: '',
  merchantName: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const getStatusType = (status: string): string => {
  switch (status) {
    case 'pending': return 'warning'
    case 'reconciled': return 'success'
    case 'exception': return 'danger'
    default: return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending': return '待对账'
    case 'reconciled': return '已对账'
    case 'exception': return '异常'
    default: return ''
  }
}

const handleSearch = () => {
  // 模拟搜索操作
  ElMessage.success('搜索成功')
}

const resetSearch = () => {
  searchForm.value = {
    orderNo: '',
    merchantName: '',
    status: ''
  }
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
}

const handleView = (row: Reconciliation) => {
  // 模拟查看操作
  ElMessage.success('查看对账详情')
}

const handleReconcile = (row: Reconciliation) => {
  // 模拟对账操作
  ElMessage.success('对账成功')
}
</script>

<style scoped lang="scss">
.reconciliation-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .reconciliation-search {
    margin-bottom: 20px;
  }
  
  .reconciliation-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>