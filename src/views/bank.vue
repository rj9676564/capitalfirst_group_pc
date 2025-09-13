<template>
  <div class="view">
    <div class="flx">
      <span class="label">Bank name</span>
      <input type="text" v-model="name" />
    </div>
    <div class="flx">
      <span class="label">Card number</span>
      <input type="text" v-model="card" />
    </div>
    <div class="warn">
      <div class="title">Tips</div>
      <p>1. New users must register by adding a bank card.</p>
      <P>2. Users can only add one personal bank card.</P>
      <P>3. Your real name must match your withdrawal card name.</P>
    </div>
    <div class="btn">
      <span>Verify</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const name = ref('');
const card = ref('');
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
    width: 110px;
  }
  input {
    width: 251px;
    height: 34px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
}
.warn{
  margin-top:37px;
  .title{
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: bold;
  }
  p{
    font-size: 12px;
    line-height: 18px;
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