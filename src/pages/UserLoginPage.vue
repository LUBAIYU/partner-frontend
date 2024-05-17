<script setup lang="ts">
import {ref} from "vue";
import {userLoginAPI} from "../apis/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute} from "vue-router";
import {setCurrentUser} from "../states/user.ts";

const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await userLoginAPI({
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  if (res.code === 0) {
    showSuccessToast('登录成功');
    //保存登录的用户信息
    setCurrentUser(res.data);
    //跳转到之前的页面
    window.location.href = route.query?.redirect as string ?? '/';
  } else {
    showFailToast(res.msg);
  }
};
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>