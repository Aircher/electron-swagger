# elctron-swagger
基于elctron的swagger解析器。主要是为了简化前端人员编写axios的api代码。目前只解析了常规请求。譬如formData或者需要自定义header的请求未做对应解析，因为这类请求在业务代码开发中占比不大。大部分还是基本的json请求。

# 编译/运行
1. 进入vue和electron文件夹执行npm i
2. 进入vue执行npm run build,会生成dist文件，并且会将dist文件拷贝到electron/web文件夹下
3. 进入electron文件夹支持npm run build会生成对应的windows exe程序包

# 用途
1. 用于自动生成axios请求代码.
2. 点击复制按钮即可生产api代码。支持单个复制，也指出同一个controller下的所有子请求复制。
3. 方法名默认请求url里面的最后一个字段。
4. 对于restful api。同一个url支持多个不同类型请求时,会自动在方法名后面增加method类型。譬如 xxx_get,xxx_post
5. 如果url里面带有请求参数,会默认在request(xxx,xxx,xxxx)方法的参数里面带入url里面的请求参数

# 界面展示
<img style="width:300px" src="https://github.com/FourLeafClover/electron-swagger/blob/master/electron/images/config.jpg" />
<img style="width:300px" src="https://github.com/FourLeafClover/electron-swagger/blob/master/electron/images/detail.jpg" />

