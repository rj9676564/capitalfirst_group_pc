<template>
  <div class="container">
    <div class="left-nav">
      <div class="logo">
        <img src="@/assets/imgs/logo.png" alt="">
        <div>{{$t("login.title")}}</div>
      </div>
      <ul>
        <li class="active">
          <router-link to="workbench">
            <img src="@/assets/imgs/workBench.png" alt="">
            <span>{{$t("home.workbench")}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="userList">
            <img src="@/assets/imgs/userList.png" alt="">
            <span>{{$t("home.userList")}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="proxy">
            <img src="@/assets/imgs/proxy.png" alt="">
            <span>{{$t("home.proxy")}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="financial">
            <img src="@/assets/imgs/fundDetail.png" alt="">
            <span>{{$t("home.financial")}}</span>
          </router-link>
        </li>
        <!-- <li>
          <router-link to="topUp">
            <img src="@/assets/imgs/detail.png" alt="">
            <span>Top-up details</span>
          </router-link>
        </li> -->
        <li>
          <router-link to="withdrawal">
            <img src="@/assets/imgs/withdrawal.png" alt="">
            <span>{{$t("home.record")}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="resource">
            <img src="@/assets/imgs/resource.png" alt="">
            <span>{{$t("home.resource")}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="video">
            <img src="@/assets/imgs/video.png" alt="">
            <span>{{$t("home.upload")}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="topUp">
            <img src="@/assets/imgs/video.png" alt="">
            <span>{{$t("home.topUp")}}</span>
          </router-link>
        </li>
        <li>
          <router-link to="sign">
            <img src="@/assets/imgs/video.png" alt="">
            <span>{{$t("home.sign")}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="right-box">
      <header class="head">
        <div class="left">
          <img src="@/assets/imgs/menu.png" alt="" class="menu">
          <img src="@/assets/imgs/refresh.png" alt="" class="refresh">
          <div class="prolist">
            <p v-for="(item,index) in proList" :key="index">{{ item.level_name.en }} x {{ item.level_count }}</p>
          </div>
        </div>
        <div class="right">
          <img src="@/assets/imgs/admin.png" alt="" class="admin-icon">
          <span>{{ userName }}</span>
          <div class="out" @click="logout">Logout</div>
        </div>
      </header>
      <div class="position">
        <div>{{$t("home.home")}} / {{meta}}</div>
        <div class="sub-title" v-if="subTitle">{{ subTitle }}</div>
      </div>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref,watch,onMounted } from "vue";
import { useRoute,useRouter } from 'vue-router';
// import {userInfo,myPro} from "@/api";

const route = useRoute();
const routers = useRouter();
const userName = ref('admin');
const meta = ref('Workbean');
const subTitle = ref('');
const proList = ref([]);

watch(() => route.meta, (newMeta) => {
  meta.value = newMeta.title;
  subTitle.value = newMeta.subTitle;
});

onMounted(() => {
  // userInfo().then(res => {
  //   userName.value = res.data.nickname;
  // })
  // myPro().then(res => {
  //   proList.value = res.data;
  // })
});

function logout(){
  sessionStorage.removeItem('token')
  routers.replace({ path: '/login', replace: true });
}
</script>

<style scoped lang="scss">
  .container{
    min-height: 100vh;
    @include flexLeft;
    align-items: stretch;
    .left-nav{
      width: 350px;
      background: #2B2B2B;
      min-height: 100vh;
      .logo{
        margin-top:90px;
        text-align: center;
        color:#fff;
        font-size: 24px;
        img{
          width: 80px;
          height: 80px;
          margin-bottom: 10px;
        }
      }
      ul{
        padding-left:28px;
        margin-top:53px;
        li{
          height: 40px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          color:#fff;
          font-size: 16px;
          margin-top:20px;
          a{
            color:#fff;
            display: block;
            width: 100%;
            height: 100%;
            @include flexLeft;
            padding-left: 28px;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            img{
              width: 26px;
              margin-right: 19px;
            }
          }

        }
        .router-link-active{
          background: #0089F5;
        }
      }
    }
    .right-box{
      flex:1;
      height: 100%;
      overflow: auto;
      .head{
        height: 100px;
        border-bottom: 1px solid #ccc;
        @include flexBetween;
        padding:25px 100px 0 52px;
        .left,.right{
          @include flexLeft;
        }
        .left{
          .menu{
            width: 36px;
            margin-right: 27px;
            cursor: pointer;
          }
          .refresh{
            width: 38px;
            cursor: pointer;
          }
          .prolist{
            margin-left: 27px;
            @include flexLeft;
            p{
              color:#8C8C8C;
              font-size: 20px;
              // font-weight: bold;
              margin-right: 20px;
            }
          }
        }
        .right{
          color:#8C8C8C;
          font-size: 24px;
          position: relative;
          height: 100px;
          .admin-icon{
            width: 30px;
            margin-right:12px;
          }
          .out{
            position: absolute;
            top:80px;
            padding:10px 20px;
            background: #fff;
            border-radius: 12px;
            left:50%;
            transform: translateX(-50%);
            box-shadow: 0 0 10px 0 #ccc;
            cursor: pointer;
            display: none;
          }
        }
        .right:hover .out{
          display: block;
        }
      }
    }
    .position{
      color:#8C8C8C;
      font-size: 24px;
      margin-top:41px;
      margin-left:54px;
      margin-bottom: 36px;
      .sub-title{
        color:#0089F5;
        font-size: 24px;
        font-weight: bold;
        margin-top:25px;
      }
    }
  }
</style>