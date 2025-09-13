<template>
  <div class="page">
    <div class="label">Deposit</div>
    <div class="box">
      <div class="box-b">
        <div class="title">Enter Amount</div>
        <input type="text" placeholder="Enter Amount" v-model="account" />
        <div class="balance">Trading balance: $123,123.33</div>
        <div class="title">Select Withdrawal Method</div>
        <div class="flx">
          <div class="left">
            <p>PayPal = $ 10000.00</p>
            <p>Manual recharge,upload with reference.</p>
            <p>Transaction fee: $ 10.333</p>
          </div>
          <img src="@/assets/imgs/select.png" alt="" />
        </div>
        <div class="flx active">
          <div class="left">
            <p>Company Account  = $ 1,000.00 </p>
            <p>Manual recharge,upload with reference.</p>
            <p>Transaction fee: $ 10.333</p>
          </div>
          <img src="@/assets/imgs/select-1.png" alt="" />
        </div>
      </div>
    </div>
    <div class="btn">Proceed</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const account = ref('');
</script>

<style lang="scss" scoped>
.page {
  padding: 1px 220px;
  min-height: 80vh;
  .label {
    color: #738289;
    font-size: 24px;
    font-weight: bold;
    margin-top: 40px;
  }
  .box {
    // height: 260px;
    box-shadow: 0 0 10px 3px rgba(16, 171, 201, 0.2);
    border-radius: 8px;
    margin-top: 40px;
    padding-bottom: 40px;
    &-b{
      width:400px;
      margin:0 auto;
      padding:1px;
    }
    .title {
      color: #000;
      font-size: 15px;
      margin-top: 30px;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      line-height: 18px;
      color: #000;
    }
    input {
      border: 1px solid #ccc;
      border-radius: 6px;
      text-align: center;
      width: 100%;
      font-size: 12px;
      height: 34px;
      margin-top: 20px;
    }
    .balance {
      margin-top: 20px;
      font-size: 12px;
    }
    .flx {
      border: 1px solid #ccc;
      padding: 10px 6px;
      font-size: 12px;
      @include flexBetween;
      width: 100%s;
      border-radius: 6px;
      margin-top: 10px;
      cursor: pointer;
      img {
        width: 26px;
        height: 26px;
      }
    }
    .active{
      p{
        color:#fff;
      }
      background: #738289;
      border-color:#738289;
    }
  }
  .btn {
    background: #4dadc7;
    color: #fff;
    width: 200px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 15px;
    margin: 50px auto 120px auto;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>