<script setup>
import {menuData} from "@/data/menuData.js";
const emit = defineEmits(['menuSelect'])
function menuSelect(params){
  emit('menuSelect',params)
}
</script>

<template>
  <div class="list-content">
    <div class="level-0" v-for="root in menuData.hasChildrenMenu">
      <p class="level-0-p">{{root.title}}</p>
      <div class="sub-list">
        <div class="level-1" v-for="leaf in root.children" @click="menuSelect(leaf)">
          <img :src="leaf.image" alt="" class="item-img">
          <p class="item-p">{{leaf.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/global.scss";
.list-content{
  padding:2rem;
  .level-0{
    .level-0-p{ // 外层列表title
      display: block;
      background: $main-blue;
      color:$main-white;
      font-weight: bold;
      font-size:1.25rem;
      line-height: 2rem;
      width:fit-content;
      padding:0.16rem 2rem 0.16rem 0rem;
      margin-bottom:2rem;
      box-shadow:inset 0.5rem 0px 0px  rgb(from $main-green r g b / 50%);
      border-top-right-radius: 10% 50%;
      border-bottom-right-radius: 10% 50%;
      &:before{
        content:'11';
        color:transparent;
        width:0.75rem;
        height:0.75rem;
        background:rgb(from $main-orange r g b / 80%);
        clip-path:polygon(0% 0%,100% 50%, 0% 100%);
        margin-right:0.25rem;
      }
    }
    .sub-list{ // 子列表
      display: flex;
      flex-flow:wrap;
      justify-content: flex-start;
    }
  }
  .level-1{
    width:25rem;
    cursor:pointer;
    margin-bottom:2rem;
    margin-top:0rem !important;
    transition-property: transform;
    transition-duration: 0.2s;
    &:nth-child(2n){margin:auto}
    &:nth-child(2n+1){margin-left:2rem}
    .item-img{
      position:relative;
      width:100%;
      background: #fff;
      border:2px solid #2a9d8f;
      transform-origin: center;
      transition-property: transform, box-shadow;
      transition-duration: 0.2s;
      $diff:0rem;
      $diff_r:-0rem;
      box-shadow:$diff_r $diff 0px $diff rgb(from $main-red r g b / 50%),
                  $diff $diff_r 0px $diff rgb(from $main-green r g b / 50%);
    }
    .item-p{
      position:relative;
      background: #2a9d8f;
      color:$main-white;
      font-size:0.75rem;
      font-weight: bold;
      height:1.5rem;
      display: flex;
      align-items: center;
      box-shadow:inset 0.3rem 0px 0px  rgb(from $main-blue r g b / 50%);
      transition-property: box-shadow, transform;
      transition-duration: 0.2s;
      &:before{
        content:'';
        width:0.75rem;
        height:0.75rem;
        background:rgb(from $main-yellow r g b / 80%);
        clip-path:polygon(0% 0%,100% 50%, 0% 100%);
        margin-right:0.25rem;
      }
    }
    &:hover{
      transform:translateY(-1px);
      .item-img{
        transform:scale(1.1);
        $diff:0.2rem;
        $diff_r:-0.2rem;
        box-shadow:$diff_r $diff 0px $diff rgb(from $main-red r g b / 50%),
        $diff $diff_r 0px $diff rgb(from $main-green r g b / 50%);
      }
      .item-p{
        transform:translateY(1rem);
        box-shadow:inset 30rem 0px 0px  rgb(from $main-blue r g b / 50%);
      }
    }
  }
}
</style>
