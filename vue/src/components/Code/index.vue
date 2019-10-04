<template>
  <div v-if="item.swaggerApiGroupList" class="swagger-container">
    <div class="swagger-website">
      <strong>swagger地址:</strong>
      <a :href="item.swaggerWebsite" target="_blank">{{item.swaggerWebsite}}</a>
    </div>
    <Collapse simple v-for="(property,index) in Object.keys(item.swaggerApiGroupList)" :key="index">
      <Panel :name="property">
        {{property}}
        <Icon
          type="md-copy"
          @click.stop="mutipleCopyRequestCode(item.swaggerApiGroupList[property])"
        />
        <div slot="content">
          <Collapse simple v-for="(item,index) in item.swaggerApiGroupList[property]" :key="index">
            <Panel :name="item.url">
              {{item.url}} {{item.summary}}
              <Icon type="md-copy" @click.stop="copyRequestCode(item)" />
              <div slot="content">
                <pre v-html="item.requestCode" class="code-content"></pre>
              </div>
            </Panel>
          </Collapse>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import { copy } from '@/utils'
export default {
  name: '',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {
    // 获取分组下的代码
    mutipleCopyRequestCode (group) {
      if (group.length > 0) {
        let codes = group.map(item => item.requestCode).join('\n')
        copy(codes)
        this.$Message.success('拷贝成功')
      }
    },
    // 单个拷贝
    copyRequestCode (item) {
      copy(item.requestCode)
      this.$Message.success('复制成功')
    }
  }
}
</script>

<style lang="" scoped>
</style>
