<template>
  <div class="container">
    <div class="main">
      <h3>{{$t('home.title')}}</h3>
      <div class="content">
        <div class="li" v-for="(item,index) in list" :key="item.id">
          <div class="title" @click="checkShow(index)">
            <h4>{{locale === 'en' ? item.title_en : item.title}}</h4>
            <img src="@/assets/imgs/arrow-right.png" alt="" :class="{ rotate: show === index }" />
          </div>
          <div :class="['txt', { active: show === index }]">
            <div v-html="locale === 'en' ? item.content_en : item.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="contacts">
      <h4>{{$t('home.tip')}}</h4>
      <span class="btn" @click="routers.push('/home/contact')">{{$t('home.contactus')}}</span>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {faqList} from "@/api"
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const {locale} = useI18n()
const show = ref(0)
const list = ref([])
const routers = useRouter()

function checkShow(e) {
  show.value = show.value === e ? -1 : e
}

onMounted(() => {
  faqList().then(res => {
    list.value = res.data.list
  })
});
</script>

<style lang="scss" scoped>
.main {
  padding: 57px 220px 40px 220px;
  min-height:65vh;
  h3 {
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
    color: #000;
  }
  .li {
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    .title {
      @include flexBetween;
      cursor: pointer;
      h4 {
        font-size: 18px;
        color: #281f24;
      }
      img {
        width: 26px;
        height: 26px;
      }
      .rotate {
        transform: rotate(90deg);
        transition: all ease 0.3s;
      }
    }
    .txt {
      margin-top: 20px;
      font-size: 12px;
      line-height: 18px;
      overflow: hidden;
      height: 0;
      transition: all ease 0.3s;
    }
    .active {
      height: auto;
      padding-bottom: 20px;
      transition: all ease 0.3s;
    }
  }
}
.contacts {
  background: url(../assets/imgs/faq-1.png) no-repeat;
  background-size: 100%;
  height: 150px;
  padding: 1px;
  text-align: center;
  h4 {
    font-size: 24px;
    color: #fff;
    text-align: center;
    margin-top: 34px;
    margin-bottom: 20px;
    color: #4dadc7;
  }
  .btn {
    padding: 4px 20px;
    background: #4dadc7;
    border-radius: 20px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
  }
}
</style>