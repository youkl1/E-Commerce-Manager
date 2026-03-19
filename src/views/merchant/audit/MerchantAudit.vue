<template>
  <div class="merchant-audit-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>入驻审核</span>
        </div>
      </template>
      <div class="audit-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="商家名称">
            <el-input v-model="searchForm.name" placeholder="请输入商家名称" />
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="searchForm.status" placeholder="请选择审核状态">
              <el-option label="全部" value="" />
              <el-option label="待审核" value="pending" />
              <el-option label="已通过" value="approved" />
              <el-option label="已拒绝" value="rejected" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="audit-list">
        <el-table :data="merchants" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="name" label="商家名称" />
          <el-table-column prop="contactName" label="联系人" width="120" />
          <el-table-column prop="contactPhone" label="联系电话" width="150" />
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

interface Merchant {
  id: number
  name: string
  contactName: string
  contactPhone: string
  status: string
  createTime: string
}

interface SearchForm {
  name: string
  status: string
}

const merchants = ref<Merchant[]>([
  { id: 1, name: '测试商家1', contactName: '张三', contactPhone: '13800138000', status: 'pending', createTime: '2024-03-19 10:00:00' },
  { id: 2, name: '测试商家2', contactName: '李四', contactPhone: '13900139000', status: 'approved', createTime: '2024-03-19 11:00:00' },
  { id: 3, name: '测试商家3', contactName: '王五', contactPhone: '13700137000', status: 'rejected', createTime: '2024-03-19 12:00:00' }
])

const searchForm = ref<SearchForm>({
  name: '',
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
    default: return ''
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending': return '待审核'
    case 'approved': return '已通过'
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
    name: '',
    status: ''
  }
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
}

const handleView = (row: Merchant) => {
  // 模拟查看操作
  ElMessage.success('查看商家详情')
}

const handleApprove = (row: Merchant) => {
  // 模拟审核操作
  ElMessage.success('审核成功')
}
</script>

<style scoped lang="scss">
.merchant-audit-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .audit-search {
    margin-bottom: 20px;
  }
  
  .audit-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>