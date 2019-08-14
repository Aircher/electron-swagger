<template>
  <div class="list-page">
    <Tabs @on-click="changeSwaggerTab">
      <TabPane v-for="(item,index) in swaggerConfig" :label="item.name" :key="index">
        <div v-if="item.swaggerApiGroupList" class="swagger-container">
          <div class="swagger-website">
            <strong>swagger地址:</strong><a :href="item.swaggerWebsite" target="_blank">{{item.swaggerWebsite}}</a>
          </div>
          <Collapse
            simple
            v-for="(property,index) in Object.keys(item.swaggerApiGroupList)"
            :key="index"
          >
            <Panel :name="property">
              {{property}}
              <Icon type="md-copy"  @click.stop="mutipleCopyRequestCode(item.swaggerApiGroupList[property])" />
              <div slot="content">
                <Collapse
                  simple
                  v-for="(item,index) in item.swaggerApiGroupList[property]"
                  :key="index"
                >
                  <Panel :name="item.url">
                    {{item.url}} {{item.summary}}
                    <Icon type="md-copy"  @click.stop="copyRequestCode(item)" />
                    <div slot="content">
                      <pre v-html="item.requestCode" class="code-content"></pre>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </Panel>
          </Collapse>
        </div>
      </TabPane>
    </Tabs>
    <div></div>
  </div>
</template>

<script>
import http from '../utils/http'
import _ from 'loadsh'
import { copy } from '../utils'
export default {
  name: '',
  data () {
    return {
      swaggerApiList: [],
      swaggerApiGroupList: {},
      swaggerConfigDetail: null,
      swaggerConfig: []
    }
  },
  mounted () {
    this.swaggerConfig = _.cloneDeep(this.$store.state.app.swaggerConfig)
    this.getSwaggerApiData(this.swaggerConfig[0])
  },
  methods: {
    getSwaggerApiData (swagger) {
      http.get(swagger.apiUrl).then(res => {
        this.swaggerConfigDetail = res
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
                // 取url最后一个字段当做方法名。注意排除pathParam
                let funcName = key.split('/').filter(x => !x.startsWith('{')).pop()
                // 如果同一个链接有多个请求就在名字后面加上请求类型
                if (mutipleRequest) {
                  funcName = `${funcName}_${type}`
                }
                curItem.parameters = curItem.parameters || []
                if (curItem.parameters.findIndex(x => x.in === 'path')) {
                  let requestParams = []
                  let pathParams = curItem.parameters
                    .filter(x => x.in === 'path')
                    .map(x => x.name)
                  let haveQueryParams =
                    curItem.parameters.findIndex(x => x.in === 'query') >= 0
                  let haveBodyParams =
                    curItem.parameters.findIndex(x => x.in === 'body') >= 0
                  if (pathParams.length > 0) {
                    requestParams.push(...pathParams)
                  }
                  if (haveQueryParams) {
                    requestParams.push('params')
                  }
                  if (haveBodyParams) {
                    requestParams.push('data')
                  }

                  // 默认链接就是key
                  let requestUrl = `'${key}'`
                  // 如果链接里面包含参数就是用字符串模板会将xxx/{sysno}转换成xxx/${sysno}
                  if (pathParams.length > 0) {
                    requestUrl = `\`${key.replace(/\/{/g, '/${')}\``
                  }
                  requestCode = `
                      ${curItem.summary ? '//' + curItem.summary : ''} 
                      export const ${funcName}= (${
  requestParams.length > 0 ? requestParams.join(',') : ''
})=> { 
                          return  request({ 
                            url: ${requestUrl}, 
                            method: '${type}',
                            ${haveQueryParams ? 'params: params' : ''}
                            ${haveBodyParams ? 'data: data' : ''}
                          }) 
                      }`.split('\n').filter(x => x.trim().length > 0).join('\n')
                  // 去掉每一行前面的空格
                  requestCode = requestCode
                    .split('\n')
                    .map(item => {
                      return item.replace('                     ', '')
                    })
                    .join('\n')
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
          this.$set(swagger, 'swaggerApiGroupList', _.groupBy(apiList, 'tag'))
          this.$set(swagger, 'swaggerApiList', apiList)
        }
      })
    },
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
    },
    changeSwaggerTab (index) {
      const curSwagger = this.swaggerConfig[index]
      if (!curSwagger.swaggerApiGroupList) {
        this.getSwaggerApiData(curSwagger)
      }
    }
  }
}
</script>

<style lang="less">
.list-page {
  .ivu-collapse-header {
    text-align: left;
  }
  .code-content {
    text-align: left;
    cursor: pointer;
  }
  .ivu-icon-md-copy {
    position: absolute;
    bottom: 4px;
    right: 20px;
    font-size: 20px;
    z-index: 1;
    transform: none !important;
  }
  .panel-header {
    padding-left: 20px;
  }
  .swagger-container {
    height: calc(100vh - 150px);
    width: 100%;
    overflow: auto;
    .swagger-website{
      margin-bottom: 10px;
      strong{
        margin-right: 10px;
      }
    }
  }
}
</style>
