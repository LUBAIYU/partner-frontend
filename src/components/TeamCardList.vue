<script setup lang="ts">
import {TeamType} from "../models/team"
import {teamStatusEnum} from "../constants/team";
import teamLogo from '../assets/team.png';
import {joinTeamAPI, quitTeamAPI, delTeamAPI} from "../apis/team.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../states/user.ts";
import {getCurrentUserAPI} from "../apis/user.ts";
import {useRouter} from 'vue-router';

const router = useRouter();

interface TeamCardList {
  teamList: TeamType[]
}

const props = withDefaults(defineProps<TeamCardList>(), {
  teamList: []
})

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id
  if (team.status === 0) {
    joinTeam();
  } else {
    showPasswordDialog.value = true;
  }
}

const joinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

//加入队伍
const joinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await joinTeamAPI({
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res.code === 0) {
    showSuccessToast("加入成功");
  } else {
    showFailToast(res.description ?? res.msg)
  }
  joinCancel();
}

//登录用户信息
const loginUser = ref({});

//获取登录用户信息
const getLoginUser = async () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    loginUser.value = currentUser;
  } else {
    const res = await getCurrentUserAPI();
    if (res.code === 0) {
      loginUser.value = res.data;
    } else {
      showFailToast(res.msg);
    }
  }
}

//更新队伍
const updateTeam = (teamId: number) => {
  router.push({
    path: '/team/update',
    query: {
      teamId
    }
  })
}

//退出队伍
const quitTeam = async (teamId: number) => {
  const res = await quitTeamAPI(teamId);
  if (res.code === 0) {
    showSuccessToast("退出成功");
  } else {
    showFailToast(res.msg)
  }
}

//解散队伍
const delTeam = async (id: number) => {
  const res = await delTeamAPI(id);
  if (res.code === 0) {
    showSuccessToast("解散成功");
  } else {
    showFailToast(res.msg)
  }
}
onMounted(() => getLoginUser());
</script>

<template>
  <van-card v-for="team in props.teamList"
            :desc="team.description"
            :title="team.name"
            :thumb="teamLogo">
    <template #tags>
      <van-tag plain type="primary" style="margin: 8px 8px">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #bottom>
      <div>
        {{ `队伍人数：${team.hasJoinNum}/${team.maxNum}` }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间：' + team.expireTime }}
      </div>
      <div>
        {{ '创建时间：' + team.createTime }}
      </div>
    </template>
    <template #footer>
      <van-button v-if="team.userId !== loginUser?.id && !team.hasJoin" @click="preJoinTeam(team)" size="mini"
                  type="primary" plain>加入队伍
      </van-button>
      <van-button v-if="team.userId === loginUser?.id" @click="updateTeam(team.id)" size="mini" plain>更新队伍
      </van-button>
      <van-button v-if="team.userId !== loginUser?.id && team.hasJoin" @click="quitTeam(team.id)" size="mini" plain>
        退出队伍
      </van-button>
      <van-button type="danger" v-if="team.userId === loginUser?.id" @click="delTeam(team.id)" size="mini" plain>解散队伍
      </van-button>
      <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="joinTeam"
                  @cancel="joinCancel">
        <van-field
            v-model="password"
            name="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-dialog>
    </template>
  </van-card>
</template>

<style scoped>

</style>