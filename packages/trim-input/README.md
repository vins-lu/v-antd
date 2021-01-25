# boss-trim-input 基础下拉选择组件

### 使用方法

> yarn add @vins-rc/trim-input

```js
import TrimInput from '@vins-rc/trim-input'
function Demo() {
  const onChange = (v) => {
    console.log('v', v)
  }
  return <TrimInput onChange={onChange} />
}
```

## 文档
修改了 **antd/sun/input** 中的 **onChange** 和 **onBlur** 的函数类型，直接返回输入框的值；别的属性保持不变

### trim-input options
| 参数     | 说明        | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ---------- | ------- | -------------- | ------ |
| onChange | 值变化      | (v) => void  | -  | -  |
| onBlur   | 失去焦点    | (v) => void  | -  | -  |
