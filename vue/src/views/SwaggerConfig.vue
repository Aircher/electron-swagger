<template>
  <div class="swagger-config-page">
    <div class="btns">
      <Button @click="toggleAddModal">添加Swagger配置</Button>
      <Button class="primary" @click="configModalVisible=true">编辑配置</Button>
    </div>
    <Table height="200" :columns="columns" :data="this.swaggerConfig"></Table>
    <Modal @on-ok="onUpdateSwaggerConfig" v-model="configModalVisible" title="swagger配置">
      <div class="tip">swagger配置必须是有效的数组json字符串,包含apiUrl,swaggerWebsite,name三个字段且不能为空</div>
      <Input v-model="swaggerJson" :autosize="{ maxRows:10 }" type="textarea" placeholder />
    </Modal>
    <Modal v-model="showAddModal" title="添加swagger配置" @on-ok="onSave">
      <Form ref="addForm" autocomplete="off" :model="addForm" :label-width="120">
        <FormItem label="swagger地址" prop="swaggerWebsite">
          <Input type="text" v-model="addForm.swaggerWebsite" />
        </FormItem>
        <FormItem label="api地址" prop="apiUrl">
          <Input type="text" v-model="addForm.apiUrl" />
        </FormItem>
        <FormItem label="名称" prop="name">
          <Input type="text" v-model="addForm.name" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: '',
  data () {
    return {
      showAddModal: false,
      addForm: {},
      columns: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '地址',
          key: 'swaggerWebsite',
          render: (h, { row: { swaggerWebsite } }) => {
            return h(
              'a',
              {
                domProps: {
                  href: swaggerWebsite,
                  target: '_blank'
                }
              },
              swaggerWebsite
            )
          }
        },
        {
          title: 'apidocs json',
          key: 'apiUrl',
          render: (h, { row: { apiUrl } }) => {
            return h(
              'a',
              {
                domProps: {
                  href: apiUrl,
                  target: '_blank'
                }
              },
              apiUrl
            )
          }
        },
        {
          title: '操作',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteSwaggerConfig(params.index)
                  }
                }
              },
              '删除'
            )
          }
        }
      ],
      swaggerJson: '',
      configModalVisible: false
    }
  },
  created () {},
  computed: {
    ...mapState({
      swaggerConfig: state => state.app.swaggerConfig
    })
  },
  methods: {
    ...mapMutations('app', ['deleteSwaggerConfig', 'updateSwaggerConfig']),
    onUpdateSwaggerConfig () {
      if (this.swaggerJson) {
        try {
          var config = JSON.parse(this.swaggerJson)
          if (!Array.isArray(config)) {
            this.$message.error('配置不是有效的数组Json字符串')
            return
          }
          let isConfigOk = true
          config.forEach(conf => {
            if (!(conf.swaggerWebsite && conf.apiUrl && conf.name)) {
              isConfigOk = false
            }
          })
          if (!isConfigOk) {
            this.$message.error('请检查配置设置是否完整')
            return
          }
          this.updateSwaggerConfig(config)
          this.$message.success('配置更新成功')
        } catch (e) {
          this.$message.error('请检查配置是否是有效的Json字符串')
        }
      } else {
        this.$message.error('请输入swagger配置')
      }
    },
    toggleAddModal () {
      this.showAddModal = !this.showAddModal
    },
    ...mapMutations('app', ['addSwaggerConfig']),
    onSave () {
      this.addSwaggerConfig(this.addForm)
      this.showAddModal = false
      this.addForm = {}
    }
  },
  watch: {
    configModalVisible (val) {
      if (val) {
        this.swaggerJson = JSON.stringify(this.swaggerConfig)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swagger-config-page {
  .btns {
    text-align: right;
    padding: 20px 0px;
    button{
      margin-left: 20px;
    }
  }
}
.tip {
  line-height: 20px;
  color:red;
}
</style>
