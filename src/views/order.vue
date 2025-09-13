<template>
  <div class="page">
    <div class="box">
      <div class="bar">
        <div class="flx">
          <span class="left">{{$t('kyc.nc')}}</span>
          <span class="center">{{$t('kyc.pq')}}</span>
          <span class="center">{{$t('kyc.zt')}}</span>
          <span class="operate right">{{$t('kyc.cz')}}</span>
        </div>
      </div>
      <div class="list" v-loading="loading">
        <div class="item" v-for="item in list" :key="item">
          <div class="flx">
            <div class="left">
              <div class="black">{{item.p_name_en}}</div>
              <div>{{item.p_clonmes}}</div>
            </div>
            <div class="center">
              <div class="black">{{item.buy_price}}</div>
              <div>{{item.p_number}}</div>
            </div>
            <div class="black center">{{item.status_name === 1 ? $t('kyc.jxz') : $t('kyc.ywc')}}</div>
            <div class="right">
              <span :class="['btn',{active:item.status_name === 1}]" @click="sell(item)">{{$t('kyc.sell')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { orderList,sellOrder,userInfo } from '@/api'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
const list = ref([])
const page = 1
const loading = ref(false)
const userStore = useUserStore()
const {t} = useI18n()

function getOders() {
  orderList({page:page.value,limit:1000}).then((res) => {
    if (res.code === 200) {
      list.value = res.data.list
    }
  })
}

function getUserInfo(){
  userInfo().then(res => {
    if(res.code === 200){
      userStore.updateUsers(res.data)
    }
  })
}

function sell(info){
  if(info.status_name !== 1) return
  loading.value = true
  sellOrder({id:info.id}).then(res => {
    loading.value = false
    if (res.code === 200) {
      ElMessage({
        message: t('home.success'),
        type: 'success'
      })
      getUserInfo()
      getOders()
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}

onMounted(() => {
  getOders()
});
</script>

<style lang="scss" scoped>
.page {
  padding: 1px;
  .box {
    min-height: 60vh;
    box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
    border-radius: 8px;
    margin: 20px 0;
    width: 90%;
    padding-bottom: 50px;
    .left{
      width: 30%;
    }
    .center{
      width: 30%;
      text-align: center;
    }
    .right{
      flex:1;
      text-align: right;
      .btn{
        cursor: pointer;
        padding:4px 18px;
        font-size: 14px;
        background: #ccc;
        color:#000;
        border-radius: 6px;
      }
      .active{
        background: red;
        color:#fff;
      }
    }
    .bar {
      height: 50px;
      @include flexCenter;
      background: linear-gradient(to bottom, #13acca, #39ceeb);
      font-size: 18px;
      color: #fff;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding: 0 120px;
      .flx {
        @include flexBetween;
        padding: 0 10px;
        width: 100%;
      }
    }
    .list {
      margin: 20px 120px;
      .item {
        border-bottom: 1px solid #ccc;
        padding: 17px 0 11px 0;
        font-size: 13px;
        color: #6f6f6f;
        .flx {
          @include flexBetween;
        }
        .black {
          color: #111;
        }
      }
    }
  }
}
</style>