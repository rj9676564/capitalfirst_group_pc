<template>
  <div class="container">
    <div class="head">
      <img src="@/assets/imgs/logo.png" alt="">
      <div class="right">
        <router-link to="/home/main">{{$t('home.home')}}</router-link>
        <router-link to="/home/market">{{$t('home.market')}}</router-link>
        <router-link to="/home/faq">{{$t('home.faq')}}</router-link>
        <router-link to="/home/contact">{{$t('home.contact')}}</router-link>
        <div class="lang" @click="changeLang">{{lang === 'en' ? 'EN' : '中'}}</div>
        <div class="login" @click="login" v-if="!users.account">{{$t('home.login')}}</div>
        <div class="account" v-else @click="goKYC">
          <img src="@/assets/imgs/user-1.png" alt="">
          <span>{{users.account}}</span>
        </div>
      </div>
    </div>
    <RouterView />
    <div class="foot">
      <div class="left">
        <img src="@/assets/imgs/email.png" alt="">
        <span>{{email}}</span>
      </div>
      <div class="right">
        <img src="@/assets/imgs/youtube.png" alt="">
        <img src="@/assets/imgs/fk.png" alt="">
        <img src="@/assets/imgs/x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
  import {ref,onMounted} from 'vue';
  import { useRouter } from 'vue-router';
  import {userInfo,ourEmail} from "@/api";
  import { useUserStore } from '@/store/user';
  import { useI18n } from 'vue-i18n';

  const routers = useRouter();
  const userStore = useUserStore();
  const users = ref({});
  const email = ref('');
  const lang = ref('en');
  const { locale } = useI18n();

  function login(){
    routers.push('/login');
  }

  function goKYC(){
    routers.push('/kyc');
  }

  function changeLang(){
    locale.value = lang.value === 'en' ? 'hk' : 'en'
    lang.value = lang.value === 'en' ? 'hk' : 'en'
    localStorage.setItem('lang',lang.value)
  }

  function getUserInfo(){
    userInfo().then(res => {
      if(res.code === 200){
        userStore.updateUsers(res.data)
        users.value = res.data
      }
    })
  }

  onMounted(() => {
    lang.value = locale.value;
    getUserInfo();
    if(!sessionStorage.getItem('email')){
      ourEmail().then(res => {
        email.value = res.data
        sessionStorage.setItem('email',res.data)
      })
    }else{
      email.value = sessionStorage.getItem('email')
    }
  });
</script>

<style lang="scss" scoped>
  .container{
    .head{
      @include flexBetween;
      background: url(../assets/imgs/head-bg.png) no-repeat;
      background-size: cover;
      height: 90px;
      padding:0 70px;
      img{
        width:201px;
        height: 80px;
      }
      .lang{
        width:30px;
        font-size: 18px;
        font-weight: bold;
        color:#fff;
        cursor: pointer;
      }
      .right{
        @include flexRight;
        img{
          width:30px;
          height: 30px;
          margin:0 20px;
        }
        a{
          color:#fff;
          font-size: 18px;
          margin:0 20px;
        }
        .router-link-active{
          font-weight: bold;
        }
        .login,.account{
          cursor: pointer;
          background: #fff;
          padding:0 20px;
          border-radius: 20px;
          height: 24px;
          line-height: 24px;
          font-size: 12px;
          color:#10ABC9;
          margin-left: 20px;
        }
        .account{
          // width:140px;
          @include flexCenter;
          img{
            width:26px;
            height: 26px;
            margin-right: 6px;
            margin-left: 0;
          }
        }
      }
    }
    .foot{
      background: #738289;
      height: 90px;
      padding:0 220px;
      @include flexBetween;
      .left{
        @include flexLeft;
        font-size: 10px;
        color:#fff;
        img{
          width:26px;
          height: 26px;
        }
      }
      .right{
        img{
          width: 31px;
          height: 31px;
          margin-left:10px;
          cursor: pointer;
        }
      }
    }
  }
</style>