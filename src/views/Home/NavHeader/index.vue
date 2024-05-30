<script setup>

</script>

<template>
  <div class="header-wrapper">
    <p class="header-title">
      <span>E-DUCK:</span>
      <span>ECharts Demos</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/global.scss';
.header-wrapper{
  height:$nav-head-height;
  background: $main-blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left:1rem;
  box-shadow:inset 0px 2px 10px rgba(61, 238, 205, 0.12);
}
.header-title{
  color:$main-yellow;
  span{
    font-size:1rem;
    &:last-child{
      font-weight: bold;
      margin-left:0.5rem;
      text-decoration: underline;
    }
  }
}
</style>
