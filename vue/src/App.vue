<template>
  <div id="app">
    <div class="home-bar">
      <i class="iconfont iconhome" @click="goto('/')"></i>
      <i class="iconfont iconlist" @click="goto('/list')"></i>
      <i class="iconfont iconshezhi1" @click="goto('/swaggerconfig')"></i>
    </div>
    <div class="layout-content">
      <router-view class="routerview"/>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goto (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less" scoped>
#app{
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  .home-bar{
    width: 60px;
    background-color: black;
    text-align: center;
    padding-top: 20px;
    position: relative;
    .iconfont{
      display: block;
      font-size: 20px;
      color: #eeeeee;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover{
        color: gray;
      }
      &:active{
        color: dodgerblue;
      }
      &.iconshezhi1{
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .layout-content{
    flex: 1 auto;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    .routerview{
      height: 100%;
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 14px 30px 0px #ccc;
    }
  }
}
</style>
