<template>
  <div class="complaint-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>客诉管理</span>
        </div>
      </template>
      <div class="complaint-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="客诉编号">
            <el-input v-model="searchForm.complaintNo" placeholder="请输入客诉编号" />
          </el-form-item>
          <el-form-item label="客户名称">
            <el-input v-model="searchForm.customerName" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="客诉状态">
            <el-select v-model="searchForm.status" placeholder="请选择客诉状态">
              <el-option label="全部" value="" />
              <el-option label="待处理" value="pending" />
              <el-option label="处理中" value="processing" />
              <el-option label="已解决" value="resolved" />
              <el-option label="已拒绝" value="rejected" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="complaint-list">
        <el-table :data="complaints" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="complaintNo" label="客诉编号" width="180" />
          <el-table-column prop="customerName" label="客户名称" />
          <el-table-column prop="customerPhone" label="联系电话" width="150" />
          <el-table-column prop="subject" label="客诉主题" />
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

interface Complaint {
  id: number
  complaintNo: string
  customerName: string
  customerPhone: string
  subject: string
  status: string
  createTime: string
}

interface SearchForm {
  complaintNo: string
  customerName: string
  status: string
}

const complaints = ref<Complaint[]>([
  { id: 1, complaintNo: 'CP202403190001', customerName: '张三', customerPhone: '13800138000', subject: '商品质量问题', status: 'pending', createTime: '2024-03-19 10:00:00' },
  { id: 2, complaintNo: 'CP202403190002', customerName: '李四', customerPhone: '13900139000', subject: '物流延迟', status: 'processing', createTime: '2024-03-19 11:00:00' },
  { id: 3, complaintNo: 'CP202403190003', customerName: '王五', customerPhone: '13700137000', subject: '服务态度', status: 'resolved', createTime: '2024-03-19 12:00:00' }
])

const searchForm = ref<SearchForm>({
  complaintNo: '',
  customerName: '',
  status: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const getStatusType = (status: string): string => {
  switch (status) {
    case 'pending': return 'warning'
    case 'processing': return 'info'
    case 'resolved': return 'success'
    case 'rejected': return 'danger'
    default: return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending': return '待处理'
    case 'processing': return '处理中'
    case 'resolved': return '已解决'
    case 'rejected': return '已拒绝'
    default: return ''
  }
}

const handleSearch = () => {
  // 模拟搜索操作
  ElMessage.success('搜索成功')
}

const resetSearch = () => {
  searchForm.value = {
    complaintNo: '',
    customerName: '',
    status: ''
  }
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
}

const handleView = (row: Complaint) => {
  // 模拟查看操作
  ElMessage.success('查看客诉详情')
}

const handleProcess = (row: Complaint) => {
  // 模拟处理操作
  ElMessage.success('客诉处理成功')
}
</script>

<style scoped lang="scss">
.complaint-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .complaint-search {
    margin-bottom: 20px;
  }
  
  .complaint-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>