# boss-desc-list 描述列表

## 使用方法

> yarn add @vins-rc/desc-list

## 文档
### DescListProps 组件参数
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| items    | 配置项    | DescItemType  | 必填  | -  |
| data     | 配置项对应的数据  | object  | -  | - |
| groupWrapper | 分组配置的默认包裹容器 | (children?: React.ReactChild, groupOption?: Object, itemValue?: unknown) => JSX.Element | -  | -  |
| hideTitle  | 是否隐藏默认的标题    | boolean | -  | false |
| ...  | 按钮本身支持的参数    | [DescriptionsProps](https://ant.design/components/descriptions-cn/#API) | -  | -  |


### DescItemType 配置项参数
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| label    | 标题文本     | React.ReactNode  | -  | -  |
| name     | 对应的数据字段  | string ｜ string[]  | -  | - |
| value    | 默认的文本，设置改字段后，name失效  | React.ReactNode  | -  | -  |
| span     | 在本行占的列数   | number | -  | -  |
| fullLine | 是否占据本行全部空间  | boolean | -  | -  |
| groups   | 分组数据   | DescItemType[] | -  | -  |
| wrapper  | 分组包裹容器   | (children?: React.ReactChild, groupOption?: Object, itemValue?: unknown) => JSX.Element | -  | -  |
| groupOption | 分组的配置项   | [DescriptionsProps](https://ant.design/components/descriptions-cn/#API) | -  | -  |
| useGroupName | 组内元素使用使用分组的name   | boolean | -  | -  |
| hide     | 是否隐藏该字段   | ((value?: object, data?: object) => boolean) ｜ boolean | -  | -  |
| render   | 自定义的渲染方法 | ((value?: object, data?: object) => JSX.Element) ｜JSX.Element | - | - |
