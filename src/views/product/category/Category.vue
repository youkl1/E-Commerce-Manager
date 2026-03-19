<template>
  <div class="category-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>分类管理</span>
          <el-button type="primary" @click="handleAdd">新增分类</el-button>
        </div>
      </template>
      <div class="category-list">
        <el-table :data="categories" style="width: 100%">
          <el-table-column prop="id" label="分类ID" width="100" />
          <el-table-column prop="name" label="分类名称" />
          <el-table-column prop="parentName" label="父分类" />
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
        <el-form-item label="分类名称" required>
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="父分类">
          <el-select v-model="form.parentId" placeholder="请选择父分类">
            <el-option label="顶级分类" value="0" />
            <el-option 
              v-for="category in categories" 
              :key="category.id" 
              :label="category.name" 
              :value="category.id" 
            />
          </el-select>
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

interface Category {
  id: number
  name: string
  parentId: number
  parentName: string
  sort: number
  status: boolean
}

interface FormData {
  id: number
  name: string
  parentId: number
  sort: number
  status: boolean
}

const categories = ref<Category[]>([
  { id: 1, name: '电子产品', parentId: 0, parentName: '顶级分类', sort: 1, status: true },
  { id: 2, name: '服装鞋帽', parentId: 0, parentName: '顶级分类', sort: 2, status: true },
  { id: 3, name: '手机', parentId: 1, parentName: '电子产品', sort: 1, status: true },
  { id: 4, name: '电脑', parentId: 1, parentName: '电子产品', sort: 2, status: true }
])

const dialogVisible = ref(false)
const dialogTitle = ref('新增分类')
const form = ref<FormData>({
  id: 0,
  name: '',
  parentId: 0,
  sort: 0,
  status: true
})

const handleAdd = () => {
  dialogTitle.value = '新增分类'
  form.value = {
    id: 0,
    name: '',
    parentId: 0,
    sort: 0,
    status: true
  }
  dialogVisible.value = true
}

const handleEdit = (row: Category) => {
  dialogTitle.value = '编辑分类'
  form.value = {
    id: row.id,
    name: row.name,
    parentId: row.parentId,
    sort: row.sort,
    status: row.status
  }
  dialogVisible.value = true
}

const handleDelete = (id: number) => {
  // 模拟删除操作
  ElMessage.success('分类删除成功')
  categories.value = categories.value.filter(item => item.id !== id)
}

const handleDialogSubmit = () => {
  // 模拟保存操作
  ElMessage.success('分类保存成功')
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.category-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .category-list {
    margin-top: 20px;
  }
}
</style>