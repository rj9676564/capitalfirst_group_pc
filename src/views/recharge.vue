<template>
  <div class="page">
    <div class="header">
      <router-link class="route" to="/home">
        <img src="@/assets/imgs/back.png" alt="" class="back" @click="back" />
        <span>{{ $t('kyc.back') }}</span>
      </router-link>
    </div>
    <div class="label">{{ $t('recharge.tip1') }}</div>
    <div class="service">
      <img src="@/assets/imgs/service.png" alt="" />
      <span> {{ $t('home.contactus') }}</span>
    </div>
    <div class="funds">
      <p>{{ $t('recharge.funds') }}</p>
      <p class="num">$ {{ userStore.users.wp_num }}</p>
    </div>
    <input type="number" :placeholder="$t('recharge.srsl')" v-model="amount" class="input" />
    <div class="tips">{{ $t('recharge.transfer') }}: ${{ info.min }} - {{ info.max }}</div>
    <div class="content">
      <div class="title">{{ $t('recharge.czxx') }}</div>
      <p>{{ $t('recharge.kh') }}：{{ info.cardname }}</p>
      <p>{{ $t('recharge.yhmc') }}：{{ info.cardnumber }}</p>
      <p>{{ $t('recharge.type') }}：{{ info.cardtype }}</p>
    </div>
    <div class="upload">
      <div class="title">{{ $t('recharge.scpz') }}</div>
      <div class="up" v-loading="loading1">
        <input type="file" accept="image/*" @change="handleImageUpload1" />
        <img :src="img1" alt="" v-if="img1" class="cover" />
        <img src="@/assets/imgs/add.png" alt="" v-else />
      </div>
    </div>
    <div class="btn" @click="submit">{{ $t('recharge.qd') }}</div>
  </div>
</template>

<script setup>
import { upload, depositInfo, deposit, userInfo } from '@/api'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const userStore = useUserStore()
const img1 = ref('')
const loading1 = ref(false)
const amount = ref('')
const info = ref({})
const routers = useRouter()
const { t } = useI18n()
let loading = false

function handleImageUpload1(e) {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('file', file)
  loading1.value = true
  upload(formData).then((res) => {
    loading1.value = false
    img1.value = res.data
  })
}

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
  if (!img1.value) {
    return ElMessage({
      message: t('recharge.pscpz'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  deposit({ amount: amount.value, url: img1.value }).then((res) => {
    loading = false
    if (res.code === 200) {
      ElMessage({
        message: t('home.success'),
        type: 'success'
      })
      amount.value = ''
      img1.value = ''
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
  depositInfo().then((res) => {
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
  .tips {
    font-size: 14px;
    margin-top: 10px;
  }
  .service {
    background: #10abc9;
    height: 40px;
    @include flexCenter;
    font-size: 18px;
    color: #fff;
    border-radius: 6px;
    margin-top: 20px;
    width: 700px;
    img {
      width: 36px;
      height: 36px;
      margin-right: 6px;
    }
  }

  .funds,
  .input {
    border: 1px solid #ccc;
    border-radius: 6px;
    height: 40px;
    @include flexLeft;
    padding: 0 15px;
    font-size: 15px;
    margin-top: 20px;
    width: 700px;
    p {
      flex: 1;
      font-weight: bold;
    }
    .num {
      color: #4dadc7;
      padding-left: 100px;
    }
  }
  .content {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0 15px 20px 15px;
    font-size: 15px;
    margin-top: 20px;
    height: 170px;
    width: 700px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-top: 25px;
    }
    p {
      font-size: 12px;
      line-height: 18px;
      margin-top: 10px;
    }
  }
  .upload {
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
    }
    .up {
      width: 80px;
      height: 80px;
      margin-top: 20px;
      cursor: pointer;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
        z-index: 9;
        opacity: 0;
        cursor: pointer;
        padding: 0;
      }
    }
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