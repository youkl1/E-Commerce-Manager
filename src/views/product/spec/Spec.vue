<template>
  <div class="spec-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>规格管理</span>
          <el-button type="primary" @click="handleAdd">新增规格</el-button>
        </div>
      </template>
      <div class="spec-list">
        <el-table :data="specs" style="width: 100%">
          <el-table-column prop="id" label="规格ID" width="100" />
          <el-table-column prop="name" label="规格名称" />
          <el-table-column prop="value" label="规格值">
            <template #default="scope">
              <span v-for="(item, index) in scope.row.value.split(',')" :key="index" class="spec-tag">
                {{ item }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="100" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status ? 'success' : 'danger'">
                {{ scope.row.status ? '启用' : '禁用' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form :model="form" label-width="100px">
        <el-form-item label="规格名称" required>
          <el-input v-model="form.name" placeholder="请输入规格名称" />
        </el-form-item>
        <el-form-item label="规格值" required>
          <el-input v-model="form.value" placeholder="请输入规格值，多个值用逗号分隔" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" active-text="启用" inactive-text="禁用" />
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

interface Spec {
  id: number
  name: string
  value: string
  sort: number
  status: boolean
}

interface FormData {
  id: number
  name: string
  value: string
  sort: number
  status: boolean
}

const specs = ref<Spec[]>([
  { id: 1, name: '颜色', value: '红色,蓝色,黑色,白色', sort: 1, status: true },
  { id: 2, name: '尺寸', value: 'S,M,L,XL,XXL', sort: 2, status: true },
  { id: 3, name: '内存', value: '16GB,32GB,64GB,128GB', sort: 3, status: true }
])

const dialogVisible = ref(false)
const dialogTitle = ref('新增规格')
const form = ref<FormData>({
  id: 0,
  name: '',
  value: '',
  sort: 0,
  status: true
})

const handleAdd = () => {
  dialogTitle.value = '新增规格'
  form.value = {
    id: 0,
    name: '',
    value: '',
    sort: 0,
    status: true
  }
  dialogVisible.value = true
}

const handleEdit = (row: Spec) => {
  dialogTitle.value = '编辑规格'
  form.value = {
    id: row.id,
    name: row.name,
    value: row.value,
    sort: row.sort,
    status: row.status
  }
  dialogVisible.value = true
}

const handleDelete = (id: number) => {
  // 模拟删除操作
  ElMessage.success('规格删除成功')
  specs.value = specs.value.filter(item => item.id !== id)
}

const handleDialogSubmit = () => {
  // 模拟保存操作
  ElMessage.success('规格保存成功')
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.spec-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .spec-list {
    margin-top: 20px;
  }
  
  .spec-tag {
    display: inline-block;
    padding: 2px 8px;
    background-color: #ecf5ff;
    color: #409eff;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>