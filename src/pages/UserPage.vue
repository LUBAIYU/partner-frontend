<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getCurrentUserAPI} from "../apis/user.ts";
import {getCurrentUser} from "../states/user.ts";
import {showFailToast} from "vant";

const router = useRouter();
const user = ref({})

//获取登录的用户信息
const getLoginUser = async () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    user.value = currentUser;
  } else {
    const res = await getCurrentUserAPI();
    if (res.code === 0) {
      user.value = res.data;
    } else {
      showFailToast(res.msg);
    }
  }
}

onMounted(() => getLoginUser())
</script>

<template>
  <van-cell title="用户名" :value="user?.username"/>
  <van-cell title="个人信息" is-link to="/user/info"/>
  <van-cell title="我创建的队伍" is-link to="/team/my/create"/>
  <van-cell title="我加入的队伍" is-link to="/team/my/join"/>
</template>

<style scoped>

</style>