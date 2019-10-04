<template>
  <div class="tab-panel">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
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
