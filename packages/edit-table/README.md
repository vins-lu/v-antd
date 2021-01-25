# boss-edit-table 可编辑表格

### 使用方法

> yarn add @vins-rc/edit-table

## 文档
### 可编辑表格的属性 EditTableProps

| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| columns  | 可编辑单元格列的配置   | EditColumnProps[]  | 必填  | - |
| editType | 可编辑表格的类型 | table ｜ row ｜ detail  | - | row |
| formDataKey | 可编辑表格的类型为table是的数据包裹字段 | string  | - | formData |
| toggleEditFn | 动态控制单元格是否可编辑的属性 | (record?: any, col?: any) => boolean  | - | () => true |
| ... | 更多参考: [**antd/sun/Table Table**](https://ant.design/components/table-cn/#API) | - | - |

### 单元格列的配置 EditColumnProps
| 参数        | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| ---------- | ----------- | ------- | -------------- | ------ |
| render     | 自定义的渲染方法 | ((text?: string, record?: RecordType, index?: number) => JSX.Element) ｜ JSX.Element  | -  | -  |
| editOption | 可编辑单元格的属性 | ColumnEditOption  | -  | -  |
| hideColumn | 是否隐藏该列    | boolean  | -  | -  |
| ... | 更多参考: [**antd/sun/Table Column**](https://ant.design/components/table-cn/#API) | - | - |

### 可编辑单元格的属性 ColumnEditOption
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| type     | 表单的类型   | input, trimInput, textArea, radio, checkbox, select, number，datePicker, text | -  | trimInput |
| hide     | 是否隐藏     | (itemProps) => boolean ｜ boolean  | -  | -  |
| render   | 自定义渲染   | (itemProps) => JSX.Element ｜ JSX.Element  | -  | -  |
| rowSpan  | 单元格行合并 | ((arg?: any) => number) | number  | -  | -  |
| colSpan  | 单元格列合并 | ((arg?: any) => number) | number  | -  | -  |
| retain   | 不可编辑的时候，是否保留表单的disabled的形式 | boolean  | -  | -  |
| formProps | 可编辑表单元素的包裹容器Form.Item的属性 | formProps  | -  | -  |
| ... | 其余属性会添加到可编辑表单元素的属性 | - | - |


### 可编辑表单元素的包裹容器Form.Item的属性 formProps
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| asWrap | 是否作为包裹容器 | boolean  | -  | -  |
| wrapName | 如果作为包裹容器，会使用wrapName替代name字段 | formProps  | -  | -  |
| ... | 更多参考: [**antd/sun/Form Form.Item**](https://ant.design/components/form-cn/#API) | - | - |
