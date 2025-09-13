<template>
  <div class="view">
    <div class="title">{{$t('kyc.rule')}}</div>
    <p>{{$t('kyc.tip1')}}</p>
    <p>{{$t('kyc.tip2')}}</p>
    <p>{{$t('kyc.tip3')}}</p>
    <div class="flx mt">
      <span class="label">{{$t('home.name')}}</span>
      <input type="text" v-model="name" />
    </div>
    <div class="flx">
      <span class="label">{{$t('kyc.id')}}</span>
      <input type="text" v-model="card" />
    </div>
    <div class="upload">
      <div class="img" v-loading="loading1">
        <img :src="img1" alt="" v-if="img1">
        <div v-else>
          <input type="file" accept="image/*" @change="handleImageUpload1">
          <span>{{$t('kyc.zm')}}</span>
        </div>
      </div>
      <div class="img" v-loading="loading2">
        <img :src="img2" alt="" v-if="img2">
        <div v-else>
          <input type="file" accept="image/*" @change="handleImageUpload2">
          <span>{{$t('kyc.fm')}}</span>
        </div>
      </div>
    </div>
    <div class="btn">
      <span @click="submit">{{$t('homee.confirm')}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import {upload,realname} from "@/api";
import {useI18n} from "vue-i18n";
const name = ref('');
const card = ref('');
const img1 = ref('');
const img2 = ref('');
const loading1 = ref(false);
const loading2 = ref(false);
const  {t} = useI18n();
let loading = false;

function handleImageUpload2(e){
  const file = e.target.files[0]
  const formData = new FormData();
  formData.append('file', file);
  loading2.value = true;
  upload(formData).then(res => {
    loading2.value = false
    img2.value = res.data
  })
}

function handleImageUpload1(e){
  const file = e.target.files[0]
  const formData = new FormData();
  formData.append('file', file);
  loading1.value = true;
  upload(formData).then(res => {
    loading1.value = false
    img1.value = res.data
  })
}

function submit (){
  if (!name.value) {
    return ElMessage({
      message: t('home.srmz'),
      type: 'error'
    })
  }
  if (!card.value) {
    return ElMessage({
      message: t('kyc.srid'),
      type: 'error'
    })
  }
  if (!img1.value) {
    return ElMessage({
      message: t('kyc.sczm'),
      type: 'error'
    })
  }
  if (!img2.value) {
    return ElMessage({
      message: t('kyc.scfm'),
      type: 'error'
    })
  }
  if (loading) return
  loading = true
  realname({name:name.value,idcard:card.value,faceimg:img1.value,backimg:img2.value}).then(res => {
    loading = false
    if (res.code === 200) {
      ElMessage({
        message: t('home.success'),
        type: 'success'
      })
    } else {
      return ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.view {
  padding: 40px;
  color: #000;
  .title {
    font-size: 18px;
    margin-bottom: 22px;
  }
  p {
    font-size: 12px;
    line-height: 18px;
  }
  .flx {
    @include flexLeft;
    margin-top: 18px;
    padding-left: 20px;
    .label {
      font-size: 16px;
      width: 60px;
    }
    input {
      width: 400px;
      height: 34px;
      border: 1px solid #ccc;
      border-radius: 6px;
      padding:0 10px;
    }
  }
  .mt {
    margin-top: 57px;
  }
  .upload {
    width: 400px;
    margin-top: 58px;
    @include flexBetween;
    font-size: 15px;
    .img {
      width: 164px;
      height: 118px;
      @include flexCenter;
      border: 1px dashed #ccc;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      img{
        width:100%;
        height: 100%;
      }
      input{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background: transparent;
        z-index: 9;
        opacity:0;
        cursor: pointer;
        padding:0;
      }
    }
  }
  .btn {
    @include flexCenter;
    width:400px;
    margin-top:57px;
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
}
</style>