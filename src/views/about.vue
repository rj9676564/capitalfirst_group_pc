<template>
  <div class="view">
    <div class="title">{{$t('kyc.about')}}</div>
    <p v-html="locale === 'en' ? content.content_en : content.content"></p>
  </div>
</template>

<script setup>
import {ref,onMounted} from 'vue';
import {about} from '@/api';
import { useI18n } from 'vue-i18n';
const content = ref('')
const { locale } = useI18n()

onMounted(() => {
  about().then(res => {
    if(res.code === 200){
      content.value = res.data
    }
  })
});
</script>

<style lang="scss" scoped>
.view {
  padding: 40px;
  color: #000;
  width:80%;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
p {
  font-size: 12px;
  line-height: 18px;
  margin-top:20px;
}
</style>