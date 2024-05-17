<script setup lang="ts">
import TeamCardList from "../components/TeamCardList.vue";
import {useRouter} from 'vue-router';
import {listTeamsAPI} from "../apis/team.ts";
import {onMounted, ref} from "vue";
import {showFailToast} from "vant";

const router = useRouter();
const teamList = ref([])
const searchText = ref('');

const active = ref('public');

//查询队伍列表
const listTeams = async (status?: number) => {
  const res = await listTeamsAPI({
    status: status
  });
  if (res.code === 0 && res.data) {
    teamList.value = res.data
  } else {
    showFailToast(res.msg)
  }
}

//创建队伍
const addTeam = () => {
  router.push({
    path: '/team/add',
    replace: true
  })
}

const searchTeams = async () => {
  const res = await listTeamsAPI({
    searchText: searchText.value,
    page: 1,
  })
  if (res.code === 0 && res.data) {
    teamList.value = res.data
  } else {
    showFailToast(res.msg)
  }
}

//更改标签时调用
const onTagChange = (name: string) => {
  if (name === 'public') {
    listTeams(0);
  } else {
    listTeams(2);
  }
}

onMounted(() => listTeams())
</script>

<template>
  <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="searchTeams"/>
  <van-tabs v-model:active="active" @change="onTagChange">
    <van-tab title="公开" name="public"></van-tab>
    <van-tab title="加密" name="secret"></van-tab>
  </van-tabs>
  <TeamCardList :team-list="teamList"/>
  <van-button class="add-button" icon="plus" type="primary" @click="addTeam"></van-button>
  <van-empty v-if="teamList?.length<1" description="暂无数据"></van-empty>
</template>

<style scoped>

</style>