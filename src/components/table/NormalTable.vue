<script setup>
import { getMoreListData } from '@/utils/getData'

// 表格数据
const data = {
  columns: [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
  ],
  dataSource: getMoreListData(10),
}
</script>

<template>
  <div>
    <!-- 普通表格：数据量大如何处理？1.加分页，滚动加载 2.虚拟表格 https://github.com/Akryum/vue-virtual-scroller 3.canvas table,画布性能好-->
    <!-- 轻松创建虚拟列表  useVirtualList -->
    <table>
      <thead>
        <tr>
          <th v-for="column in data.columns" :key="column.key">{{ column.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.dataSource" :key="row.key">
          <td v-for="column in data.columns" :key="column.key">{{ row[column.dataIndex] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
table {
  width: 800px;
  height: 600px;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>