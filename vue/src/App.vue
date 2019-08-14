<template>
  <div id="app">
    <div class="home-bar">
      <div class="icons">
        <router-link to="/">
          <Icon type="md-add" />
        </router-link>
        <router-link to="/list" v-show="swaggerConfig.length>0">
          <Icon type="ios-apps" />
        </router-link>
        <router-link to="/swaggerconfig">
          <Icon type="md-settings" />
        </router-link>
      </div>
    </div>
    <div class="layout-content">
      <router-view class="routerview" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  methods: {
    goto (path) {
      this.$router.push(path)
    }
  },
  computed: {
    ...mapState({
      swaggerConfig: state => state.app.swaggerConfig
    })
  }
}
</script>
<style lang="less" scoped>
#app {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  .home-bar {
    width: 60px;
    background-color: black;
    text-align: center;
    padding-top: 20px;
    position: relative;
    .icons {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      text-align: center;
      a {
        display: block;
        font-size: 25px;
        color: #eeeeee;
        margin-bottom: 40px;
        &:last-of-type {
          margin-bottom: 0;
        }
        cursor: pointer;
        &:hover {
          color: gray;
        }
        &.router-link-exact-active{
          color: dodgerblue;
        }
      }
    }
  }
  .layout-content {
    flex: 1 auto;
    height: 100%;
    overflow: hidden;
    padding: 20px;
    .routerview {
      height: 100%;
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 14px 30px 0px #ccc;
    }
  }
}
</style>
