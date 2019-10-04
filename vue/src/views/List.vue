<template>
  <div class="list-page">
    <VerticalTabs @on-click="changeSwaggerTab">
      <VerticalTabPanel v-for="(item,index) in swaggerConfig" :label="item.name" :key="index">
        <CodePanel :item="item" />
        <Spin size="large" v-if="item.loading"></Spin>
      </VerticalTabPanel>
    </VerticalTabs>
  </div>
</template>

<script>
import http from '@/utils/http'
import _ from 'loadsh'
import CodePanel from '@/components/Code/index'
import VerticalTabs from '@/components/VerticalTabs/VerticalTabs'
import VerticalTabPanel from '@/components/VerticalTabs/VerticalTabPanel'
export default {
  name: '',
  components: {
    CodePanel,
    VerticalTabs,
    VerticalTabPanel
  },
  data () {
    return {
      swaggerApiList: [],
      swaggerApiGroupList: {},
      swaggerConfigDetail: null,
      swaggerConfig: [],
      activeIndex: 0
    }
  },
  mounted () {
    this.swaggerConfig = _.cloneDeep(this.$store.state.app.swaggerConfig)
    this.getSwaggerApiData(this.swaggerConfig[0])
  },
  methods: {
    getSwaggerApiData (swagger) {
      this.$set(swagger, 'loading', true)
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
                let funcName = key
                  .split('/')
                  .filter(x => !x.startsWith('{'))
                  .pop()
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
                          return request({ 
                            url: ${requestUrl}, 
                            method: '${type}',
                            ${haveQueryParams ? 'params: params' : ''}
                            ${haveBodyParams ? 'data: data' : ''}
                          }) 
                      }`
                    .split('\n')
                    .filter(x => x.trim().length > 0)
                    .join('\n')
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
      }).finally(() => {
        swagger.loading = false
      })
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
    .swagger-website {
      margin-bottom: 10px;
      strong {
        margin-right: 10px;
      }
    }
  }
  /deep/ .ivu-spin{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
