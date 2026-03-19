<template>
  <div class="report-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>财务报表</span>
          <el-button type="primary" @click="handleExport">导出报表</el-button>
        </div>
      </template>
      <div class="report-filter">
        <el-form :inline="true" :model="filterForm">
          <el-form-item label="开始日期">
            <el-date-picker v-model="filterForm.startDate" type="date" placeholder="选择开始日期" />
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker v-model="filterForm.endDate" type="date" placeholder="选择结束日期" />
          </el-form-item>
          <el-form-item label="报表类型">
            <el-select v-model="filterForm.type" placeholder="选择报表类型">
              <el-option label="日报" value="daily" />
              <el-option label="周报" value="weekly" />
              <el-option label="月报" value="monthly" />
              <el-option label="年报" value="yearly" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="resetFilter">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="report-content">
        <div class="report-stats">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span>总销售额</span>
                  </div>
                </template>
                <div class="stat-value">¥{{ stats.totalSales }}</div>
                <div class="stat-change" :class="stats.salesChange >= 0 ? 'positive' : 'negative'">
                  {{ stats.salesChange >= 0 ? '+' : '' }}{{ stats.salesChange }}%
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span>总订单数</span>
                  </div>
                </template>
                <div class="stat-value">{{ stats.totalOrders }}</div>
                <div class="stat-change" :class="stats.ordersChange >= 0 ? 'positive' : 'negative'">
                  {{ stats.ordersChange >= 0 ? '+' : '' }}{{ stats.ordersChange }}%
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span>总退款数</span>
                  </div>
                </template>
                <div class="stat-value">{{ stats.totalRefunds }}</div>
                <div class="stat-change" :class="stats.refundsChange >= 0 ? 'positive' : 'negative'">
                  {{ stats.refundsChange >= 0 ? '+' : '' }}{{ stats.refundsChange }}%
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span>总佣金</span>
                  </div>
                </template>
                <div class="stat-value">¥{{ stats.totalCommission }}</div>
                <div class="stat-change" :class="stats.commissionChange >= 0 ? 'positive' : 'negative'">
                  {{ stats.commissionChange >= 0 ? '+' : '' }}{{ stats.commissionChange }}%
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="report-table">
          <h3>销售明细</h3>
          <el-table :data="reportData" style="width: 100%">
            <el-table-column prop="date" label="日期" width="180" />
            <el-table-column prop="sales" label="销售额" width="120" />
            <el-table-column prop="orders" label="订单数" width="100" />
            <el-table-column prop="refunds" label="退款数" width="100" />
            <el-table-column prop="commission" label="佣金" width="120" />
            <el-table-column prop="profit" label="利润" width="120" />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

interface FilterForm {
  startDate: string
  endDate: string
  type: string
}

interface Stats {
  totalSales: string
  totalOrders: number
  totalRefunds: number
  totalCommission: string
  salesChange: number
  ordersChange: number
  refundsChange: number
  commissionChange: number
}

interface ReportData {
  date: string
  sales: string
  orders: number
  refunds: number
  commission: string
  profit: string
}

const filterForm = ref<FilterForm>({
  startDate: '',
  endDate: '',
  type: 'daily'
})

const stats = ref<Stats>({
  totalSales: '100000.00',
  totalOrders: 100,
  totalRefunds: 5,
  totalCommission: '10000.00',
  salesChange: 10,
  ordersChange: 5,
  refundsChange: -2,
  commissionChange: 12
})

const reportData = ref<ReportData[]>([
  { date: '2024-03-19', sales: '10000.00', orders: 10, refunds: 0, commission: '1000.00', profit: '9000.00' },
  { date: '2024-03-18', sales: '9000.00', orders: 9, refunds: 1, commission: '900.00', profit: '8100.00' },
  { date: '2024-03-17', sales: '11000.00', orders: 11, refunds: 0, commission: '1100.00', profit: '9900.00' }
])

const handleQuery = () => {
  // 模拟查询操作
  ElMessage.success('查询成功')
}

const resetFilter = () => {
  filterForm.value = {
    startDate: '',
    endDate: '',
    type: 'daily'
  }
}

const handleExport = () => {
  // 模拟导出操作
  ElMessage.success('报表导出成功')
}
</script>

<style scoped lang="scss">
.report-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .report-filter {
    margin-bottom: 20px;
  }
  
  .report-stats {
    margin-bottom: 30px;
  }
  
  .stat-value {
    font-size: 24px;
    font-weight: 600;
    margin: 10px 0;
  }
  
  .stat-change {
    font-size: 14px;
    
    &.positive {
      color: #67c23a;
    }
    
    &.negative {
      color: #f56c6c;
    }
  }
  
  .report-table {
    margin-top: 30px;
    
    h3 {
      margin-bottom: 15px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>