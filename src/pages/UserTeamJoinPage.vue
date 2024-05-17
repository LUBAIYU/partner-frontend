<script setup lang="ts">
import TeamCardList from "../components/TeamCardList.vue";
import {listMyJoinTeamsAPI} from "../apis/team.ts";
import {onMounted, ref} from "vue";
import {showFailToast} from "vant";

const teamList = ref([])
const searchText = ref('');

//查询我加入的队伍
const listMyJoinTeams = async () => {
  const res = await listMyJoinTeamsAPI();
  if (res.code === 0 && res.data) {
    teamList.value = res.data
  } else {
    showFailToast(res.msg)
  }
}

const searchTeams = async () => {
  const res = await listMyJoinTeamsAPI({
    searchText: searchText.value,
    page: 1
  })
  if (res.code === 0 && res.data) {
    teamList.value = res.data
  } else {
    showFailToast(res.msg)
  }
}

onMounted(() => listMyJoinTeams())
</script>

<template>
  <van-search v-model="searchText" placeholder="请输入搜索关键词" @search="searchTeams"/>
  <TeamCardList :team-list="teamList"/>
  <van-empty v-if="teamList?.length<1" description="暂无数据"></van-empty>
</template>

<style scoped>

</style>