<template>
  <div class="refund-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>退款售后</span>
        </div>
      </template>
      <div class="refund-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNo" placeholder="请输入订单编号" />
          </el-form-item>
          <el-form-item label="退款状态">
            <el-select v-model="searchForm.status" placeholder="请选择退款状态">
              <el-option label="全部" value="" />
              <el-option label="待审核" value="pending" />
              <el-option label="已通过" value="approved" />
              <el-option label="已拒绝" value="rejected" />
              <el-option label="已退款" value="refunded" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="refund-list">
        <el-table :data="refunds" style="width: 100%">
          <el-table-column prop="id" label="退款ID" width="100" />
          <el-table-column prop="orderNo" label="订单编号" width="180" />
          <el-table-column prop="amount" label="退款金额" width="120" />
          <el-table-column prop="reason" label="退款原因" />
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">
                {{ getStatusText(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="申请时间" width="180" />
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handleView(scope.row)">查看</el-button>
              <el-button 
                v-if="scope.row.status === 'pending'" 
                size="small" 
                type="primary" 
                @click="handleApprove(scope.row)"
              >
                审核
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

interface Refund {
  id: number
  orderNo: string
  amount: string
  reason: string
  status: string
  createTime: string
}

interface SearchForm {
  orderNo: string
  status: string
}

const refunds = ref<Refund[]>([
  { id: 1, orderNo: '202403190001', amount: '5999.00', reason: '商品质量问题', status: 'pending', createTime: '2024-03-19 11:00:00' },
  { id: 2, orderNo: '202403190002', amount: '999.00', reason: '拍错商品', status: 'approved', createTime: '2024-03-19 12:00:00' },
  { id: 3, orderNo: '202403190003', amount: '1999.00', reason: '不想要了', status: 'rejected', createTime: '2024-03-19 13:00:00' }
])

const searchForm = ref<SearchForm>({
  orderNo: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const getStatusType = (status: string): string => {
  switch (status) {
    case 'pending': return 'warning'
    case 'approved': return 'success'
    case 'rejected': return 'danger'
    case 'refunded': return 'info'
    default: return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending': return '待审核'
    case 'approved': return '已通过'
    case 'rejected': return '已拒绝'
    case 'refunded': return '已退款'
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
    status: ''
  }
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
}

const handleView = (row: Refund) => {
  // 模拟查看操作
  ElMessage.success('查看退款详情')
}

const handleApprove = (row: Refund) => {
  // 模拟审核操作
  ElMessage.success('审核成功')
}
</script>

<style scoped lang="scss">
.refund-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .refund-search {
    margin-bottom: 20px;
  }
  
  .refund-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>