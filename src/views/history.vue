<template>
  <div class="page">
        <div class="header">
      <router-link class="route" to="/home">
        <img src="@/assets/imgs/back.png" alt="" class="back" @click="back" />
        <span>{{ $t('kyc.back') }}</span>
      </router-link>
    </div>
    <div class="box">
      <div class="head">
        <span @click="changeNav(1)" :class="{active:navId === 1}">{{$t('kyc.cz')}}</span>
        <span class="hr"></span>
        <span @click="changeNav(2)" :class="{active:navId === 2}">{{$t('kyc.tx')}}</span>
      </div>
      <div class="list">
        <div class="item" v-for="item in list" :key="item.id">
          <div class="flx">
            <span class="timer">{{item.create_time}}</span>
            <span :class="+item.num < 0 ? 'red' : 'green'">{{item.status === 1 ? $t('kyc.jxz') : $t('kyc.ywc')}}</span>
          </div>
          <div class="flx">
            <span>{{item.to_address}}</span>
            <span>${{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {depositRecord,withdrawRecord} from "@/api";
import { ref,onMounted } from 'vue';
const list = ref([]);
const navId = ref(1);

function getDepositRecord(){
  depositRecord({limit:'10000'}).then(res => {
    if(res.code === 200) list.value = res.data.list
  })
}

function getWithdrawRecord(){
  withdrawRecord({limit:'10000'}).then(res => {
    if(res.code === 200) list.value = res.data.list
  })
}

function changeNav(e){
  navId.value = e
  if(e === 1){
    list.value = []
    getDepositRecord()
  }else{
    list.value = []
    getWithdrawRecord()
  }
}

onMounted(() => {
  getDepositRecord()
});
</script>

<style lang="scss" scoped>
.page{
  padding:1px 220px;
  .header {
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding-top: 25px;
    padding-bottom: 5px;
    .route {
      @include flexLeft;
      font-size: 15px;
      color: #000;
    }
    .back {
      width: 26px;
      height: 26px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .box{
    min-height: 60vh;
    box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
    border-radius: 8px;
    margin-top:60px;
    margin-bottom: 120px;
    padding-bottom: 50px;
    .head{
      height: 50px;
      @include flexCenter;
      background: linear-gradient(to bottom,#13ACCA,#39CEEB);
      font-size: 18px;
      color:#fff;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      span{
        cursor: pointer;
      }
      .hr{
        height: 20px;
        width:1px;
        background: #fff;
        margin:0 20px;
      }
      .active{
        font-weight: bold;
      }
    }
    .list{
      margin:20px 120px;
      .item{
        border-bottom: 1px solid #ccc;
        padding:20px 0 10px 0;
        font-size: 14px;
        color:#6F6F6F;
        .flx{
          @include flexBetween;
        }
        .timer{
          font-size: 15px;
          color:#111;
        }
        .green{
          color:#22AC38;
          font-size: 15px;
        }
        .red{
          color:#E60012;
          font-size: 15px;
        }
      }
    }
  }
}
</style>