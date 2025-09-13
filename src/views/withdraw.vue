<template>
  <div class="page">
    <div class="header">
      <router-link class="route" to="/home">
        <img src="@/assets/imgs/back.png" alt="" class="back" @click="back" />
        <span>{{ $t('kyc.back') }}</span>
      </router-link>
    </div>
    <div class="label">{{ $t('tx.title') }}</div>
    <div class="box">
      <div class="title">{{ $t('tx.tip') }}</div>
      <p>
        {{ $t('tx.tip1') }}
      </p>
      <p>{{ $t('tx.tip2') }}</p>
      <p>{{ $t('tx.tip3') }}</p>
      <input type="text" :placeholder="$t('tx.tip')" v-model="amount" />
      <div class="balance">{{ $t('tx.ye') }}: ${{ userStore.users.wp_num }}</div>
      <!-- <div class="balance">{{ $t('tx.gz') }}: ${{ info.min }} - {{ info.max }}</div> -->
    </div>
    <div class="box box-last">
      <div class="title">{{ $t('tx.info') }}</div>
      <div class="flx">
        <span class="label">{{ $t('recharge.yhmc') }}</span>
        <input type="text" v-model="card" />
      </div>
      <!-- <div class="flx">
        <span class="label">{{ $t('home.addr') }}</span>
        <input type="text" v-model="address" />
      </div> -->
      <div class="flx">
        <span class="label">{{ $t('home.name') }}</span>
        <input type="text" v-model="name" />
      </div>
      <div class="flx">
        <span class="label">{{ $t('home.phone') }}</span>
        <input type="text" v-model="mobile" />
      </div>
      <div class="flx">
        <span class="label">{{ $t('tx.pwd') }}</span>
        <input type="password" v-model="pwd" />
      </div>
      <div class="title">{{ $t('tx.warn') }}</div>
    </div>
    <div class="btn" @click="submit">{{ $t('recharge.qd') }}</div>
  </div>
</template>

<script setup>
import { withdrawInfo, withdraw, userInfo } from '@/api'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
const userStore = useUserStore()
const amount = ref('')
const info = ref({})
const card = ref('')
const address = ref('')
const name = ref('')
const mobile = ref('')
const pwd = ref('')
const { t } = useI18n()
let loading = false

function getUserInfo() {
  userInfo().then((res) => {
    if (res.code === 200) {
      userStore.updateUsers(res.data)
    }
  })
}

function submit() {
  if (!userStore.users.safe_status) {
    setTimeout(() => routers.push('/kyc/changePayPwd'))
    return ElMessage({
      message: t('home.szzfmm'),
      type: 'error'
    })
  }
  if (!amount.value) {
    return ElMessage({
      message: t('recharge.srsl'),
      type: 'error'
    })
  }
  if (+amount.value < info.value.min) {
    return ElMessage({
      message: t('recharge.min') + info.value.min,
      type: 'error'
    })
  }
  if (+amount.value > info.value.max) {
    return ElMessage({
      message: t('recharge.max') + info.value.max,
      type: 'error'
    })
  }
  if (!card.value) {
    return ElMessage({
      message: t('tx.srkh'),
      type: 'error'
    })
  }
  // if (!address.value) {
  //   return ElMessage({
  //     message: t('tx.srdz'),
  //     type: 'error'
  //   })
  // }
  if (!name.value) {
    return ElMessage({
      message: t('tx.srmz'),
      type: 'error'
    })
  }
  if (!mobile.value) {
    return ElMessage({
      message: t('tx.srdh'),
      type: 'error'
    })
  }
  if (!pwd.value) {
    return ElMessage({
      message: t('home.srzfmm'),
      type: 'error'
    })
  }
  if (+amount.value > userStore.users.wp_num) {
    return ElMessage({
      message: t('tx.zhyebz'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  withdraw({
    amount: amount.value,
    // address: address.value,
    to_username: name.value,
    to_mobile: mobile.value,
    to_bankcard: card.value,
    safety_pwd: pwd.value
  }).then((res) => {
    loading = false
    if (res.code === 200) {
      ElMessage({
        message: t('home.success'),
        type: 'success'
      })
      amount.value = ''
      card.value = ''
      name.value = ''
      mobile.value = ''
      address.value = ''
      getUserInfo()
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}

onMounted(() => {
  withdrawInfo().then((res) => {
    if (res.code === 200) info.value = res.data
  })
});
</script>

<style lang="scss" scoped>
.page {
  padding: 1px 220px;
  min-height: 80vh;
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
  .label {
    color: #738289;
    font-size: 24px;
    font-weight: bold;
    margin-top: 40px;
  }
  .box {
    height: 280px;
    box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
    border-radius: 8px;
    padding: 1px 0 20px 170px;
    margin-top: 40px;
    .title {
      color: #000;
      font-size: 15px;
      margin-top: 40px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      line-height: 18px;
      color: #000;
    }
    input {
      border: 1px solid #ccc;
      border-radius: 6px;
      text-align: center;
      width: 310px;
      font-size: 12px;
      height: 34px;
      margin-top: 20px;
    }
    .balance {
      margin-top: 20px;
      font-size: 12px;
    }
    .flx {
      @include flexBetween;
      align-items: center;
      margin-top: 10px;
      img {
        width: 26px;
        height: 26px;
      }
      .label {
        width: 120px;
        text-align: right;
        font-size: 14px;
        line-height: 40px;
        margin: 0;
      }
      input {
        flex: 1;
        border: 1px solid #ccc;
        border-radius: 6px;
        height: 40px;
        padding: 0 10px;
        margin: 0 20px;
        text-align: left;
      }
    }
  }
  .box-last {
    height: auto;
  }
  .btn {
    background: #4dadc7;
    color: #fff;
    width: 200px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    margin: 50px auto 120px auto;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>