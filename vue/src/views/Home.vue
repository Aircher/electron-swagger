<template>
  <div class="home-page">
    <div class="card" @click="toggleAddModal">
      <Icon type="md-add" />
      <div style="font-size:16px;line-height:40px;color:#c4c4c4;">添加swagger配置</div>
    </div>
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
import { mapMutations } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      showAddModal: false,
      addForm: {}
    }
  },
  components: {},
  methods: {
    toggleAddModal () {
      this.showAddModal = !this.showAddModal
    },
    ...mapMutations('app', ['addSwaggerConfig']),
    onSave () {
      this.addSwaggerConfig(this.addForm)
      this.showAddModal = false
    },
    gotoList () {
      this.$router.push('/list')
    }
  }
}
</script>

<style lang="less" scoped>
@cardSize : 150px;
.home-page {
  position: relative;
  width: 100%;
  height: 100%;
  .card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%;-50%);
    height: @cardSize;
    text-align: center;
    width: @cardSize;
    border: 1px solid rgba(196, 196, 196, 0.22);
    box-shadow: 0px 14px 30px 0px rgba(164, 164, 164, 0.17);
    line-height: @cardSize;
    margin: 0 10px;
    cursor: pointer;
    font-size: 50px;
    color: #eeeeee;
    border-radius: 10px;
  }
}
</style>
