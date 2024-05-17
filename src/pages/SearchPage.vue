<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter()
const searchText = ref('');

const activeIds = ref([]);
const activeIndex = ref(0);
const originalTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '小学', id: '小学'},
      {text: '初中', id: '初中'},
      {text: '高中', id: '高中'},
      {text: '大学', id: '大学'},
    ],
  },
];

let tagList = ref(originalTagList);

//关闭标签
const closeTag = (tag) => {
  //过滤掉点击关闭的标签后重新赋值
  activeIds.value = activeIds.value.filter(item => item !== tag)
}

const onSearch = (val) => {
  tagList.value = originalTagList.map(parentTag => {
    const tempParentTag = {...parentTag};
    const tempChildrenTag = [...parentTag.children];
    tempParentTag.children = tempChildrenTag.filter(item => item.text.includes(val))
    return tempParentTag;
  })
}
const onCancel = () => {
  searchText.value = "";
  tagList.value = originalTagList;
}

//搜索结果
const doSearch = () => {
  router.push({
    path: '/user/search/result',
    query: {
      tags: activeIds.value
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请输入标签</div>
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <van-tag @close="closeTag(tag)" closeable type="primary">{{ tag }}</van-tag>
    </van-col>
  </van-row>
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 12px">
    <van-button @click="doSearch" block type="primary">搜索</van-button>
  </div>
</template>

<style scoped>

</style>