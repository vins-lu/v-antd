# reactC-webpack-config

> **react 组件打包通用配置**



### Environment

> - **框架及UI：React / antd**
> - **JS类型检查及转换：typescript**
> - **css支持：css / less**
> - **代码风格规范：eslint / prettier**
> - **测试工具：jest**



### 使用提示

> 1. 修改 `package.json` 中的 `name、version、description`
> 2. 组件写在 `src` 文件夹中，测试示例写在 `example` 文件夹中
> 3. 单元测试在 `scripts/jest` 文件夹中



### Note

> - 此框架适合 `React` 组件的封装，并且仅输出了 `commonjs` 格式
> - 如果需要引入第三方库，并且库不需要被打包，需要配置 `webpack.prod.config.js` 中的 `externals` 属性（视情况而定）
> - CSS 暂支持 CSS/Less ，其他类型需要自行添加



### 发布

> 1. 测试无误后，**升级版本**
>
> 2. 项目根目录下运行 `sh publish.sh`
