<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {getCurrentUserAPI} from "../apis/user.ts";
import {getCurrentUser} from "../states/user.ts";
import {showFailToast} from "vant";

const router = useRouter();
const user = ref({})

const edit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue
    }
  })
}

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
  <van-cell title="昵称" is-link @click="edit('username','昵称',user.username)" :value="user.username"/>
  <van-cell title="账号" :value="user.userAccount"/>
  <van-cell title="头像" is-link @click="edit('avatarUrl','头像',user.avatarUrl)">
    <img alt="" style="height: 48px" :src="user.avatarUrl"/>
  </van-cell>
  <van-cell title="性别" is-link @click="edit('gender','性别',user.gender)" :value="user.gender"/>
  <van-cell title="电话" is-link @click="edit('phone','电话',user.phone)" :value="user.phone"/>
  <van-cell title="邮箱" is-link @click="edit('email','邮箱',user.email)" :value="user.email"/>
  <van-cell title="星球编号" :value="user.planetCode"/>
  <van-cell title="注册时间" :value="user.createTime"/>
</template>

<style scoped>

</style>