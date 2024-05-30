<script setup>
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import NavHeader from '@/views/Home/NavHeader/index.vue'
import {menuData, menuMap} from "@/data/menuData.js";
import {getCurrentInstance,ref,watch,onBeforeMount,onMounted} from "vue";
import http from "@/api/http";

const {proxy} = getCurrentInstance()

const markdownHTML = ref('') // markdown内容
let markdownRender = undefined
let defaultActiveIndex = ref('1') // 默认菜单
const layout_type = ref('custom')
// 创建markdown渲染器
function createMarkdownRenderer(){
  markdownRender = new MarkdownIt({
    html:true,
    linkify: true,
    typegrapher: true,
    highlight: (str,lang)=>{
      if (lang && hljs.getLanguage(lang)) {
        try {
          let preCode = hljs.highlight(lang, str, true).value;
          return preCode;
        } catch (e) {console.log(e)}
      }
    }
  })
}
onBeforeMount(()=>{
  createMarkdownRenderer()
  let currentMenu = menuMap[location.hash.replace('#','')]
  menuSelect(currentMenu)
})
function getMarkdown(params){
  http.getMarkdown(params).then(res => {
    markdownHTML.value = markdownRender.render(res.data);
  });
}
function menuSelect(params){
  let {path,type} = params
  type == 'chart' && getMarkdown(path)
  layout_type.value = type
  proxy.$router.replace(path)
  defaultActiveIndex.value = params.index
}

</script>

<template>
  <div class="content-wrapper">
    <nav-header/>
    <div class="main-body">
      <div class="left-menu">
<!--        主菜单-->
        <el-menu ref="MainMenuRef" mode="vertical" class="main-menu" :default-active="defaultActiveIndex">
          <el-menu-item v-for="menuItem in menuData.noChildrenMenu" :index="menuItem.index" @click="menuSelect(menuItem)">
            <template #title>
              <span>{{menuItem.title}}</span>
            </template>
          </el-menu-item>
          <el-sub-menu v-for="subMenu in menuData.hasChildrenMenu" :index="subMenu.index">
            <template #title>
              <span>{{subMenu.title}}</span>
            </template>
            <el-menu-item v-for="subMenuItem in subMenu.children" :index="subMenuItem.index" @click="menuSelect(subMenuItem)">
              <template #title>
                <span>{{subMenuItem.title}}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="right-content">
        <div class="main-chart" v-if="layout_type == 'chart'">
          <div class="chart">
            <router-view keep-alive/>
          </div>
          <div class="mark-down-content" v-html="markdownHTML">
          </div>
        </div>
        <router-view keep-alive v-if="layout_type == 'custom'"  @menu-select="menuSelect" />

<!--        尾部工具栏-->
        <div class="foot-tool-bar" >
          <p>关闭markdown</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';
.content-wrapper{
  .main-body{
    background: #ffffff;
    display: flex;
    height:calc(100vh - $nav-head-height);
    box-shadow:inset 0px 2px 5px rgba(0, 0, 0, 0.4);
    .left-menu{
      overflow: hidden;
      width:$left-menu-width;
      background: $main-light-yellow;
    }
    .right-content{
      flex:1;
      overflow-y: scroll;
      &::-webkit-scrollbar{
        width:0;
      }
    }
  }
}
.right-content{
  position:relative;
  background:$main-white;
  .main-chart{
    width:100%;
    padding-top:2rem;
    .chart{
      width:70%;
      height:60vh;
      background: #ffffff;
      border:0.3rem dashed $main-yellow;
      margin:auto;
    }
    .mark-down-content{
      background: #ffffff;
      margin:auto;
      margin-top:2rem;
      margin-bottom:3rem;
      width:90%;
      //height:60vh;
      border:0.3rem dashed $main-green;
      padding:1rem;
      ::v-deep(pre){
        margin-top:1rem;
        padding:0.5rem;
        border:1px solid #264552;
        font-family: robot;
        font-size:0.8rem;
        line-height:1.3rem;
        background:#efefed;
      }
    }
  }
  .foot-tool-bar{
    position:fixed;
    left:$left-menu-width;
    right:0;
    bottom:0;
    display: flex;
    align-items: center;
    height:$foot-tool-height;
    background:$main-blue;
    color:$main-yellow;
    font-size:0.8rem;
    justify-content: flex-end;
    padding-right:1rem;
    p{
      cursor: pointer;
    }
  }
}
</style>
