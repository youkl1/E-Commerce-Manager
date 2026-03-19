<template>
  <div class="fund-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>资金流水</span>
        </div>
      </template>
      <div class="fund-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="商家名称">
            <el-input v-model="searchForm.merchantName" placeholder="请输入商家名称" />
          </el-form-item>
          <el-form-item label="流水类型">
            <el-select v-model="searchForm.type" placeholder="请选择流水类型">
              <el-option label="全部" value="" />
              <el-option label="收入" value="income" />
              <el-option label="支出" value="expense" />
              <el-option label="退款" value="refund" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="fund-list">
        <el-table :data="funds" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="merchantName" label="商家名称" />
          <el-table-column prop="amount" label="金额" width="120" />
          <el-table-column prop="type" label="类型" width="120">
            <template #default="scope">
              <el-tag :type="scope.row.type === 'income' ? 'success' : scope.row.type === 'expense' ? 'danger' : 'warning'">
                {{ getTypeText(scope.row.type) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="createTime" label="创建时间" width="180" />
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button size="small" @click="handleView(scope.row)">查看</el-button>
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

interface Fund {
  id: number
  merchantName: string
  amount: string
  type: string
  remark: string
  createTime: string
}

interface SearchForm {
  merchantName: string
  type: string
}

const funds = ref<Fund[]>([
  { id: 1, merchantName: '测试商家1', amount: '5999.00', type: 'income', remark: '订单收入', createTime: '2024-03-19 10:00:00' },
  { id: 2, merchantName: '测试商家2', amount: '999.00', type: 'income', remark: '订单收入', createTime: '2024-03-19 11:00:00' },
  { id: 3, merchantName: '测试商家3', amount: '1999.00', type: 'refund', remark: '退款', createTime: '2024-03-19 12:00:00' }
])

const searchForm = ref<SearchForm>({
  merchantName: '',
  type: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const getTypeText = (type: string): string => {
  switch (type) {
    case 'income': return '收入'
    case 'expense': return '支出'
    case 'refund': return '退款'
    default: return ''
  }
}

const handleSearch = () => {
  // 模拟搜索操作
  ElMessage.success('搜索成功')
}

const resetSearch = () => {
  searchForm.value = {
    merchantName: '',
    type: ''
  }
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
}

const handleView = (row: Fund) => {
  // 模拟查看操作
  ElMessage.success('查看流水详情')
}
</script>

<style scoped lang="scss">
.fund-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .fund-search {
    margin-bottom: 20px;
  }
  
  .fund-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>