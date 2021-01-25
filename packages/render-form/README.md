# boss-render-form 配置化表单组件

### 使用方法

> yarn add @vins-rc/render-form

```js
import TrimInput from '@vins-rc/render-form'
function Demo() {
  const selectOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
  ]

  const formItems: RenderFormItemProps[] = [
    {
      label: 'ID',
      name: 'id',
      labelCol: {
        span: 12,
      },
      wrapperCol: {
        span: 12,
      },
      itemProps: {
        disabled: true,
        placeholder: '提交后系统自动生成',
      },
    },
    {
      type: 'input',
      label: '版本',
      name: 'version',
    },
    {
      type: 'number',
      label: '数量',
      name: 'num',
    },
    {
      label: '类型',
      name: 'type',
      type: 'select',
      rules: [{ required: true, message: '请选择类型' }],
      itemProps: {
        disabled: false,
        options: selectOptions,
      },
    },
  ]

  const onChange = (v, allValues) => {
    console.log(v, allValues)
  }

  return <Demo items={formItems} onValuesChange={onChange} />
}
```

## 文档
**antd/sun/hookForm** 中的属性保持不变，不再列举

### 表单参数
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| items    | 表单项配置    | RenderFormItemProps  | 必填  | -  |
| rowProps | 包裹表单的Row | RowProps  | -  | {<br> labelCol: { sm: { span: 8 }, lg: { span: 6 },},<br>wrapperCol: {sm: { span: 16 },lg: { span: 18 },},}`  |
| column   | 列数         | number  | -  | 3  |
| mode     | 模式 text为详情模式，form表单模式 | text ｜ form  | -  | form  |

> RenderFrom 仍然可以支持只写包含子组件，包含的子组件会渲染在配置的项后面

### 表单项参数 RenderFormItemProps
**antd/sun/hookForm.item** 中的属性保持不变，不再列举

| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 | 版本 |
| -------- | ----------- | ------- | -------------- | ------ | ------ |
| type     | 表单的类型    | input, trimInput, textArea, radio, checkbox, select, number，datePicker, **group**，**list**  | -  | input  | - |
| hide     | 是否隐藏      | ((arg?: formValueType, form?: FormInstance) => boolean) ｜ boolean ｜ boolean  | -  | -  | - |
| hidden   | 是否隐藏，但依旧保存form数据和校验      | ((arg?: formValueType, form?: FormInstance) => boolean) ｜ boolean ｜ boolean  | -  | -  | 1.3.6 |
| render   | 自定义渲染    | ((arg?: formValueType, form?: FormInstance) => JSX.Element) ｜ JSX.Element  | -  | -  | - |
| colProps | 包裹表单元素的col的属性 | ColProps  | -  | -  | - |
| itemProps | 表单元素的属性 | object  | -  | -  | - |
| groups   | 分组表单元素    | RenderFormItemProps  | -  | -  | - |
| groupColumn | 分组表单元素的列数 | number  | -  | column  | - |
| useGroupName | 是否使用分组的name，默认使用 | boolean  | -  | -  | - |
| wrapper  | 分组的表单的包裹容器   | (children: React.ReactChild) => JSX.Element  | -  | -  | - |
| listItemWrapper  | 动态表单列的包裹容器   | (children: React.ReactChild, field: FieldData, operation: Operation) => JSX.Element  | -  | -  | - |
| beforeSlot | 表单元素的前置插槽  | ((arg?: formValueType, form?: FormInstance) => JSX.Element) ｜ JSX.Element  | -  | -  | - |
| afterSlot  | 表单元素的后置插槽   | ((arg?: formValueType, form?: FormInstance) => JSX.Element) ｜ JSX.Element  | -  | -  | - |

> itemProps 可根据不同的表单类型，相应的添加配置
