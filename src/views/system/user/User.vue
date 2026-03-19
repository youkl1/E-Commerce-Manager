<template>
  <div class="page-container">
    <h1 class="page-title">用户管理</h1>
    
    <!-- 搜索和操作栏 -->
    <el-card class="search-card">
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="searchForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="searchForm.role" placeholder="请选择角色">
              <el-option label="超级管理员" value="superAdmin" />
              <el-option label="平台运营" value="platformOperator" />
              <el-option label="商家管理员" value="merchantAdmin" />
              <el-option label="财务角色" value="finance" />
              <el-option label="客服角色" value="customerService" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleAdd" icon="Plus">新增用户</el-button>
      </div>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="table-card">
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="roles" label="角色">
          <template #default="scope">
            <el-tag v-for="role in scope.row.roles" :key="role" size="small" style="margin-right: 5px">
              {{ getRoleName(role) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!userForm.id">
          <el-input v-model="userForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="userForm.roles" multiple placeholder="请选择角色">
            <el-option label="超级管理员" value="superAdmin" />
            <el-option label="平台运营" value="platformOperator" />
            <el-option label="商家管理员" value="merchantAdmin" />
            <el-option label="财务角色" value="finance" />
            <el-option label="客服角色" value="customerService" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 状态
const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const userFormRef = ref()

// 搜索表单
const searchForm = reactive({
  username: '',
  name: '',
  role: ''
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 用户表单
const userForm = reactive({
  id: 0,
  username: '',
  name: '',
  password: '',
  email: '',
  phone: '',
  roles: [] as string[]
})

// 表单规则
const userRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入电话', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ]
})

// 用户列表
const userList = reactive([
  {
    id: 1,
    username: 'admin',
    name: '超级管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    roles: ['superAdmin'],
    createTime: '2023-12-01 00:00:00'
  },
  {
    id: 2,
    username: 'operator',
    name: '平台运营',
    email: 'operator@example.com',
    phone: '13800138001',
    roles: ['platformOperator'],
    createTime: '2023-12-02 00:00:00'
  },
  {
    id: 3,
    username: 'merchant',
    name: '商家管理员',
    email: 'merchant@example.com',
    phone: '13800138002',
    roles: ['merchantAdmin'],
    createTime: '2023-12-03 00:00:00'
  },
  {
    id: 4,
    username: 'finance',
    name: '财务角色',
    email: 'finance@example.com',
    phone: '13800138003',
    roles: ['finance'],
    createTime: '2023-12-04 00:00:00'
  },
  {
    id: 5,
    username: 'service',
    name: '客服角色',
    email: 'service@example.com',
    phone: '13800138004',
    roles: ['customerService'],
    createTime: '2023-12-05 00:00:00'
  }
])

// 方法
const handleSearch = () => {
  // 搜索逻辑
  console.log('搜索', searchForm)
}

const resetForm = () => {
  searchForm.username = ''
  searchForm.name = ''
  searchForm.role = ''
}

const handleAdd = () => {
  // 重置表单
  Object.assign(userForm, {
    id: 0,
    username: '',
    name: '',
    password: '',
    email: '',
    phone: '',
    roles: []
  })
  dialogTitle.value = '新增用户'
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  // 填充表单
  Object.assign(userForm, row)
  dialogTitle.value = '编辑用户'
  dialogVisible.value = true
}

const handleDelete = (id: number) => {
  // 删除逻辑
  ElMessage.success('删除成功')
}

const handleSubmit = async () => {
  // 表单验证
  if (!userFormRef.value) return
  await userFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 提交逻辑
      ElMessage.success(userForm.id ? '编辑成功' : '新增成功')
      dialogVisible.value = false
    }
  })
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
}

const handleCurrentChange = (current: number) => {
  pagination.currentPage = current
}

const getRoleName = (role: string): string => {
  const roleMap: Record<string, string> = {
    superAdmin: '超级管理员',
    platformOperator: '平台运营',
    merchantAdmin: '商家管理员',
    finance: '财务角色',
    customerService: '客服角色'
  }
  return roleMap[role] || role
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.search-card {
  margin-bottom: $spacing-md;

  .search-form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .demo-form-inline {
      flex: 1;
    }
  }
}

.table-card {
  .pagination {
    margin-top: $spacing-lg;
    display: flex;
    justify-content: flex-end;
  }
}
</style>