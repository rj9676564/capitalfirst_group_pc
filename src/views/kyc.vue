<template>
  <div class="kyc">
    <div class="nav">
      <img src="@/assets/imgs/logo-1.png" alt="" class="logo" />
      <div class="links">
        <router-link to="/kyc/realname" class="link-item">
          <img src="@/assets/imgs/dun.png" alt="" class="icon" />
          <img src="@/assets/imgs/dun-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.kyc')}}</span>
        </router-link>
        <router-link to="/kyc/changePwd" class="link-item">
          <img src="@/assets/imgs/edit.png" alt="" class="icon" />
          <img src="@/assets/imgs/edit-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.xgmm')}}</span>
        </router-link>
        <router-link to="/kyc/changePayPwd" class="link-item">
          <img src="@/assets/imgs/edit.png" alt="" class="icon" />
          <img src="@/assets/imgs/edit-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.xgzfmm')}}</span>
        </router-link>
        <router-link to="/kyc/order" class="link-item">
          <img src="@/assets/imgs/order.png" alt="" class="icon" />
          <img src="@/assets/imgs/order-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.order')}}</span>
        </router-link>
        
        <router-link to="/kyc/user_assets" class="link-item">
          <img src="@/assets/imgs/user_assets.png" alt="" class="icon" />
          <img src="@/assets/imgs/user_assets-1.png" alt="" class="icon-1" />
          <span>{{$t('assets.title')}}</span>
        </router-link>
        <router-link to="/kyc/about" class="link-item">
          <img src="@/assets/imgs/team.png" alt="" class="icon" />
          <img src="@/assets/imgs/team-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.about')}}</span>
        </router-link>
        <router-link to="/home/recharge" class="link-item">
          <img src="@/assets/imgs/bank.png" alt="" class="icon" />
          <img src="@/assets/imgs/bank-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.cz')}}</span>
        </router-link>
        <router-link to="/home/withdraw" class="link-item">
          <img src="@/assets/imgs/bank.png" alt="" class="icon" />
          <img src="@/assets/imgs/bank-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.tx')}}</span>
        </router-link>
        <router-link to="/home/history" class="link-item">
          <img src="@/assets/imgs/bank.png" alt="" class="icon" />
          <img src="@/assets/imgs/bank-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.jl')}}</span>
        </router-link>
        <router-link to="/kyc/collet" class="link-item">
          <img src="@/assets/imgs/order.png" alt="" class="icon" />
          <img src="@/assets/imgs/order-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.sclb')}}</span>
        </router-link>
        <div class="link-item" @click="logout">
          <img src="@/assets/imgs/right.png" alt="" class="icon" />
          <img src="@/assets/imgs/right-1.png" alt="" class="icon-1" />
          <span>{{$t('kyc.tc')}}</span>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="header">
        <router-link class="route" to="/home">
          <img src="@/assets/imgs/back.png" alt="" class="back" @click="back" />
          <span>{{$t('kyc.back')}}</span>
        </router-link>
      </div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const routers = useRouter();

  function logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userInfo');
    routers.push('/login');
  }
</script>

<style lang="scss" scoped>
.kyc {
  min-height: 100vh;
  @include flexLeft;
  align-items: stretch;
  .nav {
    width: 220px;
    background: #fafafa;
    // min-height: 100vh;
    // height: 100%;
    .logo {
      width: 116px;
      height: 40px;
      margin-top: 25px;
      margin-left: 14px;
    }
    .links {
      margin-top: 40px;
      .link-item {
        @include flexLeft;
        height: 60px;
        color: #738289;
        font-size: 14px;
        padding-left: 25px;
        position: relative;
        cursor: pointer;
        img {
          width: 26px;
          height: 26px;
          margin-right: 6px;
        }
        .icon-1 {
          display: none;
        }
      }
      .router-link-active {
        background: #ebfcff;
        .icon {
          display: none;
        }
        .icon-1 {
          display: block;
        }
      }
      .router-link-active::before {
        display: block;
        content: '';
        width: 4px;
        background: linear-gradient(to bottom, #13acca, #39ceeb);
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
  .main {
    flex: 1;
    margin: 0 35px;
    // min-height: 100vh;
    .header {
      width: 100%;
      border-bottom: 1px solid #ccc;
      padding-top: 25px;
      padding-bottom: 5px;
      .route{
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
  }
}
</style>