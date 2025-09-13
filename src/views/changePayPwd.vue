<template>
  <div class="view">
    <div class="flx" v-if="userStore.users.safe_status">
      <span class="label">{{$t('kyc.old')}}</span>
      <input type="password" v-model="pwd1" />
    </div>
    <div class="flx">
      <span class="label">{{$t('kyc.new')}}</span>
      <input type="password" v-model="pwd2" />
    </div>
    <div class="flx">
      <span class="label">{{$t('kyc.qd')}}</span>
      <input type="password" v-model="pwd3" />
    </div>
    <div class="btn" @click="confirm">
      <span>{{$t('home.confirm')}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { editPwd,userInfo } from '@/api'
import { useUserStore } from '@/store/user'
import {useI18n} from "vue-i18n"
const pwd1 = ref('')
const pwd2 = ref('')
const pwd3 = ref('')
const {t} = useI18n()
let loading = false
const userStore = useUserStore()

function getUserInfo() {
  userInfo().then((res) => {
    if (res.code === 200) {
      userStore.updateUsers(res.data)
    }
  })
}

function confirm() {
  if (!pwd1.value && userStore.users?.safe_status) {
    return ElMessage({
      message: t('kyc.srjmm'),
      type: 'error'
    })
  }
  if (!pwd2.value) {
    return ElMessage({
      message: t('kyc.srxmm'),
      type: 'error'
    })
  }
  if (!pwd3.value) {
    return ElMessage({
      message: t('kyc.qrmm'),
      type: 'error'
    })
  }
  if (pwd2.value !== pwd3.value) {
    return ElMessage({
      message: t('login.mmbyz'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  const type = userStore.users?.safe_status ? 2 : 3
  editPwd({ type, password: pwd2.value, relpassword: pwd3.value, old_password: pwd1.value }).then(
    (res) => {
      loading = false
      if (res.code === 200) {
        ElMessage({
          message: t('home.xgcg'),
          type: 'success'
        })
        pwd1.value = ''
        pwd2.value = ''
        pwd3.value = ''
        getUserInfo()
      } else {
        return ElMessage({
          message: res.msg,
          type: 'error'
        })
      }
    }
  )
}
</script>

<style lang="scss" scoped>
.view {
  padding: 40px;
  color: #000;
}
.flx {
  @include flexLeft;
  margin-top: 18px;
  .label {
    font-size: 16px;
    width: 60px;
  }
  input {
    width: 400px;
    height: 34px;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0 10px;
  }
}
.btn {
  @include flexCenter;
  width: 400px;
  margin-top: 57px;
  span {
    background: #4dadc7;
    color: #fff;
    width: 200px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>