<template>
  <div class="ticket-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>售后工单</span>
        </div>
      </template>
      <div class="ticket-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="工单编号">
            <el-input v-model="searchForm.ticketNo" placeholder="请输入工单编号" />
          </el-form-item>
          <el-form-item label="订单编号">
            <el-input v-model="searchForm.orderNo" placeholder="请输入订单编号" />
          </el-form-item>
          <el-form-item label="工单状态">
            <el-select v-model="searchForm.status" placeholder="请选择工单状态">
              <el-option label="全部" value="" />
              <el-option label="待处理" value="pending" />
              <el-option label="处理中" value="processing" />
              <el-option label="已完成" value="completed" />
              <el-option label="已关闭" value="closed" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="ticket-list">
        <el-table :data="tickets" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="ticketNo" label="工单编号" width="180" />
          <el-table-column prop="orderNo" label="订单编号" width="180" />
          <el-table-column prop="customerName" label="客户名称" />
          <el-table-column prop="customerPhone" label="联系电话" width="150" />
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
                v-if="scope.row.status === 'pending' || scope.row.status === 'processing'" 
                size="small" 
                type="primary" 
                @click="handleProcess(scope.row)"
              >
                处理
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

interface Ticket {
  id: number
  ticketNo: string
  orderNo: string
  customerName: string
  customerPhone: string
  status: string
  createTime: string
}

interface SearchForm {
  ticketNo: string
  orderNo: string
  status: string
}

const tickets = ref<Ticket[]>([
  { id: 1, ticketNo: 'TK202403190001', orderNo: '202403190001', customerName: '张三', customerPhone: '13800138000', status: 'pending', createTime: '2024-03-19 10:00:00' },
  { id: 2, ticketNo: 'TK202403190002', orderNo: '202403190002', customerName: '李四', customerPhone: '13900139000', status: 'processing', createTime: '2024-03-19 11:00:00' },
  { id: 3, ticketNo: 'TK202403190003', orderNo: '202403190003', customerName: '王五', customerPhone: '13700137000', status: 'completed', createTime: '2024-03-19 12:00:00' }
])

const searchForm = ref<SearchForm>({
  ticketNo: '',
  orderNo: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const getStatusType = (status: string): string => {
  switch (status) {
    case 'pending': return 'warning'
    case 'processing': return 'info'
    case 'completed': return 'success'
    case 'closed': return 'danger'
    default: return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending': return '待处理'
    case 'processing': return '处理中'
    case 'completed': return '已完成'
    case 'closed': return '已关闭'
    default: return ''
  }
}

const handleSearch = () => {
  // 模拟搜索操作
  ElMessage.success('搜索成功')
}

const resetSearch = () => {
  searchForm.value = {
    ticketNo: '',
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

const handleView = (row: Ticket) => {
  // 模拟查看操作
  ElMessage.success('查看工单详情')
}

const handleProcess = (row: Ticket) => {
  // 模拟处理操作
  ElMessage.success('工单处理成功')
}
</script>

<style scoped lang="scss">
.ticket-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .ticket-search {
    margin-bottom: 20px;
  }
  
  .ticket-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>