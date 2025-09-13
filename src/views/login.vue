<template>
  <div class="container">
    <img src="@/assets/imgs/logo.png" class="logo" alt="" />
    <div class="box">
      <div class="input-box">
        <div class="title">
          <div :class="[{ active: navId === 1 }, 'left']" @click="navId = 1">
            {{ $t('login.login') }}
          </div>
          <div :class="[{ active: navId === 2 }, 'right']" @click="navId = 2">
            {{ $t('login.reg') }}
          </div>
        </div>
        <div class="tip">{{ $t('login.tip') }}</div>
        <div class="login" v-if="navId === 1">
          <input type="text" :placeholder="$t('login.srsjh')" v-model="name" class="username" />
          <input
            type="password"
            :placeholder="$t('login.srmm')"
            v-model="password"
            class="password"
          />
          <div class="btn">
            <div @click="loginHand">{{ $t('login.login') }}</div>
          </div>
          <div class="warn">
            <div>
              <span>{{ $t('login.goReg') }}</span>
              <span class="red" @click="navId = 2">{{ $t('login.reg') }}</span>
            </div>
            <div class="forgot" @click="find">{{ $t('login.wjmm') }}</div>
          </div>
        </div>
        <div class="reg" v-else>
          <input type="text" :placeholder="$t('login.srzh')" v-model="account" class="username" />
          <input type="tel" :placeholder="$t('login.srsjh')" v-model="name" class="username" />
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
          <div class="code">
            <input type="text" :placeholder="$t('login.sryzm')" v-model="code" class="lock" />
            <div :class="['code-btn', { disabled: isSend }]" @click="getCode">{{ txt }}</div>
          </div>
          <div class="btn">
            <div @click="reg">{{ $t('Register') }}</div>
          </div>
          <div class="warn">
            <span>{{ $t('goLogin') }}</span>
            <span class="red" @click="navId = 1">{{ $t('login.login') }}</span>
          </div>
        </div>
      </div>
    </div>
    <RecaptchaV2
      :sitekey="REACT_APP_RECAPTCHA_SITE_KEY"
      size="invisible"
      ref="recaptcha"
      @widget-id="handleWidgetId"
      @error-callback="handleErrorCallback"
      @expired-callback="handleExpiredCallback"
      @load-callback="handleLoadCallback"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { RecaptchaV2, useRecaptcha } from 'vue3-recaptcha-v2'
import { login, sendGoogleSms, register, verifyGoogleMsg, sendCode } from '@/api'
import { useUserStore } from '@/store/user'
import { useI18n } from 'vue-i18n'
import { REACT_APP_RECAPTCHA_SITE_KEY } from '@/config'

const { handleExecute } = useRecaptcha()
const { t } = useI18n()
const navId = ref(1)
const name = ref('')
const password = ref('')
const password1 = ref('')
const txt = ref(t('login.code'))
const code = ref('')
const account = ref('')
const routers = useRouter()
const userStore = useUserStore()
const recaptcha = ref(null) // 引用 reCAPTCHA 组件
let widgetId = ref(null)
const recaptchaResponse = ref()
let loading = false
let isSend = ref(false)
const ereg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

watch(navId, () => {
  name.value = ''
  password.value = ''
})

function find() {
  routers.push('/forgot')
}

const handleWidgetId = (tmpWidgetId) => {
  console.log('Widget ID: ', tmpWidgetId)
  widgetId.value = tmpWidgetId
}
const handleErrorCallback = () => {
  console.log('Error callback')
}
const handleExpiredCallback = () => {
  console.log('Expired callback')
}
const sessionInfo = ref(null)
const handleLoadCallback = async (response) => {
  console.log('Load callback', response)
  recaptchaResponse.value = response
  if (recaptchaResponse.value != null) {
    // 发送验证码
    sendGoogleSms({
      phoneNumber: '+86' + name.value,
      recaptchaToken: recaptchaResponse.value
    })
      .then((res) => res.json())
      .then((data) => {
        sessionInfo.value = data.sessionInfo
        startCountdown()
      })
  }
}

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
  // handleExecute(widgetId.value)
  if (isSend.value) return
  isSend.value = true
  sendCode({ account: name.value, mobile: name.value })
    .then((res) => {
      if (res.code === 200) {
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
      } else {
        isSend.value = false
      }
    })
    .catch(() => (isSend.value = false))
}

function loginHand() {
  if (!name.value) {
    return ElMessage({
      message: t('login.srzh'),
      type: 'error'
    })
  }
  if (!password.value) {
    return ElMessage({
      message: t('login.srmm'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  login({ account: name.value, login_pwd: password.value }).then((res) => {
    loading = false
    if (res.code === 200) {
      ElMessage({
        message: t('login.dlcg'),
        type: 'success'
      })
      sessionStorage.setItem('token', res.data)
      setTimeout(() => routers.push('/home'), 1500)
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}

const handleVerify = async () => {
  if (!code.value) {
    return ElMessage({
      message: t('login.sryzm'),
      type: 'error'
    })
  }
  verifyGoogleMsg({
    sessionInfo: sessionInfo.value,
    code: code.value
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.idToken) {
        regFunc()
      } else {
        return false
      }
    })
}

async function reg() {
  // if (widgetId.value == null) {
  //   return ElMessage({
  //     message: '请等待人机验证',
  //     type: 'error'
  //   })
  // }
  // if (recaptchaResponse.value == null) {
  //   return ElMessage({
  //     message: '请等待人机验证结果',
  //     type: 'error'
  //   })
  // }
  if (!account.value) {
    return ElMessage({
      message: t('login.srzh'),
      type: 'error'
    })
  }
  if (!name.value || !ereg.test(name.value)) {
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
  // handleVerify()
  regFunc()
}

function regFunc() {
  if (loading) return
  loading = true
  register({
    mobile: name.value,
    login_pwd: password.value,
    relogin_pwd: password1.value,
    code: code.value,
    account: account.value
  }).then((res) => {
    loading = false
    if (res.code === 200) {
      ElMessage({
        message: t('login.zccg'),
        type: 'success'
      })
      name.value = ''
      code.value = ''
      account.value = ''
      password.value = ''
      password1.value = ''
      setTimeout(() => (navId.value = 1), 1500)
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
  background: #fff url(../assets/imgs/login-bg.png) no-repeat;
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
      right: 210px;
      background: #fff;
      box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.1);
      padding-bottom: 60px;
      min-height: 606px;
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
        }
        .left {
          border-top-left-radius: 10px;
        }
        .right {
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
        text-align: center;
        margin-top: 80px;
        padding: 0 20px;
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
      .forgot {
        cursor: pointer;
        padding-left: 5px;
        margin-left: 5px;
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