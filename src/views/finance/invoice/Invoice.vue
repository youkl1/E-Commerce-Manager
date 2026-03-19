<template>
  <div class="invoice-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>发票管理</span>
        </div>
      </template>
      <div class="invoice-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="发票编号">
            <el-input v-model="searchForm.invoiceNo" placeholder="请输入发票编号" />
          </el-form-item>
          <el-form-item label="商家名称">
            <el-input v-model="searchForm.merchantName" placeholder="请输入商家名称" />
          </el-form-item>
          <el-form-item label="发票状态">
            <el-select v-model="searchForm.status" placeholder="请选择发票状态">
              <el-option label="全部" value="" />
              <el-option label="待开具" value="pending" />
              <el-option label="已开具" value="issued" />
              <el-option label="已作废" value="invalid" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="invoice-list">
        <el-table :data="invoices" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="invoiceNo" label="发票编号" width="180" />
          <el-table-column prop="merchantName" label="商家名称" />
          <el-table-column prop="amount" label="金额" width="120" />
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
                @click="handleIssue(scope.row)"
              >
                开具
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

interface Invoice {
  id: number
  invoiceNo: string
  merchantName: string
  amount: string
  status: string
  createTime: string
}

interface SearchForm {
  invoiceNo: string
  merchantName: string
  status: string
}

const invoices = ref<Invoice[]>([
  { id: 1, invoiceNo: 'IN202403190001', merchantName: '测试商家1', amount: '5999.00', status: 'pending', createTime: '2024-03-19 10:00:00' },
  { id: 2, invoiceNo: 'IN202403190002', merchantName: '测试商家2', amount: '999.00', status: 'issued', createTime: '2024-03-19 11:00:00' },
  { id: 3, invoiceNo: 'IN202403190003', merchantName: '测试商家3', amount: '1999.00', status: 'invalid', createTime: '2024-03-19 12:00:00' }
])

const searchForm = ref<SearchForm>({
  invoiceNo: '',
  merchantName: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const getStatusType = (status: string): string => {
  switch (status) {
    case 'pending': return 'warning'
    case 'issued': return 'success'
    case 'invalid': return 'danger'
    default: return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending': return '待开具'
    case 'issued': return '已开具'
    case 'invalid': return '已作废'
    default: return ''
  }
}

const handleSearch = () => {
  // 模拟搜索操作
  ElMessage.success('搜索成功')
}

const resetSearch = () => {
  searchForm.value = {
    invoiceNo: '',
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

const handleView = (row: Invoice) => {
  // 模拟查看操作
  ElMessage.success('查看发票详情')
}

const handleIssue = (row: Invoice) => {
  // 模拟开具发票操作
  ElMessage.success('发票开具成功')
}
</script>

<style scoped lang="scss">
.invoice-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .invoice-search {
    margin-bottom: 20px;
  }
  
  .invoice-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>