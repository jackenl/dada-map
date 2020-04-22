<template>
  <div class="http-404">
    <div class="pic-404">
      <img src="@/assets/img/404.gif" alt="">
    </div>
    <div class="content">
      <h1>网页丢失</h1>
      <p class="text">请检查您输入的网址是否正确</p>
      <a href="/" class="btn btn-primary">返回首页</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
.http-404 {
  padding-top: 100px;
  .pic-404 {
    width: 500px;
    margin: 50px auto;
    > img {
      width: 100%;
    }
  }
  .content {
    text-align: center;
    > h1 {
      padding-bottom: 20px;
      font-size: 18px;
      color: #333;
    }
    .text {
      padding-bottom: 20px;
      font-size: 13px;
      color: #999;
    }
    .btn {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      padding: 0 20px;
      text-decoration: none;
      background-color: #1989fa;
      border-radius: 30px;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
