<script setup lang="ts">
import {ref} from "vue";
import {addTeamAPI} from "../apis/team.ts";
import {useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
//创建队伍初始数据
const initData = {
  "name": '',
  "description": '',
  "maxNum": 0,
  "expireTime": '',
  "status": 0,
  "password": ''
};
//队伍数据
const teamData = ref({...initData});
//控制时间选择器显示
const showPicker = ref(false);
//过期时间显示
const expireTime = ref([])

//创建队伍
const addTeam = async () => {
  const res = await addTeamAPI(teamData.value);
  if (res.code === 0) {
    showSuccessToast('创建成功');
    await router.replace('/team');
  } else {
    showFailToast(res.msg + res.description);
  }
}

//选择时间
const onConfirm = () => {
  let dateStr = "";
  expireTime.value.forEach((value, index, array) => {
    dateStr += value;
    if (index !== array.length - 1) {
      dateStr += '-';
    }
  })
  dateStr += "T00:00:00";
  teamData.value.expireTime = dateStr;
  showPicker.value = false;
}
</script>

<template>
  <van-form @submit="addTeam">
    <van-cell-group inset>
      <van-field
          v-model="teamData.name"
          name="name"
          label="队伍名称"
          placeholder="请输入队伍名称"
          :rules="[{ required: true, message: '请填写队伍名称' }]"
      />
      <van-field
          v-model="teamData.description"
          name="description"
          label="队伍描述"
          placeholder="请输入队伍描述"
          rows="1"
          autosize
          type="textarea"
      />
      <van-field
          name="maxNum"
          label="最大人数">
        <template #input>
          <van-stepper v-model="teamData.maxNum"/>
        </template>
      </van-field>
      <van-field
          v-model="teamData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          placeholder="点击选择过期时间"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker v-model="expireTime" @confirm="onConfirm" @cancel="showPicker = false"/>
      </van-popup>
      <van-field name="status" label="队伍状态">
        <template #input>
          <van-radio-group v-model="teamData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-if="Number(teamData.status)===2"
                 v-model="teamData.password"
                 name="password"
                 label="队伍密码"
                 placeholder="请输入队伍密码"
                 type="password"
                 :rules="[{ required: true, message: '请填写队伍密码' }]"
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