<template>
    <div class="page">
      <div class="label">{{ $t('assets.title') }}</div>
      
      <!-- 用户资产信息 -->
      <div class="assets-info">
        <div class="info-card">
          <div class="info-item">
            <span class="label">{{ $t('assets.totalAssets') }}</span>
            <span class="value">${{ userAssets.totalmoney || '0.00' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('assets.availableBalance') }}</span>
            <span class="value">${{ userAssets.money || '0.00' }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ $t('assets.frozenAmount') }}</span>
            <span class="value">${{ userAssets.hacelistmoney || '0.00' }}</span>
          </div>
        </div>
      </div>

      <!-- 订单列表表格 -->
      <div class="table-container">
        <div class="table-title">{{ $t('assets.orderList') }}</div>
        <el-table :data="orderList" style="width: 100%" stripe v-loading="tableLoading">
          <el-table-column prop="id" :label="$t('assets.orderId')" width="100" />
          <el-table-column prop="p_name" :label="$t('assets.productName')" min-width="150" />
          <el-table-column prop="p_name_en" :label="$t('assets.englishName')" min-width="150" />
          <el-table-column prop="p_clonmes" :label="$t('assets.code')" width="120" />
          <el-table-column prop="p_number" :label="$t('assets.quantity')" width="100" />
          <el-table-column prop="buy_price" :label="$t('assets.price')" width="120">
            <template #default="scope">
              ${{ scope.row.buy_price }}
            </template>
          </el-table-column>
          <el-table-column prop="status" :label="$t('assets.status')" width="120">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status_name)">
                {{ getStatusText(scope.row.status_name) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            :total="total"
            layout="prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <!-- 导航按钮 -->
      <!-- <div class="navigation">
        <el-button type="primary" @click="goToPage('/recharge')">{{ $t('assets.recharge') }}</el-button>
        <el-button type="success" @click="goToPage('/withdraw')">{{ $t('assets.withdraw') }}</el-button>
        <el-button type="info" @click="goToPage('/order')">{{ $t('assets.orderManage') }}</el-button>
        <el-button type="warning" @click="goToPage('/market')">{{ $t('assets.market') }}</el-button>
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { getUserOrderlis } from '@/api'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  
  const router = useRouter()
  const { t } = useI18n()
  
  // 响应式数据
  const userAssets = ref({})
  const orderList = ref([])
  const tableLoading = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  
  function getUserOrderList() {
    tableLoading.value = true
    getUserOrderlis({
      page: currentPage.value,
      limit: pageSize.value
    }).then((res) => {
      if (res.code === 200) {
        console.log('用户订单列表:', res.data)
        userAssets.value = res.data.userinfo || {}
        orderList.value = res.data.sellorbuyList || []
        total.value = res.data.total || 0
      }
    }).finally(() => {
      tableLoading.value = false
    })
  }
  
  function getStatusType(statusName) {
    switch(statusName) {
      case 5: return 'warning' // 代购中
      case 6: return 'success' // 代售中
      default: return 'info'
    }
  }
  
  function getStatusText(statusName) {
    switch(statusName) {
      case 5: return t('assets.statusBuying') // 代购中
      case 6: return t('assets.statusSelling') // 代售中
      default: return t('assets.status')
    }
  }
  
  function goToPage(path) {
    router.push(path)
  }
  
  // 分页事件处理
  function handleSizeChange(val) {
    pageSize.value = val
    currentPage.value = 1
    getUserOrderList()
  }
  
  function handleCurrentChange(val) {
    currentPage.value = val
    getUserOrderList()
  }
  
  onMounted(() => {
    getUserOrderList()
  });
  </script>
  
  <style lang="scss" scoped>
  .page {
    padding: 20px;
    min-height: 80vh;
    
    .label {
      color: #738289;
      font-size: 24px;
      font-weight: bold;
      margin-top: 20px;
    }
    
    .assets-info {
      margin-top: 30px;
      .info-card {
        background: #fff;
        box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
        border-radius: 8px;
        padding: 30px;
        display: flex;
        justify-content: space-around;
        .info-item {
          text-align: center;
          .label {
            display: block;
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            margin-top: 0;
          }
          .value {
            font-size: 24px;
            font-weight: bold;
            color: #4dadc7;
          }
        }
      }
    }
    
    .table-container {
      margin-top: 30px;
      background: #fff;
      box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
      border-radius: 8px;
      padding: 20px;
      width: 100%;
      
      .table-title {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        margin-bottom: 20px;
      }
      
      :deep(.el-table) {
        width: 100% !important;
      }
      
      .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
    }
    
    .navigation {
      margin-top: 30px;
      text-align: center;
      padding: 20px 0;
      
      .el-button {
        margin: 0 10px;
        padding: 12px 24px;
        font-size: 14px;
      }
    }
  }
  </style>