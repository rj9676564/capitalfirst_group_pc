<template>
  <div>
    <div class="banner">
      <swiper :pagination="false" :navigation="false" loop>
        <swiper-slide v-for="(item, index) in banners" :key="index">
          <img :src="item.urlimg" alt="Carousel Image" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="notice">
      <img src="@/assets/imgs/notice.png" alt="" />
      <swiper
        :pagination="false"
        :navigation="false"
        loop
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        class="swiper"
        direction="vertical"
      >
        <swiper-slide v-for="(item, index) in notices" :key="index">
          <p>{{ locale === 'en' ? item.title_en : item.title }}</p>
        </swiper-slide>
      </swiper>
    </div>
    <div class="video">
      <div class="intro">
        <h3>{{$t('kyc.about')}}</h3>
        <p v-html="locale === 'en' ? content.content_en : content.content"></p>
      </div>
      <video src="https://ind.thecapitalfirst.com/uploads/video/549_1749445071.mp4" controls></video>
    </div>
    <div class="contacts">
      <h4>{{$t('home.tip')}}</h4>
      <span class="btn" @click="routers.push('/home/contact')">{{$t('home.contactus')}}</span>
    </div>
    <div class="faq">
      <h3>{{$t('home.faq')}}</h3>
      <div class="content">
        <div class="li" v-for="(item,index) in faqs" :key="item.id">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.css'
import { banner, about, notice, faqList } from '@/api'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const {locale} = useI18n()
const show = ref(-1)
const banners = ref([])
const content = ref('')
const notices = ref([])
const faqs = ref([])
const routers = useRouter()

function checkShow(e) {
  show.value = show.value === e ? -1 : e
}

function getBanner() {
  banner().then((res) => {
    if (res.code === 200) {
      banners.value = res.data
    }
  })
}

function getFaq() {
  faqList().then((res) => {
    faqs.value = res.data.list
  })
}

onMounted(() => {
  getBanner()
  getFaq()
  about().then((res) => {
    if (res.code === 200) {
      content.value = res.data
    }
  })
  notice().then((res) => {
    if (res.code === 200) {
      notices.value = res.data.list
    }
  })
});
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  border-top: 1px solid #fff;
  .title {
    position: absolute;
    font-size: 50px;
    font-weight: bold;
    color: #fff;
    left: 30%;
    top: 30%;
    width: 400px;
  }
  img {
    width: 100%;
  }
}
.notice {
  background: #f6f6f6;
  height: 40px;
  @include flexLeft;
  font-size: 12px;
  color: #738289;
  padding: 0 220px;
  img {
    width: 31px;
    height: 31px;
    margin-right: 6px;
  }
  .swiper {
    flex: 1;
    height: 100%;
    P {
      height: 100%;
      line-height: 40px;
    }
  }
}
.video {
  @include flexLeft;
  padding: 37px 220px;
  .intro {
    font-size: 12px;
    color: #000;
    margin-right: 47px;
    width:393px;
    h3 {
      margin-bottom: 18px;
      font-size: 30px;
    }
  }
  video {
    width: 400px;
    height: 250px;
    background: #000;
  }
}
.contacts {
  background: url(../assets/imgs/home-bg.png) no-repeat;
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
  }
  .btn {
    padding: 4px 20px;
    background: #fff;
    border-radius: 20px;
    font-size: 12px;
    color: #10abc9;
    cursor: pointer;
  }
}
.faq {
  padding: 38px 220px 58px 220px;
  h3 {
    text-align: center;
    font-size: 24px;
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
</style>