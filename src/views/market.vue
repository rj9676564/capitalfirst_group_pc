<template>
  <div class="market">
    <div class="top">
      <div class="left">
        <div class="title">{{ $t('home.market') }}</div>
        <div class="list">
          <div class="flx" v-for="item in list" :key="item.id" @click="getDetail(item.id)">
            <div>
              <div class="black">{{ locale === 'en' ? item.name_en : item.name }}</div>
              <div>{{ item.contribution_value }}</div>
            </div>
            <div>
              <div class="black">{{ $t('home.min') }}</div>
              <div class="money">${{ item.price }}</div>
            </div>
            <div>
              <div class="black">{{ $t('home.date') }}</div>
              <div>{{ formatTime(item.create_time * 1000, 'YMD') }}</div>
            </div>
            <div class="btn">
              <span :class="+item.selling_price <= 0 ? 'down' : 'up'"
                >{{ +item.selling_price <= 0 ? '' : '+' }}{{ item.selling_price }}%</span
              >
            </div>
          </div>
        </div>
        <div class="pages">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="6"
            @change="changePage"
          />
        </div>
      </div>
      <div class="right">
        <div class="search">
          <input type="text" v-model="keyword" placeholder="Enter stock name/code to search" />
          <div class="search-btn" @click="search">
            <img src="@/assets/imgs/search.png" alt="" />
          </div>
        </div>
        <div style="height: 355px">
          <div class="flx" v-for="item in searchList" :key="item.id">
            <div>
              <span>{{ item.name_en }}</span>
              <div class="end">
                <span :class="+item.selling_price > 0 ? 'green' : 'red'">{{ item.price }}</span>
                <el-icon size="18" color="#22AC38" v-if="+item.selling_price > 0"
                  ><CaretTop
                /></el-icon>
                <el-icon size="18" color="#EA3B48" v-else><CaretBottom /></el-icon>
              </div>
            </div>
            <div class="gray">
              <span>{{ item.contribution_value }}</span>
              <span>{{ +item.selling_price <= 0 ? '' : '+' }}{{ item.selling_price }}%</span>
            </div>
          </div>
        </div>
        <div class="pages">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="0"
            :page-size="6"
            @change="changePage2"
          />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="kline">
        <canvas ref="lineChart"></canvas>
      </div>
      <div class="right">
        <div class="intro">
          <div class="title">{{ $t('home.intro') }}</div>
          <p>{{ locale === 'en' ? info.name_en : info.name }}</p>
          <p>{{ info.contribution_value }}</p>
          <div class="des" v-html="locale === 'en' ? info.detail_en : info.detail"></div>
        </div>
        <div class="btns">
          <img src="@/assets/imgs/xin.png" alt="" @click="colletHand" />
          <div class="btn">
            <span class="buy" @click="visibili = true">{{ $t('home.buy') }}</span>
            <span v-if="canSell !== 0"  class="sell" @click="sellVisibili = true">{{ $t('home.sell') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="visibili" width="400">
    <div class="dia">
      <div class="title">
        {{ locale === 'en' ? info.name_en : info.name }} ({{ info.contribution_value }})
      </div>
      <input type="text" v-model="quantity" :placeholder="$t('home.srsl')" />
      <input type="password" v-model="pwd" :placeholder="$t('home.srzfmm')" />
      <div class="btn">
        <span class="cancel" @click="visibili = false">{{ $t('home.cancel') }}</span>
        <span @click="submit">{{ $t('home.confirm') }}</span>
      </div>
    </div>
  </el-dialog>
  <el-dialog v-model="sellVisibili" width="400">
    <div class="dia">
      <div class="title">
        {{ $t('home.sell') }} - {{ locale === 'en' ? info.name_en : info.name }} ({{ info.contribution_value }})
      </div>
      <input type="password" v-model="pwd" :placeholder="$t('home.srzfmm')" />
      <div class="btn">
        <span class="cancel" @click="sellVisibili = false">{{ $t('home.cancel') }}</span>
        <span @click="sellHand">{{ $t('home.confirm') }}</span>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { proList, proDetail, collet, pay, userInfo, confirmOrder } from '@/api'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const visibili = ref(false)
const sellVisibili = ref(false)
const quantity = ref('')
const list = ref([])
const searchList = ref([])
const page = ref(1)
const total = ref(0)
const keyword = ref('')
const pwd = ref('')
const info = ref({})
const canSell = ref(0) // 存储cansell值，0表示不能卖出，非0表示可以卖出
const routers = useRouter()
const { t, locale } = useI18n()
Chart.register(...registerables)
let loading = false

function changePage(e) {
  page.value = e
}

function changePage2(e) {
  console.log(e)
}

function getUserInfo() {
  userInfo().then((res) => {
    if (res.code === 200) {
      userStore.updateUsers(res.data)
    }
  })
}

function submit() {
  if (!quantity.value) {
    return ElMessage({
      message: t('home.srsl'),
      type: 'error'
    })
  }
  if (!pwd.value) {
    return ElMessage({
      message: t('home.srzfmm'),
      type: 'error'
    })
  }
  if (!userStore.users.safe_status) {
    setTimeout(() => routers.push('/kyc/changePayPwd'))
    return ElMessage({
      message: t('home.szzfmm'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  pay({ id: info.value.id, number: quantity.value, safety_pwd: pwd.value }).then((res) => {
    loading = false
    visibili.value = false
    if (res.code === 200) {
      ElMessage({
        message: t('success'),
        type: 'success'
      })
      quantity.value = ''
      pwd.value = ''
      getUserInfo()
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}

function search() {
  proList({ page: 1, search: keyword.value }).then((res) => {
    if (res.code === 200) searchList.value = res.data.list
  })
}

function colletHand() {
  collet({ id: info.value.id }).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: t('success'),
        type: 'success'
      })
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}

function sellHand() {
  if (!pwd.value) {
    return ElMessage({
      message: t('home.srzfmm'),
      type: 'error'
    })
  }
  if (!userStore.users.safe_status) {
    setTimeout(() => routers.push('/kyc/changePayPwd'))
    return ElMessage({
      message: t('home.szzfmm'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  confirmOrder({ id: canSell.value }).then((res) => {
    loading = false
    sellVisibili.value = false
    if (res.code === 200) {
      ElMessage({
        message: t('success'),
        type: 'success'
      })
      pwd.value = ''
      getUserInfo()
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}

let chartInstance = null
const lineChart = ref(null)
function drawKline(date, datas) {
  const ctx = lineChart.value.getContext('2d')
  if (chartInstance) {
    chartInstance.destroy() // 先销毁旧实例
  }
  chartInstance = new Chart(ctx, {
    title: {
      display: false
    },
    type: 'line', // 图表类型
    data: {
      labels: date, // X 轴标签
      datasets: [
        {
          label: '', // 数据集名称
          data: datas, // 数据
          borderColor: '#13acca', // 边框颜色
          backgroundColor: 'rgba(19, 172, 202, 0.1)', // 背景颜色
          fill: true, // 填充区域
          tension: 0.4
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          display: false // 去掉图例
        }
      },
      responsive: true, // 响应式
      scales: {
        x: {
          grid: {
            display: false // 去掉 x 轴的线条
          }
        },
        y: {
          grid: {
            display: false // 去掉 y 轴的线条
          }
        }
      }
    }
  })
}

function getPro() {
  proList({ page: page.value }).then((res) => {
    if (res.code === 200) {
      list.value = res.data.list
      getDetail(res.data.list[0].id)
    }
  })
}

function getDetail(id) {
  proDetail({ id }).then((res) => {
    if (res.code === 200) {
      info.value = res.data
      canSell.value = res.data.cansell || 0 // 保存cansell值
      const dates = []
      const datas = []
      res.data.lineList.map((item) => dates.push(item.str_date))
      res.data.lineList.map((item) => datas.push(item.amount))
      drawKline(dates, datas)
    }
  })
}

function formatTime(value, type = 'YMDHMS') {
  var dataTime = ''
  var data = new Date(value)
  var year = data.getFullYear()
  var month_temp = data.getMonth() + 1
  var month = month_temp < 10 ? '0' + month_temp : month_temp
  var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
  var hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours()
  var minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()
  var second = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds()
  if (type == 'YMD') {
    dataTime = year + '-' + month + '-' + day
  } else if (type == 'YMDHMS') {
    dataTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else if (type == 'HMS') {
    dataTime = hour + ':' + minute + ':' + second
  } else if (type == 'YM') {
    dataTime = year + '-' + month
  } else if (type == 'HM') {
    dataTime = hour + ':' + minute
  } else if (type == 'HMDM') {
    dataTime = hour + ':' + minute + ' ' + month + '/' + day
  } else if (type == 'LL') {
    dataTime = year + '' + month + '' + day + hour + '' + minute + '' + second
  } else if (type == 'MD') {
    dataTime = month + '-' + day
  } else if ((type = 'MDHM')) {
    dataTime = month + '-' + day + ' ' + hour + ':' + minute
  }
  return dataTime
}

onMounted(() => {
  getPro()
})
</script>

<style lang="scss" scoped>
.market {
  width: 830px;
  margin: 40px auto;
  .top {
    @include flexBetween;
    > div {
      width: 400px;
      height: 500px;
    }
    .list {
      height: 400px;
    }
    .left {
      box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
      border-radius: 8px;
      .title {
        height: 40px;
        line-height: 40px;
        background: linear-gradient(to bottom, #13acca, #39ceeb);
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        padding: 0 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .flx {
        @include flexBetween;
        padding: 15px 0;
        cursor: pointer;
        > div {
          flex: 1;
          text-align: center;
          font-size: 11px;
          color: #c1c1c1;
          .black {
            color: #111;
          }
          .money {
            color: #4dadc7;
          }
        }
        .btn {
          @include flexCenter;
          span {
            width: 60px;
            height: 23px;
            text-align: center;
            line-height: 23px;
            font-size: 11px;
            color: #fff;
            border-radius: 6px;
          }
          .up {
            background: #4ac09d;
          }
          .down {
            background: #ea3b48;
          }
        }
      }
    }
    .right {
      border: 4px solid #13acca;
      border-radius: 8px;
      .search {
        @include flexLeft;
        padding: 24px 26px 0 26px;
        input {
          flex: 1;
          height: 34px;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 0 14px;
        }
        .search-btn {
          background: #738289;
          width: 65px;
          height: 33px;
          border-radius: 6px;
          @include flexCenter;
          margin-left: 5px;
          cursor: pointer;
          img {
            width: 26px;
            height: 26px;
          }
        }
      }
      .flx {
        border-bottom: 1px dashed #ccc;
        padding: 14px 0 8px 0;
        font-size: 11px;
        margin: 0 26px;
        .gray {
          color: #6f6f6f;
        }
        .green {
          color: #22ac38;
        }
        .red {
          color: #ea3b48;
        }
        > div {
          @include flexBetween;
          .end {
            @include flexRight;
            span {
              margin-right: 6px;
            }
          }
        }
      }
      .pages {
        margin-top: 30px;
      }
    }
    .pages {
      @include flexRight;
      padding: 0 20px;
      margin-top: 10px;
    }
  }
  .bottom {
    @include flexBetween;
    margin-top: 40px;
    .kline {
      width: 540px;
      height: 250px;
      box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
      border-radius: 8px;
      padding: 20px;
      canvas {
        width: 510px !important;
        height: 210px !important;
      }
    }
    .right {
      width: 260px;
      height: 250px;
      .intro {
        box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
        border-radius: 8px;
        padding: 20px;
        height: 200px;
        .title {
          font-size: 15px;
          color: #111;
          margin-bottom: 21px;
        }
        p {
          font-size: 12px;
          color: #111;
          line-height: 18px;
        }
        .des {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          line-clamp: 4;
          -webkit-line-clamp: 4;
        }
      }
      .btns {
        @include flexBetween;
        padding: 0 10px;
        margin-top: 20px;
        img {
          width: 26px;
          height: 26px;
          cursor: pointer;
        }
        .btn {
          @include flexRight;
          flex: 1;
          span {
            width: 100%;
            height: 27px;
            text-align: center;
            line-height: 27px;
            color: #fff;
            font-size: 12px;
            border-radius: 6px;
            margin-left: 5px;
            cursor: pointer;
          }
          .buy {
            background: #4dadc7;
          }
          .sell {
            background: #e60012;
          }
        }
      }
    }
  }
}
.dia {
  padding: 30px 15px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    text-align: center;
    margin-bottom: 10px;
  }
  input {
    height: 34px;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
    padding: 0 10px;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .btn {
    @include flexCenter;
    margin-top: 50px;
    span {
      width: 80px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      font-size: 12px;
      color: #fff;
      border-radius: 6px;
      margin: 0 6px;
      background: #4dadc7;
      cursor: pointer;
    }
    .cancel {
      background: #738289;
    }
  }
}
</style>