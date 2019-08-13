<template>
  <div class="list-page">
    <Tabs>
      <TabPane v-for="(item,index) in swaggerConfig" :label="item.name" :key="index"></TabPane>
    </Tabs>
    <div>
      <Collapse simple v-for="(property,index) in Object.keys(swaggerApiGroupList)" :key="index">
        <Panel :name="property">
          {{property}} <i class="iconfont iconcopy"></i>
          <div slot="content">
            <Collapse simple v-for="(item,index) in swaggerApiGroupList[property]" :key="index">
              <Panel :name="item.url">
                {{item.url}} {{item.summary}} <i class="iconfont iconcopy"></i>
                <p slot="content">
                  <pre v-html="item.requestCode" class="code-content">
                  </pre>
                </p>
              </Panel>
            </Collapse>
          </div>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import http from '../utils/http'
import _ from 'loadsh'
export default {
  name: '',
  data () {
    return {
      swaggerApiList: [],
      swaggerApiGroupList: {},
      swaggerConfigDetail: null
    }
  },
  created () {
    this.getSwaggerApiData(this.swaggerConfig[0].apiUrl)
  },
  computed: {
    ...mapState({
      swaggerConfig: state => state.app.swaggerConfig
    })
  },
  methods: {
    getSwaggerApiData (url) {
      http.get(url).then(res => {
        this.swaggerConfigDetail = res
        console.log(res)
        if (res.paths) {
          let apiList = []
          Object.keys(res.paths).forEach(key => {
            let path = res.paths[key]
            let mutipleRequest = false // 标记同一个Url是否包含多个请求
            if (Object.keys(path).length > 1) {
              mutipleRequest = true
            }
            ['get', 'post', 'put', 'delete'].forEach(type => {
              let curItem = path[type]
              if (curItem) {
                let requestCode = ''
                let funcName = mutipleRequest
                  ? `${key.split('/').pop()}_${type}`
                  : key.split('/').pop()
                curItem.parameters = curItem.parameters || []
                if (curItem.parameters.findIndex(x => x.in === 'path')) {
                  let requestParams = []
                  let pathParams = curItem.parameters.filter(x => x.in === 'path').map(x => x.name).join(',')
                  let haveQueryParams = curItem.parameters.findIndex(x => x.in === 'query') >= 0
                  let haveBodyParams = curItem.parameters.findIndex(x => x.in === 'body') >= 0
                  if (pathParams.length > 0) {
                    requestParams.push(...pathParams)
                  }
                  if (haveQueryParams) {
                    requestParams.push('params')
                  }
                  if (haveBodyParams) {
                    requestParams.push('data')
                  }
                  requestCode = `
                        ${curItem.summary ? '//' + curItem.summary : ''} 
                        export const ${funcName}= (${requestParams.length > 0 ? requestParams.join(',') : null})=> { 
                            return  request({ 
                                url:'${key}', 
                                method:'${curItem.method}', 
                                ${haveQueryParams ? 'params: params' : ''}
                                ${haveBodyParams ? 'data: data' : ''}
                            }) 
                        }`.replace(/\n(\n)*( )*(\n)*\n/g, '\n')

                  // 去掉每一行前面的空格
                  requestCode = requestCode.split('\n').map(item => {
                    return item.replace('                     ', '')
                  }).join('\n')
                }
                apiList.push({
                  tag: path[type].tags[0],
                  url: key,
                  type: type,
                  summary: path[type].summary,
                  requestCode: requestCode
                })
              }
            })
          })
          this.swaggerApiList = apiList
          this.swaggerApiGroupList = _.groupBy(apiList, 'tag')
          console.log(this.swaggerApiGroupList)
        }
      })
    }
  }
}
</script>

<style lang="less">
.list-page {
  .ivu-collapse-header {
    text-align: left;
  }
  .code-content{
    text-align: left;
    cursor: pointer;
  }
  .iconcopy{
    position: absolute;
    bottom: 0px;
    right: 20px;
    z-index: 1;
  }
  .panel-header{
    padding-left: 20px;
  }
}
</style>
