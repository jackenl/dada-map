<template>
  <div class="login">
    <header class="header">
      <img class="logo" src="@/assets/img/logo.png" alt="logo" />
      <p class="title">哒哒出行</p>
    </header>
    <div class="login_wrapper">
      <div class="input-field">
        <input v-model="formData.username" type="text" placeholder="邮箱号/手机号" />
      </div>
      <div class="input-field">
        <input v-model="formData.password" type="password" placeholder="密码" />
      </div>
      <div class="link-field">
        <router-link to="javascript;;">注册</router-link>
        <router-link to="javascript;;">忘记密码</router-link>
      </div>
      <van-button class="btn" type="info" block round @click="handleLogin">登陆</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'

export default {
  name: 'login',
  components: {
    'van-button': Button,
  },
  data() {
    return {
      formData: {
        username: '13160883942',
        password: '123456',
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redrect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('user/login', this.formData).then(() => {
        this.$router.push({ path: this.redirect })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #fff;
  & .header {
    padding: 100px 0;
    text-align: center;
    & .logo {
      width: 120px;
      height: 120px;
    }
    & .title {
      margin-top: 20px;
      font-size: 18px;
      color: #565eff;
      letter-spacing: 2px;
    }
  }
  &_wrapper {
    width: 600px;
    margin: 0 auto;
    & .input-field {
      height: 80px;
      margin-top: 20px;
      border: 1px solid #ccc;
      border-radius: 40px;
      overflow: hidden;
      & > input {
        display: block;
        width: 100%;
        height: 80px;
        line-height: 80px;
        font-size: 14px;
        padding: 0 30px;
        border: none;
      }
    }
    & .link-field {
      display: flex;
      justify-content: space-between;
      height: 80px;
      line-height: 80px;
      & > a {
        padding: 0 20px;
        font-size: 14px;
        color: #1989fa;
      }
    }
    & .btn {
      margin-top: 30px;
    }
  }
}
</style>
