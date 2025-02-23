<script setup>
import { onMounted, ref } from 'vue'
import { getMoreListData } from '@/utils/getData'

const list = ref([])

onMounted(() => {
  list.value = getMoreListData(1000)
})
</script>


<template>
  <div class="scroller-box">
    <!-- 表头 -->
    <ul class="header-title user">
      <li>序号</li>
      <li>姓名</li>
      <li>年龄</li>
      <li>地址</li>
    </ul>
    <RecycleScroller
      class="scroller"
      :items="list"
      :item-size="32"
      key-field="id"
      v-slot="{ item }"
    >
      <ul class="user">
        <li>{{ item.key }}</li>
        <li>{{ item.name }}</li>
        <li>{{ item.age }}</li>
        <li>{{ item.address }}</li>
      </ul>
    </RecycleScroller>
  </div>
</template>

<style scoped>
.scroller-box {
  height: 600px;
  width: 800px;
  border: 1px solid #ccc;
}

.scroller {
  width: 800px;
  height: calc(100% - 32px);
}

.user {
  list-style: none;
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.header-title li {
  font-weight: bold;
}
.user li {
  width: 200px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-right: 1px solid #ccc;
}
.user li:last-child {
  border-right: none;
}
</style>

