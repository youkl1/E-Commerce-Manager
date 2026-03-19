<template>
  <div class="page-container">
    <h1 class="page-title">数据看板</h1>
    
    <!-- 统计卡片 -->
    <div class="stats-container">
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-number">{{ stats.totalOrders }}</div>
          <div class="stat-label">总订单数</div>
        </div>
        <div class="stat-icon">
          <el-icon><Document /></el-icon>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-number">{{ stats.totalSales }}</div>
          <div class="stat-label">总销售额</div>
        </div>
        <div class="stat-icon">
          <el-icon><Money /></el-icon>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-number">{{ stats.totalProducts }}</div>
          <div class="stat-label">总商品数</div>
        </div>
        <div class="stat-icon">
          <el-icon><Goods /></el-icon>
        </div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-content">
          <div class="stat-number">{{ stats.totalMerchants }}</div>
          <div class="stat-label">总商家数</div>
        </div>
        <div class="stat-icon">
          <el-icon><OfficeBuilding /></el-icon>
        </div>
      </el-card>
    </div>

    <!-- 图表区域 -->
    <div class="charts-container">
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>销售趋势</span>
            <el-select v-model="chartTimeRange" size="small">
              <el-option label="近7天" value="7d" />
              <el-option label="近30天" value="30d" />
              <el-option label="近90天" value="90d" />
            </el-select>
          </div>
        </template>
        <div class="chart-content">
          <div class="chart-placeholder">
            <el-icon class="chart-icon"><DataLine /></el-icon>
            <p>销售趋势图表</p>
          </div>
        </div>
      </el-card>
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>订单来源</span>
          </div>
        </template>
        <div class="chart-content">
          <div class="chart-placeholder">
            <el-icon class="chart-icon"><PieChart /></el-icon>
            <p>订单来源图表</p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 最近订单 -->
    <el-card class="recent-orders-card">
      <template #header>
        <div class="card-header">
          <span>最近订单</span>
          <el-button type="primary" size="small">查看全部</el-button>
        </div>
      </template>
      <el-table :data="recentOrders" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="customerName" label="客户名称" />
        <el-table-column prop="amount" label="订单金额" />
        <el-table-column prop="status" label="订单状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Document, Money, Goods, OfficeBuilding, DataLine, PieChart } from '@element-plus/icons-vue'

// 状态
const chartTimeRange = ref('7d')

// 统计数据
const stats = reactive({
  totalOrders: 12345,
  totalSales: '¥1,234,567.89',
  totalProducts: 5678,
  totalMerchants: 123
})

// 最近订单
const recentOrders = reactive([
  {
    orderNo: '202312120001',
    customerName: '张三',
    amount: '¥1234.56',
    status: '已完成',
    createTime: '2023-12-12 10:00:00'
  },
  {
    orderNo: '202312120002',
    customerName: '李四',
    amount: '¥5678.90',
    status: '待发货',
    createTime: '2023-12-12 09:30:00'
  },
  {
    orderNo: '202312120003',
    customerName: '王五',
    amount: '¥9876.54',
    status: '已发货',
    createTime: '2023-12-12 09:00:00'
  },
  {
    orderNo: '202312120004',
    customerName: '赵六',
    amount: '¥3456.78',
    status: '待付款',
    createTime: '2023-12-12 08:30:00'
  },
  {
    orderNo: '202312120005',
    customerName: '孙七',
    amount: '¥6789.01',
    status: '已完成',
    createTime: '2023-12-12 08:00:00'
  }
])

// 方法
const getStatusType = (status: string): string => {
  switch (status) {
    case '已完成':
      return 'success'
    case '待发货':
      return 'warning'
    case '已发货':
      return 'primary'
    case '待付款':
      return 'info'
    default:
      return 'default'
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.stats-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: $spacing-md;
  margin-bottom: $spacing-lg;

  .stat-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-lg;

    .stat-content {
      .stat-number {
        font-size: $font-size-xl;
        font-weight: 600;
        color: $text-color-primary;
        margin-bottom: $spacing-xs;
      }

      .stat-label {
        font-size: $font-size-sm;
        color: $text-color-secondary;
      }
    }

    .stat-icon {
      font-size: 32px;
      color: $primary-color;
    }
  }
}

.charts-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;

  .chart-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chart-content {
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;

      .chart-placeholder {
        text-align: center;

        .chart-icon {
          font-size: 48px;
          color: $text-color-placeholder;
          margin-bottom: $spacing-md;
        }

        p {
          font-size: $font-size-sm;
          color: $text-color-secondary;
        }
      }
    }
  }
}

.recent-orders-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>