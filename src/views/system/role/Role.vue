<template>
  <div class="page-container">
    <h1 class="page-title">角色管理</h1>
    
    <!-- 搜索和操作栏 -->
    <el-card class="search-card">
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="角色名称">
            <el-input v-model="searchForm.name" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleAdd" icon="Plus">新增角色</el-button>
      </div>
    </el-card>

    <!-- 数据表格 -->
    <el-card class="table-card">
      <el-table :data="roleList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="warning" size="small" @click="handlePermission(scope.row)">权限配置</el-button>
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
        ref="roleFormRef"
        :model="roleForm"
        :rules="roleRules"
        label-position="top"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" type="textarea" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 权限配置对话框 -->
    <el-dialog
      v-model="permissionDialogVisible"
      title="权限配置"
      width="600px"
    >
      <el-tree
        :data="permissionTree"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedKeys"
        @check-change="handleCheckChange"
      >
        <template #default="{ node, data }">
          <span class="tree-node-label">
            {{ node.label }}
          </span>
        </template>
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 状态
const dialogVisible = ref(false)
const permissionDialogVisible = ref(false)
const dialogTitle = ref('新增角色')
const roleFormRef = ref()
const checkedKeys = ref<number[]>([])

// 搜索表单
const searchForm = reactive({
  name: ''
})

// 分页
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

// 角色表单
const roleForm = reactive({
  id: 0,
  name: '',
  description: ''
})

// 表单规则
const roleRules = reactive({
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入角色描述', trigger: 'blur' }
  ]
})

// 角色列表
const roleList = reactive([
  {
    id: 1,
    name: '超级管理员',
    description: '拥有平台全量权限',
    createTime: '2023-12-01 00:00:00'
  },
  {
    id: 2,
    name: '平台运营',
    description: '负责商品审核、商家入驻审核、营销活动管理等',
    createTime: '2023-12-02 00:00:00'
  },
  {
    id: 3,
    name: '商家管理员',
    description: '负责所属店铺管理、商品上下架、订单处理等',
    createTime: '2023-12-03 00:00:00'
  },
  {
    id: 4,
    name: '财务角色',
    description: '负责订单对账、资金流水管理、发票管理等',
    createTime: '2023-12-04 00:00:00'
  },
  {
    id: 5,
    name: '客服角色',
    description: '负责售后工单处理、客诉管理、订单咨询跟进等',
    createTime: '2023-12-05 00:00:00'
  }
])

// 权限树
const permissionTree = reactive([
  {
    id: 1,
    label: '系统管理',
    children: [
      { id: 11, label: '用户管理' },
      { id: 12, label: '角色管理' },
      { id: 13, label: '菜单管理' },
      { id: 14, label: '操作日志' }
    ]
  },
  {
    id: 2,
    label: '商品管理',
    children: [
      { id: 21, label: '商品列表' },
      { id: 22, label: '新增商品' },
      { id: 23, label: '分类管理' },
      { id: 24, label: '规格管理' },
      { id: 25, label: '库存管理' }
    ]
  },
  {
    id: 3,
    label: '订单管理',
    children: [
      { id: 31, label: '订单列表' },
      { id: 32, label: '订单详情' },
      { id: 33, label: '退款售后' }
    ]
  },
  {
    id: 4,
    label: '商家管理',
    children: [
      { id: 41, label: '入驻审核' },
      { id: 42, label: '商家列表' }
    ]
  },
  {
    id: 5,
    label: '财务管理',
    children: [
      { id: 51, label: '订单对账' },
      { id: 52, label: '资金流水' },
      { id: 53, label: '发票管理' },
      { id: 54, label: '财务报表' }
    ]
  },
  {
    id: 6,
    label: '客服管理',
    children: [
      { id: 61, label: '售后工单' },
      { id: 62, label: '客诉管理' }
    ]
  }
])

// 方法
const handleSearch = () => {
  // 搜索逻辑
  console.log('搜索', searchForm)
}

const resetForm = () => {
  searchForm.name = ''
}

const handleAdd = () => {
  // 重置表单
  Object.assign(roleForm, {
    id: 0,
    name: '',
    description: ''
  })
  dialogTitle.value = '新增角色'
  dialogVisible.value = true
}

const handleEdit = (row: any) => {
  // 填充表单
  Object.assign(roleForm, row)
  dialogTitle.value = '编辑角色'
  dialogVisible.value = true
}

const handleDelete = (id: number) => {
  // 删除逻辑
  ElMessage.success('删除成功')
}

const handleSubmit = async () => {
  // 表单验证
  if (!roleFormRef.value) return
  await roleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 提交逻辑
      ElMessage.success(roleForm.id ? '编辑成功' : '新增成功')
      dialogVisible.value = false
    }
  })
}

const handlePermission = (row: any) => {
  // 打开权限配置对话框
  permissionDialogVisible.value = true
  // 模拟加载权限
  checkedKeys.value = [1, 11, 12, 13, 14, 2, 21, 22, 23, 24, 25]
}

const handleCheckChange = (data: any, checked: boolean, indeterminate: boolean) => {
  // 处理权限选择
  console.log('权限选择', data, checked, indeterminate)
}

const handlePermissionSubmit = () => {
  // 提交权限配置
  ElMessage.success('权限配置成功')
  permissionDialogVisible.value = false
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
}

const handleCurrentChange = (current: number) => {
  pagination.currentPage = current
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

.tree-node-label {
  font-size: $font-size-sm;
}
</style>