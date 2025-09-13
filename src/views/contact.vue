<template>
  <div class="warp">
    <div class="title">{{ $t('home.contact') }}</div>
    <div class="main">
      <div class="left">
        <div class="label">{{ $t('home.addr') }}</div>
        <div class="email">
          <img src="@/assets/imgs/email-1.png" alt="" />
          <span>{{ ourEmail }}</span>
        </div>
      </div>
      <div class="right">
        <div class="label">{{ $t('home.write') }}</div>
        <div class="flx">
          <input type="text" v-model="name" :placeholder="$t('home.name')" />
          <input type="text" v-model="firstName" :placeholder="$t('home.firstName')" />
        </div>
        <div class="flx">
          <input type="text" v-model="email" :placeholder="$t('email')" />
          <input type="text" v-model="phone" :placeholder="$t('phone')" />
        </div>
        <textarea name="" id="" placeholder="message" v-model="message"></textarea>
        <div class="agree">
          <input type="checkbox" v-model="isAgree" />
          <p @click="visibili = true">{{ $t('home.warn') }}</p>
        </div>
        <div class="btn" @click="send">{{ $t('send') }}</div>
      </div>
    </div>
    <el-dialog v-model="visibili" width="900">
      <div class="dia">
        <div class="title">
          {{$t('tx.ysxy')}}
        </div>
        <div class="content" v-html="locale === 'en' ? info.content_en : info.content"></div>
        <div class="btn">
          <span @click="visibili = false"> {{$t('tx.wyzx')}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { contactUs,privacy } from '@/api'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const name = ref('')
const firstName = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')
const isAgree = ref(true)
const ourEmail = ref('')
const visibili = ref(false)
const info = ref({})
const { t,locale } = useI18n()
let loading = false

function send() {
  if (!name.value) {
    return ElMessage({
      message: t('home.srmz'),
      type: 'error'
    })
  }
  if (!firstName.value) {
    return ElMessage({
      message: t('home.srx'),
      type: 'error'
    })
  }
  if (!email.value) {
    return ElMessage({
      message: t('home.sryx'),
      type: 'error'
    })
  }
  if (!phone.value) {
    return ElMessage({
      message: t('home.srsj'),
      type: 'error'
    })
  }
  if (!message.value) {
    return ElMessage({
      message: t('home.srxx'),
      type: 'error'
    })
  }
  if (!isAgree.value) {
    return ElMessage({
      message: t('home.tyxy'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  contactUs({
    content: message.value,
    mobile: phone.value,
    username: name.value,
    email: email.value,
    fristname: firstName.value
  }).then((res) => {
    loading = false
    if (res.code === 200) {
      ElMessage({
        message: t('login.send'),
        type: 'success'
      })
      name.value = ''
      firstName.value = ''
      email.value = ''
      phone.value = ''
      message.value = ''
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}

onMounted(() => {
  ourEmail.value = sessionStorage.getItem('email')
  privacy().then(res => {
    if(res.code === 200) info.value = res.data
  })
});
</script>

<style lang="scss" scoped>
.warp {
  min-height: 80vh;
  padding-top: 1px;
  .title {
    text-align: center;
    font-size: 36px;
    color: #000;
    margin-top: 58px;
    font-weight: bold;
  }
  .main {
    margin-top: 74px;
    padding: 0 220px;
    @include flexBetween;
    align-items: flex-start;
    .label {
      color: #738289;
      font-size: 24px;
      font-weight: bold;
    }
    .left {
      width: 250px;
      margin-right: 20px;
      .email {
        @include flexLeft;
        height: 40px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 11px;
        color: #738289;
        margin-top: 140px;
        img {
          width: 26px;
          height: 26px;
          margin-right: 6px;
        }
      }
    }
    .right {
      flex: 1;
      .flx {
        @include flexBetween;
        margin-top: 12px;
        input {
          border: 1px solid #ccc;
          height: 34px;
          width: 48%;
          border-radius: 8px;
          line-height: 34px;
          padding: 0 20px;
          font-size: 12px;
          color: #738289;
        }
      }
      textarea {
        width: 100%;
        height: 76px;
        padding: 10px 20px;
        font-size: 12px;
        color: #738289;
        border: 1px solid #ccc;
        border-radius: 8px;
        margin-top: 12px;
        outline: none;
      }
      .agree {
        @include flexLeft;
        color: #738289;
        font-size: 11px;
        align-items: flex-start;
        input {
          width: 14px;
          height: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-right: 12px;
          margin-top: 4px;
        }
        p{
          cursor: pointer;
        }
      }
      .btn {
        width: 200px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: #4dadc7;
        border-radius: 6px;
        margin-top: 40px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
.dia {
  padding: 30px 15px;
  .title{
    font-size:16px;
    font-weight:bold;
    color:#000;
    text-align:center;
    margin-bottom:30px;
    margin-top:0;
  }
  .content{
    max-height:400px;
    overflow-y: scroll;
  }
  .btn {
    @include flexCenter;
    margin-top: 50px;
    span {
      width: 100%;
      height: 40px;
      line-height: 40px;
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