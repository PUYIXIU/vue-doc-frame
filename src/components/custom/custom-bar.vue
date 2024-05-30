<script setup>
import * as echarts from 'echarts'
import {onBeforeUnmount, onMounted} from "vue";

const domId = 'custom-bar-id' // dom-id
let chart // 表格实例
let option = {
  title:{
    text:'custom Bar',
    left:'center'
  },
  xAxis:{
    scale:true,
  },
  yAxis:{},
  series:[]

} // 配置

// 初始化图表
function initChart(){
  let dom = document.getElementById(domId)
  dom && (chart = echarts.init(dom))
  setOption()
  chart && (chart.setOption(option))
  window.addEventListener('resize', resize)
}

function setOption(){
  const colorList = [
    '#264653',
    '#2a9d8f',
    '#e9c46a',
    '#f1deb0',
    '#f4a261',
    '#e76f51'
  ];
  const data = [
    [10, 16, 3, 'A'],
    [16, 18, 15, 'B'],
    [18, 26, 12, 'C'],
    [26, 32, 22, 'D'],
    [32, 56, 7, 'E'],
    [56, 62, 17, 'F']
  ].map((item,index)=>({
    value:item,
    itemStyle:{
      color:colorList[index]
    }
  }));
  option.series[0] = {
    type:'custom',
    renderItem: function(params, api){
      //[10, 16, 3, 'A']
      //[x开始值，x结束值，y轴高度，名称]
      let yValue = api.value(2) // y轴高度
      let start = api.coord([api.value(0), yValue]) // 左上角坐标
      let size = api.size([api.value(1) - api.value(0), yValue]) // 柱子尺寸
      let style = api.style()
      return {
        type:'rect',
        shape:{
          x:start[0],
          y:start[1],
          width:size[0],
          height:size[1],
        },
        style:style
      }
    },
    label:{
      show:true,
      position:'top'
    },
    dimensions:['from','to','profit'],
    encode:{
      x:[0,1],
      y:2,
      tooltip:[0,1,2],
      itemName:3
    },
    data:data
  }
}

// 自适应大小
function resize(){
  chart && (chart.resize())
}

// 销毁
function destroy(){
  chart && (chart.dispose())
  chart = null
  window.removeEventListener('resize',resize)
}

onMounted(()=>{
  initChart()
})

onBeforeUnmount(()=>{
  destroy()
})

</script>

<template>
  <div class="full chart-wrapper">
    <div class="chart-canvas" :id="domId"></div>
  </div>
</template>

<style scoped lang="scss">
.chart-wrapper{
  padding:0.5rem;
}
.chart-canvas{
  width:100%;
  height:100%;
}
</style>
