<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {updateUserAPI, getCurrentUserAPI} from "../apis/user";
import {getCurrentUser, setCurrentUser} from "../states/user.ts";
import {showFailToast, showSuccessToast} from "vant";

const route = useRoute();
const router = useRouter();
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

//获取当前登录用户信息
const getLoginUser = async () => {
  const res = await getCurrentUserAPI();
  if (res.code === 0) {
    setCurrentUser(res.data);
  } else {
    showFailToast(res.msg);
  }
}

const onSubmit = async () => {
  const currentUser = getCurrentUser();
  const res = await updateUserAPI({
    'id': currentUser.id,
    [editUser.value.editKey]: editUser.value.currentValue
  })
  if (res.code === 0) {
    showSuccessToast('修改成功');
    await getLoginUser();
    router.back();
  } else {
    showFailToast(res.msg);
  }
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
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