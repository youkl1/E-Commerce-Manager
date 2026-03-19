<template>
  <div class="order-detail-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>订单详情</span>
          <el-button type="primary" @click="handleBack">返回列表</el-button>
        </div>
      </template>
      <div class="order-info">
        <h3>订单基本信息</h3>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="订单编号">{{ orderDetail.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="订单状态">{{ orderDetail.statusText }}</el-descriptions-item>
          <el-descriptions-item label="下单时间">{{ orderDetail.createTime }}</el-descriptions-item>
          <el-descriptions-item label="支付时间">{{ orderDetail.payTime }}</el-descriptions-item>
          <el-descriptions-item label="总金额">{{ orderDetail.totalAmount }}</el-descriptions-item>
          <el-descriptions-item label="支付方式">{{ orderDetail.payMethod }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="customer-info">
        <h3>客户信息</h3>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="客户名称">{{ orderDetail.customerName }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ orderDetail.customerPhone }}</el-descriptions-item>
          <el-descriptions-item label="收货地址" :span="2">{{ orderDetail.address }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="product-info">
        <h3>商品信息</h3>
        <el-table :data="orderDetail.products" style="width: 100%">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="sku" label="商品编号" width="150" />
          <el-table-column prop="price" label="单价" width="100" />
          <el-table-column prop="quantity" label="数量" width="100" />
          <el-table-column prop="subtotal" label="小计" width="100" />
        </el-table>
      </div>
      <div class="order-actions">
        <h3>操作记录</h3>
        <el-timeline>
          <el-timeline-item 
            v-for="(item, index) in orderDetail.actions" 
            :key="index"
            :timestamp="item.time"
            :type="item.type"
          >
            {{ item.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="action-buttons">
        <el-button type="primary" @click="handleShip">发货</el-button>
        <el-button @click="handleCancel">取消订单</el-button>
        <el-button @click="handleRefund">申请退款</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

interface Product {
  name: string
  sku: string
  price: string
  quantity: number
  subtotal: string
}

interface Action {
  time: string
  content: string
  type: string
}

interface OrderDetail {
  orderNo: string
  statusText: string
  createTime: string
  payTime: string
  totalAmount: string
  payMethod: string
  customerName: string
  customerPhone: string
  address: string
  products: Product[]
  actions: Action[]
}

const orderDetail = ref<OrderDetail>({
  orderNo: '202403190001',
  statusText: '待发货',
  createTime: '2024-03-19 10:00:00',
  payTime: '2024-03-19 10:05:00',
  totalAmount: '5999.00',
  payMethod: '支付宝',
  customerName: '张三',
  customerPhone: '13800138000',
  address: '北京市朝阳区某某街道某某小区1号楼1单元101室',
  products: [
    {
      name: 'iPhone 14 Pro',
      sku: 'IP14P-256',
      price: '5999.00',
      quantity: 1,
      subtotal: '5999.00'
    }
  ],
  actions: [
    {
      time: '2024-03-19 10:00:00',
      content: '订单创建成功',
      type: 'primary'
    },
    {
      time: '2024-03-19 10:05:00',
      content: '支付成功',
      type: 'success'
    }
  ]
})

onMounted(() => {
  // 模拟从API获取订单详情
  console.log('获取订单详情:', route.params.id)
})

const handleBack = () => {
  router.push('/order/list')
}

const handleShip = () => {
  // 模拟发货操作
  ElMessage.success('发货成功')
}

const handleCancel = () => {
  // 模拟取消订单操作
  ElMessage.success('订单取消成功')
}

const handleRefund = () => {
  // 模拟申请退款操作
  ElMessage.success('退款申请已提交')
}
</script>

<style scoped lang="scss">
.order-detail-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  h3 {
    margin: 20px 0 10px 0;
    font-size: 16px;
    font-weight: 600;
  }
  
  .order-info,
  .customer-info,
  .product-info,
  .order-actions {
    margin-bottom: 30px;
  }
  
  .action-buttons {
    margin-top: 30px;
    display: flex;
    gap: 10px;
  }
}
</style>