<template>
  <div class="tab-panel" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      show: false
    }
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
