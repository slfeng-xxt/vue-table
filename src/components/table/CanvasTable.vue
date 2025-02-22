<script setup>
import { ref, watch, onMounted, onUnmounted, reactive } from 'vue'
import { getMoreListData } from '@/utils/getData'

const ds = getMoreListData(10000)
const data = reactive({
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
  dataSource: ds,
})

const getPixelRatio = () => {
  return window.devicePixelRatio || 1
}

const canvas = ref(null)
const w = ref(800)
const h = ref(600)
const theme = 'yellow' // 'yellow' | 'white'

const pixelRatio = getPixelRatio()
const cellWidth = 200
const cellHeight = 100
const padding = 10 * pixelRatio

const seletctedCell = ref({ row: null, column: null })

const visibleRows = Math.ceil((h.value * pixelRatio) / cellHeight) - 1
let rowStart = 0

const draw = () => {
  const { columns, dataSource } = data

  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, w.value * pixelRatio, h.value * pixelRatio)
  ctx.beginPath()

  // 表头
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    ctx.fillStyle = theme
    ctx.font = `bold ${24 * pixelRatio}px Arial`
    ctx.fillText(
      column.title,
      i * cellWidth * pixelRatio + padding,
      (cellHeight * pixelRatio) / 2 - padding
    )
  }

  // 表格内容
  for (let i = rowStart; i < rowStart + visibleRows; i++) {
    const row = dataSource[i]
    for (let j = 0; j < columns.length; j++) {
      ctx.fillStyle = theme
      // 选中单元格
      if (seletctedCell.value.row === i && seletctedCell.value.column === j) {
        ctx.fillRect(
          j * cellWidth * pixelRatio,
          (i - rowStart + 1) * cellHeight + padding,
          cellWidth * pixelRatio,
          cellHeight
        )
        ctx.fillStyle = '#000'
      }

      const column = columns[j]
      ctx.font = `${20 * pixelRatio}px Arial`
      ctx.fillText(
        row[column.dataIndex],
        j * cellWidth * pixelRatio + padding,
        ((i - rowStart + 2) * cellHeight * pixelRatio - padding) / 2
      )
    }
  }

  ctx.closePath()
}

// 选中单元格
const handleClick = (ev) => {
  const { left, top } = canvas.value.getBoundingClientRect()
  const x = ev.clientX - left
  const y = ev.clientY - top

  const rowIndex = Math.floor((y * pixelRatio) / cellHeight) - 1 + rowStart
  const colIndex = Math.floor(x / cellWidth)
  // console.log('%c 🥫 rowIndex: ', 'font-size:20px;background-color: #B03734;color:#fff;', rowIndex)
  // console.log('%c 🍦 colIndex: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', colIndex)

  if (rowIndex >= 0 && rowIndex < data.dataSource.length) {
    seletctedCell.value.row = rowIndex
    seletctedCell.value.column = colIndex

    draw()
  }
}

// 单元格滚动
const handleWheel = (ev) => {
  const { deltaY } = ev
  // 边界判断
  if (rowStart <= 0 && deltaY < 0) return
  if (rowStart >= data.dataSource.length - visibleRows && deltaY > 0) return
  if (ev.deltaY > 0) {
    rowStart++
  } else {
    rowStart--
  }
  draw()
}

// 搜索
const handleSearch = (ev) => {
  const { value } = ev.target
  if (value) {
    data.dataSource = data.dataSource.filter((item) => item.name.includes(value))
  } else {
    data.dataSource = ds
  }
  rowStart = 0
  draw()
}

watch(
  () => data.dataSource,
  () => {
    draw()
  }
)

onMounted(() => {
  draw()
  canvas.value.addEventListener('click', handleClick)
  document.addEventListener('wheel', handleWheel)
})

onUnmounted(() => {
  canvas.value?.removeEventListener('click', handleClick)
  canvas.value?.removeEventListener('wheel', handleWheel)
})
</script>

<template>
  <div>
    <input @input="handleSearch" />
    <canvas ref="canvas" :width="w * getPixelRatio()" :height="h * getPixelRatio()"></canvas>
  </div>
</template>

<style>
canvas {
  border: 1px solid #ccc;
  width: 800px;
  height: 600px;
}
</style>