<template>
  <div class="container">
    <img src="@/assets/imgs/logo.png" class="logo" alt="" />
    <div class="box">
      <div class="input-box">
        <div class="title">
          <div class="active">{{ $t('login.forgot') }}</div>
        </div>
        <div class="tip">{{ $t('login.tip1') }}</div>
        <div class="reg">
          <input type="text" :placeholder="$t('login.srsjh')" v-model="name" class="username" />
          <div class="code">
            <input type="text" :placeholder="$t('login.sryzm')" v-model="code" class="lock" />
            <div :class="['code-btn', { disabled: isSend }]" @click="getCode">{{ txt }}</div>
          </div>
          <input
            type="password"
            :placeholder="$t('login.srmm')"
            v-model="password"
            class="password"
          />
          <input
            type="password"
            :placeholder="$t('login.zcsrmm')"
            v-model="password1"
            class="password"
          />
          <div class="btn">
            <div @click="confirm">{{ $t('login.ok') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { changePwd, sendCodeForgot } from '@/api'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const name = ref('')
const password = ref('')
const password1 = ref('')
const code = ref('')
const routers = useRouter()
const txt = ref(t('login.code'))
let loading = false
let isSend = ref(false)
const ereg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/


function startCountdown() {
  ElMessage({
    message: t('login.send'),
    type: 'success'
  })
  let time = 60
  txt.value = time + 's'
  const timer = setInterval(() => {
    time--
    txt.value = time + 's'
    if (time == 0) {
      clearInterval(timer)
      txt.value = t('login.code')
      isSend.value = false
    }
  }, 1000)
}

function getCode() {
  if (!name.value || !ereg.test(name.value)) {
    return ElMessage({
      message: t('login.srsjh'),
      type: 'error'
    })
  }
  if (isSend.value) return
  isSend.value = true
  sendCodeForgot({ account: name.value, mobile: name.value })
    .then((res) => {
      if (res.code === 200) {
        startCountdown()
      } else {
        isSend.value = false
      }
    })
    .catch(() => (isSend.value = false))
}


async function confirm() {
  if (!name.value) {
    return ElMessage({
      message: t('login.srsjh'),
      type: 'error'
    })
  }
  if (!password.value) {
    return ElMessage({
      message: t('login.srmm'),
      type: 'error'
    })
  }
  if (!password1.value) {
    return ElMessage({
      message: t('login.zcsrmm'),
      type: 'error'
    })
  }
  if (!code.value) {
    return ElMessage({
      message: t('login.sryzm'),
      type: 'error'
    })
  }
  if (password.value !== password1.value) {
    return ElMessage({
      message: t('login.mmbyz'),
      type: 'error'
    })
  }
  changeFunc()
}

function changeFunc(){
  if (loading) return
  loading = true
  changePwd({
    account: name.value,
    login_pwd: password.value,
    relogin_pwd: password1.value,
    code: code.value
  }).then((res) => {
    loading = false
    if (res.code === 200) {
      ElMessage({
        message: t('login.xgcg'),
        type: 'success'
      })
      name.value = ''
      code.value = ''
      password.value = ''
      password1.value = ''
      setTimeout(() => routers.push('/login'), 1500)
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: #0089f5 url(../assets/imgs/login-bg.png) no-repeat;
  background-size: cover;
  .logo {
    width: 201px;
    height: 101px;
    margin-top: 42px;
    margin-left: 106px;
  }
  .box {
    width: 100%;
    position: relative;
    .input-box {
      position: absolute;
      width: 405px;
      top: 50%;
      border-radius: 10px;
      right: 50%;
      transform: translateX(50%);
      background: #fff;
      box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1);
      padding-bottom: 60px;
      // height: 606px;
      .title {
        @include flexLeft;
        font-size: 24px;
        color: #ccc;
        height: 60px;
        line-height: 60px;
        background: #f1f9fb;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        > div {
          flex: 1;
          text-align: center;
          cursor: pointer;
        }
        .active {
          background: #fff;
          color: #10abc9;
          position: relative;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        .active::before {
          position: absolute;
          display: block;
          content: '';
          width: 30px;
          height: 4px;
          background: #10abc9;
          left: 50%;
          transform: translateX(-50%);
          bottom: 5px;
          border-radius: 4px;
        }
      }
      .tip {
        font-size: 16px;
        color: #232323;
        // text-align: center;
        margin-top: 50px;
        padding: 0 30px;
        // margin-bottom: 30px;
      }
      .login,
      .reg {
        padding: 0 30px;
      }
      input {
        padding: 0 20px 0 50px;
        margin-top: 20px;
        display: block;
        width: 100%;
        font-size: 16px;
        color: #2b2b2b;
        height: 45px;
        line-height: 45px;
        border-radius: 8px;
        flex: 1;
      }
      .username {
        background: #f6f6f6 12px center url(../assets/imgs/youxiang.svg) no-repeat;
        background-size: 20px;
      }
      .password {
        background: #f6f6f6 8px center url(../assets/imgs/lock.png) no-repeat;
        background-size: 30px;
      }
      .lock {
        background: #f6f6f6 8px center url(../assets/imgs/dun.png) no-repeat;
        background-size: 30px;
      }
      .btn {
        @include flexCenter;
        margin-top: 60px;
        > div {
          width: 100%;
          height: 45px;
          background: #10abc9;
          color: #fff;
          border-radius: 8px;
          font-size: 24px;
          cursor: pointer;
          text-align: center;
          line-height: 45px;
        }
      }
      .red {
        color: #ff0000;
        cursor: pointer;
      }
      .warn {
        @include flexBetween;
        font-size: 16px;
        color: #232323;
        margin-top: 60px;
        align-items: flex-start;
        div {
          flex: 1;
        }
      }
      .reg {
        .code {
          margin-top: 20px;
          @include flexBetween;
          input {
            margin-top: 0;
          }
          &-btn {
            background: #10abc9;
            color: #fff;
            border-radius: 6px;
            margin-left: 8px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            width: 100px;
            cursor: pointer;
          }
          .disabled {
            background: #738289;
          }
        }
        .btn {
          margin-top: 30px;
        }
        .warn {
          @include flexCenter;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>