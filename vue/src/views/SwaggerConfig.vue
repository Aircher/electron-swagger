<template>
  <div>
    <Table height="200" :columns="columns" :data="this.swaggerConfig"></Table>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  data () {
    return {
      columns: [ {
        title: '名称',
        key: 'name'
      },
      {
        title: '地址',
        key: 'swaggerWebsite',
        render: (h, { row: { swaggerWebsite } }) => {
          return h('a', {
            domProps: {
              href: swaggerWebsite,
              target: '_blank'
            }
          }, swaggerWebsite)
        }
      },
      {
        title: 'apidocs json',
        key: 'apiUrl',
        render: (h, { row: { apiUrl } }) => {
          return h('a', {
            domProps: {
              href: apiUrl,
              target: '_blank'
            }
          }, apiUrl)
        }
      },
      {
        title: '操作',
        width: 150,
        align: 'center',
        render: (h, params) => {
          return h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                this.deleteSwaggerConfig(params.index)
              }
            }
          }, '删除')
        }
      }]
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      swaggerConfig: state => state.app.swaggerConfig
    })
  },
  methods: {
    ...mapMutations('app', ['deleteSwaggerConfig'])
  }
}
</script>

<style lang="" scoped>

</style>
