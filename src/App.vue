<script setup>
import NormalTableVue from './components/table/NormalTable.vue'
import CanvasTableVue from './components/table/CanvasTable.vue'
import { ref, computed } from 'vue'

const TYPE_ENUM = {
  NORMAL: 'normal',
  CANVAS: 'canvas',
  VIRTUAL: 'virtual',
}
const btns = [
  {
    id: 1,
    name: 'Normal',
    type: TYPE_ENUM.NORMAL,
  },
  {
    id: 2,
    name: 'Canvas',
    type: TYPE_ENUM.CANVAS,
  },
]
const tableType = ref(TYPE_ENUM.CANVAS)
const tableComp = computed(() => {
  switch (tableType.value) {
    case TYPE_ENUM.NORMAL:
      return NormalTableVue
    case TYPE_ENUM.CANVAS:
      return CanvasTableVue
    default:
      return null
  }
})
</script>

<template>
  <div>
    <template v-for="btn in btns" :key="btn.id">
      <button :class="{ active: tableType === btn.type }" @click="tableType = btn.type">
        {{ btn.name }}
      </button>
    </template>
    <component :is="tableComp" />
  </div>
</template>

<style scoped>
button {
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #0056b3;
  color: white;
  cursor: pointer;
}
button.active {
  background-color: #003087;
  color: yellow;
}
</style>
