<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {searchUserByTagsAPI} from '../apis/user.ts'
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;
const userList = ref([]);

//根据标签查询用户
const searchUserByTags = async () => {
  const res = await searchUserByTagsAPI(tags);
  userList.value = res.data;
}

onMounted(() => searchUserByTags())
</script>

<template>
  <UserCardList :user-list="userList"/>
  <van-empty description="暂无数据" v-if="!userList||userList.length<1"/>
</template>
<style scoped>

</style>