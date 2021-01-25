# boss-base-select 基础下拉选择组件

### 使用方法

> yarn add @vins-rc/base-select

```js
import BaseSelect from '@vins-rc/base-select'
function BaseSelectDemo(): JSX.Element {
  const whetherOptions = [
    { label: '是', value: '1' },
    { label: '否', value: '0' },
  ]
  return <BaseSelect defaultValue='1' options={whetherOptions} />
}
```

## 文档

### select props
| 参数     | 说明        | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ---------- | ------- | -------------- | ------ |
| optionLabelAlias | label的别名 | string  | -  | label  |
| optionValueAlias | value的别名 | string  | -  | value  |

### select options
| 参数     | 说明        | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ---------- | ------- | -------------- | ------ |
| key      | 自定义的主键 | string  | -  | -  |
| label    | 展示的文本   | string  | -  | -  |
| value    | 选中的值     | string, number  | - | -  |
| disabled | 是否可以选择  | boolean | -  | -  |
| children | 自定义的渲染内容 | React.ReactChild | -  | -  |
