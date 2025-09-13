<template>
  <div class="left">
    <div class="title">{{$t('kyc.sclb')}}</div>
    <div class="list">
      <div class="flx" v-for="item in list" :key="item.id" @click="getDetail(item.id)">
        <div>
          <div class="black">{{ item.name_en }}</div>
          <div>{{ item.contribution_value }}</div>
        </div>
        <div>
          <div class="black">{{$t('home.min')}}</div>
          <div class="money">${{ item.price }}</div>
        </div>
        <div>
          <div class="black">{{$t('kyc.date')}}</div>
          <div>{{ item.create_time }}</div>
        </div>
      </div>
    </div>
    <div class="pages">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="6"
        @change="changePage"
      />
    </div>
  </div>
</template>

<script setup>
import { colletList } from '@/api'
import { ref, onMounted } from 'vue'
const list = ref([])
const page = 1

function getList() {
  colletList({ page: page.value, limit: 1000 }).then((res) => {
    if (res.code === 200) {
      list.value = res.data.list
    }
  })
}

onMounted(() => {
  getList()
});
</script>

<style lang="scss" scoped>
.left {
  box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
  border-radius: 8px;
  margin:20px 40px;
  .title {
    height: 40px;
    line-height: 40px;
    background: linear-gradient(to bottom, #13acca, #39ceeb);
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding: 0 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .flx {
    @include flexBetween;
    padding: 15px 0;
    cursor: pointer;
    > div {
      flex: 1;
      text-align: center;
      font-size: 11px;
      color: #c1c1c1;
      .black {
        color: #111;
      }
      .money {
        color: #4dadc7;
      }
    }
    .btn {
      @include flexCenter;
      span {
        width: 60px;
        height: 23px;
        text-align: center;
        line-height: 23px;
        font-size: 11px;
        color: #fff;
        border-radius: 6px;
      }
      .up {
        background: #4ac09d;
      }
      .down {
        background: #ea3b48;
      }
    }
  }
}
</style>