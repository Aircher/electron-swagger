<template>
  <div class="tabs">
    <div class="tabs-list">
      <div
        class="tab-item"
        :class="{
        'active': activeIndex === index
      }"
        @click="onClick(index)"
        v-for="(tab,index) in tabs"
        :key="index"
      >{{tab}}</div>
    </div>
    <div class="tab-panels" ref="panels">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      tabs: [],
      activeIndex: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.tabs = this.$children.map(item => {
        return item.label
      })
    })
  },
  methods: {
    onClick (index) {
      if (index !== this.activeIndex) {
        this.activeIndex = index
        this.$emit('on-change', index)
      }
      this.$emit('on-click', index)
    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  height: 100%;
  .tabs-list {
    overflow-y: auto;
    height: 100%;
    .tab-item {
      line-height: 50px;
      color: black;
      border: 1px solid #eeee;
      border-bottom: none;
      padding: 0 20px;
      cursor: pointer;
      font-size: 12px;
      &:last-of-type {
        border-bottom: 1px solid #eeee;
      }
      &:hover {
        color: dodgerblue;
      }
      &.active {
        background-color: dodgerblue;
        color: white;
      }
    }
  }
}
</style>
