<template>
  <h1 class="home-title">Home~~~</h1>
  <button @click="login">登录</button>
</template>

<script>
import { getcaptchas, accountLogin } from "../../service/getData";
export default {
  mounted() {
    this.getCode();
  },
  methods: {
    async getCode() {
      const result = await getcaptchas();
      console.log(result);
    },
    async login() {
      const result = await accountLogin({
        username: "17865974362",
        password: "lkh2369874",
        captcha_code: "5010",
      });
      console.log(result);
    },
  },
};
</script>

<style>
.home-title {
  color: deeppink;
  font-size: 30px;
}
</style>
