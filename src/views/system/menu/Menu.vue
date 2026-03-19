<template>
  <div class="page-container">
    <h1 class="page-title">菜单管理</h1>
    
    <!-- 操作栏 -->
    <el-card class="action-card">
      <div class="action-buttons">
        <el-button type="primary" @click="handleAdd" icon="Plus">新增菜单</el-button>
        <el-button type="success" @click="handleExpandAll">展开全部</el-button>
        <el-button @click="handleCollapseAll">收起全部</el-button>
      </div>
    </el-card>

    <!-- 菜单树 -->
    <el-card class="tree-card">
      <el-tree
        ref="menuTreeRef"
        :data="menuTree"
        node-key="id"
        :default-expanded-keys="expandedKeys"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <div class="tree-node">
            <span>{{ node.label }}</span>
            <span class="tree-node-actions">
              <el-button type="primary" size="small" @click.stop="handleAddChild(data)">新增子菜单</el-button>
              <el-button type="warning" size="small" @click.stop="handleEdit(data)">编辑</el-button>
              <el-button type="danger" size="small" @click.stop="handleDelete(data.id)">删除</el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </el-card>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
    >
      <el-form
        ref="menuFormRef"
        :model="menuForm"
        :rules="menuRules"
        label-position="top"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="menuForm.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="路由路径" prop="path">
          <el-input v-model="menuForm.path" placeholder="请输入路由路径" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="menuForm.icon" placeholder="请输入图标名称" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="menuForm.sort" :min="0" />
        </el-form-item>
        <el-form-item label="父菜单">
          <el-select v-model="menuForm.parentId" placeholder="请选择父菜单">
            <el-option label="无" value="0" />
            <el-option
              v-for="menu in menuOptions"
              :key="menu.id"
              :label="menu.name"
              :value="menu.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="menuForm.hidden" />
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
const dialogTitle = ref('新增菜单')
const menuFormRef = ref()
const menuTreeRef = ref()
const expandedKeys = ref<number[]>([])
const checkedKeys = ref<number[]>([])

// 菜单表单
const menuForm = reactive({
  id: 0,
  name: '',
  path: '',
  component: '',
  icon: '',
  sort: 0,
  parentId: 0,
  hidden: false
})

// 表单规则
const menuRules = reactive({
  name: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' }
  ],
  path: [
    { required: true, message: '请输入路由路径', trigger: 'blur' }
  ],
  component: [
    { required: true, message: '请输入组件路径', trigger: 'blur' }
  ],
  icon: [
    { required: true, message: '请输入图标名称', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入排序', trigger: 'blur' }
  ]
})

// 菜单树
const menuTree = reactive([
  {
    id: 1,
    name: '系统管理',
    path: '/system',
    component: 'Layout',
    icon: 'el-icon-setting',
    sort: 1,
    parentId: 0,
    hidden: false,
    children: [
      {
        id: 11,
        name: '用户管理',
        path: 'user',
        component: '@/views/system/user/User.vue',
        icon: 'el-icon-user',
        sort: 1,
        parentId: 1,
        hidden: false
      },
      {
        id: 12,
        name: '角色管理',
        path: 'role',
        component: '@/views/system/role/Role.vue',
        icon: 'el-icon-s-custom',
        sort: 2,
        parentId: 1,
        hidden: false
      },
      {
        id: 13,
        name: '菜单管理',
        path: 'menu',
        component: '@/views/system/menu/Menu.vue',
        icon: 'el-icon-menu',
        sort: 3,
        parentId: 1,
        hidden: false
      },
      {
        id: 14,
        name: '操作日志',
        path: 'log',
        component: '@/views/system/log/Log.vue',
        icon: 'el-icon-document',
        sort: 4,
        parentId: 1,
        hidden: false
      }
    ]
  },
  {
    id: 2,
    name: '商品管理',
    path: '/product',
    component: 'Layout',
    icon: 'el-icon-goods',
    sort: 2,
    parentId: 0,
    hidden: false,
    children: [
      {
        id: 21,
        name: '商品列表',
        path: 'list',
        component: '@/views/product/list/ProductList.vue',
        icon: 'el-icon-s-grid',
        sort: 1,
        parentId: 2,
        hidden: false
      },
      {
        id: 22,
        name: '新增商品',
        path: 'add',
        component: '@/views/product/add/ProductAdd.vue',
        icon: 'el-icon-plus',
        sort: 2,
        parentId: 2,
        hidden: false
      },
      {
        id: 23,
        name: '分类管理',
        path: 'category',
        component: '@/views/product/category/Category.vue',
        icon: 'el-icon-s-operation',
        sort: 3,
        parentId: 2,
        hidden: false
      }
    ]
  }
])

// 菜单选项（用于选择父菜单）
const menuOptions = computed(() => {
  const options: any[] = []
  const flattenMenu = (menu: any[]) => {
    menu.forEach(item => {
      options.push(item)
      if (item.children) {
        flattenMenu(item.children)
      }
    })
  }
  flattenMenu(menuTree)
  return options
})

// 树节点配置
const defaultProps = {
  children: 'children',
  label: 'name'
}

// 方法
const handleAdd = () => {
  // 重置表单
  Object.assign(menuForm, {
    id: 0,
    name: '',
    path: '',
    component: '',
    icon: '',
    sort: 0,
    parentId: 0,
    hidden: false
  })
  dialogTitle.value = '新增菜单'
  dialogVisible.value = true
}

const handleAddChild = (data: any) => {
  // 重置表单
  Object.assign(menuForm, {
    id: 0,
    name: '',
    path: '',
    component: '',
    icon: '',
    sort: 0,
    parentId: data.id,
    hidden: false
  })
  dialogTitle.value = '新增子菜单'
  dialogVisible.value = true
}

const handleEdit = (data: any) => {
  // 填充表单
  Object.assign(menuForm, data)
  dialogTitle.value = '编辑菜单'
  dialogVisible.value = true
}

const handleDelete = (id: number) => {
  // 删除逻辑
  ElMessage.success('删除成功')
}

const handleSubmit = async () => {
  // 表单验证
  if (!menuFormRef.value) return
  await menuFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 提交逻辑
      ElMessage.success(menuForm.id ? '编辑成功' : '新增成功')
      dialogVisible.value = false
    }
  })
}

const handleNodeClick = (data: any) => {
  console.log('节点点击', data)
}

const handleExpandAll = () => {
  menuTreeRef.value?.expandAll()
}

const handleCollapseAll = () => {
  menuTreeRef.value?.collapseAll()
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.action-card {
  margin-bottom: $spacing-md;

  .action-buttons {
    display: flex;
    gap: $spacing-sm;
  }
}

.tree-card {
  .tree-node {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .tree-node-actions {
      display: flex;
      gap: $spacing-xs;
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover .tree-node-actions {
      opacity: 1;
    }
  }
}
</style>