<template>
  <div class="stock-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>库存管理</span>
        </div>
      </template>
      <div class="stock-search">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input v-model="searchForm.sku" placeholder="请输入商品编号" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="stock-list">
        <el-table :data="stocks" style="width: 100%">
          <el-table-column prop="id" label="ID" width="100" />
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="sku" label="商品编号" width="150" />
          <el-table-column prop="stock" label="库存数量" width="120" />
          <el-table-column prop="warningStock" label="预警库存" width="120" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.stock > 0 ? 'success' : 'danger'">
                {{ scope.row.stock > 0 ? '有库存' : '无库存' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handleEditStock(scope.row)">编辑库存</el-button>
              <el-button size="small" @click="handleViewDetail(scope.row)">查看详情</el-button>
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

    <!-- 编辑库存弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑库存">
      <el-form :model="form" label-width="100px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" disabled />
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input v-model="form.sku" disabled />
        </el-form-item>
        <el-form-item label="当前库存">
          <el-input v-model="form.stock" disabled />
        </el-form-item>
        <el-form-item label="调整数量" required>
          <el-input-number v-model="form.adjustment" :min="-form.stock" placeholder="请输入调整数量" />
        </el-form-item>
        <el-form-item label="调整原因">
          <el-input v-model="form.reason" type="textarea" placeholder="请输入调整原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDialogSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

interface Stock {
  id: number
  name: string
  sku: string
  stock: number
  warningStock: number
}

interface SearchForm {
  name: string
  sku: string
}

interface FormData {
  id: number
  name: string
  sku: string
  stock: number
  adjustment: number
  reason: string
}

const stocks = ref<Stock[]>([
  { id: 1, name: 'iPhone 14 Pro', sku: 'IP14P-256', stock: 100, warningStock: 20 },
  { id: 2, name: 'MacBook Pro 16', sku: 'MBP16-16G', stock: 50, warningStock: 10 },
  { id: 3, name: 'AirPods Pro', sku: 'APP-2022', stock: 200, warningStock: 30 }
])

const searchForm = ref<SearchForm>({
  name: '',
  sku: ''
})

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const dialogVisible = ref(false)
const form = ref<FormData>({
  id: 0,
  name: '',
  sku: '',
  stock: 0,
  adjustment: 0,
  reason: ''
})

const handleSearch = () => {
  // 模拟搜索操作
  ElMessage.success('搜索成功')
}

const resetSearch = () => {
  searchForm.value = {
    name: '',
    sku: ''
  }
}

const handleSizeChange = (size: number) => {
  pageSize.value = size
}

const handleCurrentChange = (current: number) => {
  currentPage.value = current
}

const handleEditStock = (row: Stock) => {
  form.value = {
    id: row.id,
    name: row.name,
    sku: row.sku,
    stock: row.stock,
    adjustment: 0,
    reason: ''
  }
  dialogVisible.value = true
}

const handleViewDetail = (row: Stock) => {
  // 模拟查看详情操作
  ElMessage.success('查看详情')
}

const handleDialogSubmit = () => {
  // 模拟保存操作
  ElMessage.success('库存调整成功')
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.stock-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .stock-search {
    margin-bottom: 20px;
  }
  
  .stock-list {
    margin-top: 20px;
  }
  
  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>