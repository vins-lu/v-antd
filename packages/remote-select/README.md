## boss-remote-select

一个带有远程搜索，防抖控制，支持多选的选择框。

获取的值支持 primitive data(也就是我们常说的`code`)，也支持整个对象(当指定`labelInValue`)

### 安装

> yarn add @vins-rc/remote-select

### 文档说明

| 参数        | 说明                 | 类型                          | 是否必须 | 默认          |
| ----------- | -------------------- | ----------------------------- | -------- | ------------- |
| initOptions | 初始数据             | 见下表                        | 否       | []            |
| waitTime    | 防抖间隔时间         | number                        | 否       | 800(单位毫秒) |
| fetchFn     | 获取远程数据处理函数 | (query: string): Promise<any> | 是       | -             |



initOptions

| 参数     | 说明        | 类型     | 是否必须 | 默认值 |
| -------- | ---------- | ------- | -------------- | ------ |
| label    | 展示的文本   | string  | 否 | -  |
| value    | 选中的值     | string, number  | 是 | -  |
| disabled | 是否可以选择 | boolean | 否 | -  |
| children | 自定义的渲染内容 | React.ReactChild | -  | -  |



其他参数参照 [antd-select-api](https://ant.design/components/select-cn/#API)


