<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {matchUsersAPI, recommendUserAPI} from '../apis/user.ts'
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const userList = ref([]);

const isMatchMode = ref<boolean>(false);

//推荐用户
const recommendUsers = async () => {
  const res = await recommendUserAPI({
    page: 1,
    pageSize: 5
  });
  if (res.code === 0) {
    userList.value = res.data;
  } else {
    showFailToast(res.msg);
  }
}

//根据标签匹配用户
const matchUsers = async () => {
  const num = 10;
  const res = await matchUsersAPI(num);
  if (res.code === 0) {
    userList.value = res.data;
  } else {
    showFailToast(res.msg);
  }
}

//监听心动模式状态
watchEffect(() => {
  if (isMatchMode.value) {
    matchUsers();
  } else {
    recommendUsers();
  }
})
</script>

<template>
  <van-cell title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24"/>
    </template>
  </van-cell>
  <UserCardList :user-list="userList"/>
  <van-empty description="暂无数据" v-if="!userList||userList.length<1"/>
</template>
<style scoped>

</style>