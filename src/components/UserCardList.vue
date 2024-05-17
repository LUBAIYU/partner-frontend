<script setup lang="ts">
import {UserType} from "../models/user"

interface UserCardList {
  userList: UserType[]
}

const props = withDefaults(defineProps<UserCardList>(), {
  userList: () => []
})
</script>

<template>
  <van-card v-for="user in props.userList"
            :desc="user.profile"
            :title="`${user.username} (${user.planetCode})`"
            :thumb="user.avatarUrl">
    <template #tags>
      <van-tag v-for="tag in JSON.parse(user.tags)" plain type="primary" style="margin: 8px 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>