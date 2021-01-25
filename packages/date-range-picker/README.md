# boss-date-range-picker 时间戳格式的日期范围下拉框

### 使用方法

> yarn add @vins-rc/date-range-picker

```js
import DateRangePicker from '@vins-rc/date-range-picker'
function Demo() {
  const onChange = (value, moment, valueStr) => {
    console.log(value, moment, valueStr)
  }
  return <DateRangePicker onChange={onChange} />
}
```

## 文档
修改了 **antd/sun/date-picker** 中的 **onChange**, **value**, **defaultValue**的类型；别的属性保持不变

### trim-input options
| 参数     | 说明        | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ---------- | ------- | -------------- | ------ |
| defaultValue | 初始值  | number[]  | -  | -  |
| value    | 值         | number[]  | -  | -  |
| onChange | 值变化      | (number[]，moment[], momentStr[]) => void  | -  | -  |
| startDateAlias | 开始日期字段别名,配合render-form使用      | string  | -  | -  |
| endDateAlias | 介绍日期字段别名,配合render-form使用       | string  | -  | -  |
| dateMode | 日期取值模式    | [dateModeType, dateModeType] dateModeType: 'start' ｜ 'end' ｜ 'now'   | -  | ['start', 'end']  |
