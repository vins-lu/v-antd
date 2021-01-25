# boss-edit-table-cell 可编辑单元格组件

### 使用方法

> yarn add @vins-rc/edit-table-cell

```js
import TrimInput from '@vins-rc/edit-table-cell'
function Demo() {
  const tableData = [
    {
      id: '1',
      field: '无editOption属性即为不可编辑字段',
      code: '如果使用onChange替换onSave，则没有提交动画',
      name: '除了Input以外的可编辑表单，不推荐使用该模式，可以使用弹出框的形式编辑',
      sex: 'Input以外的可编辑表单，没有onSave事件的回调，需要手动监听数据变化',
      custom: '1',
    },
    {
      id: '2',
      field: '2',
      code: '2',
      name: '2',
      sex: '男',
      custom: '2',
    },
    {
      id: '3',
      field: '3',
      code: '3',
      name: '3',
      sex: '女',
      custom: '3',
    },
  ]

  const Page = (): JSX.Element => {
    const rowKey = 'id'
    const [data, setData] = useState(tableData)

    const ctx = {
      onSave({ value, index, option, resolve, reject }): void {
        setTimeout(() => {
          if (value === '123') {
            message.error('错误的输入')
            reject()
          } else {
            const newData = [...data]
            newData[index][option.dataIndex] = value
            setData(newData)
            message.success('保存成功')
            resolve()
          }
        }, 2000)
      },
    }

    const columns = [
      {
        title: '不可编辑字段',
        dataIndex: 'field',
        width: 160,
      },
      {
        title: '编码',
        dataIndex: 'code',
        editOption: {
          editable(text, recode, index): boolean {
            return index > 0 && text !== '3'
          },
          onSave: ctx.onSave,
          placeholder: '输入123验证失败，输入别的提交成功',
        },
        width: 160,
      },
      {
        title: '名称',
        dataIndex: 'name',
        editOption: {
          editable(text, recode, index): boolean {
            return index > 0
          },
          onChange({ value }): void {
            console.log('onChange', value)
          },
        },
        width: 160,
      },
      {
        title: '类型',
        dataIndex: 'sex',
        editOption: {
          onChange({ value, index, option, resolve }): void {
            const sexOptionMap = {
              man: '男',
              woman: '女',
            }
            const newData = [...data]
            newData[index][option.dataIndex] = sexOptionMap[value]
            setData(newData)
            resolve()
          },
          render(option): JSX.Element {
            const selectOptions = [
              { label: '男', value: 'man' },
              { label: '女', value: 'woman' },
            ]
            return <Select options={selectOptions} {...option} />
          },
        },
        width: 160,
      },
      {
        title: '自定义元素',
        dataIndex: 'custom',
        editOption: {
          onChange({ value, index, option, resolve }): void {
            const newData = [...data]
            newData[index][option.dataIndex] = value
            setData(newData)
            // resolve()
            console.log('onChange', value)
          },
          onSave({ value, index, option, resolve }): void {
            console.log('onSave', value)
            resolve()
          },
          render(option): JSX.Element {
            return <InputNumber {...option} />
          },
        },
        width: 160,
      },
    ]

    return (
      <div>
        <EditTableCell dataSource={data} rowKey={rowKey} columns={columns} />
      </div>
    )
  }

  return <Page />
}
```

## 文档

### 表格参数
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| columns  | 表格项配置    | EditColumnProps  | 必填  | -  |
| blurSaveAble | 失去焦点的时候是否触发保存函数，只有输入框支持 | boolean  | -  | true  |
| ...      | **antd/sun/table** 中的属性保持不变，不再列举 | -  | -  | -  |

### 表格项参数 EditColumnProps
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| editOption | 可编辑单元格的配置 | ColumnEditOption  | -  | -  |
| ...      | **antd/sun/table** 中的列配置属性保持不变，不再列举 | -  | -  | -  |

### 可编辑单元格的配置参数 ColumnEditOption
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| editable | 是否可编辑 | (text?: any, recode?: any, index?: number) => boolean ｜ boolean  | -  | -  |
| render   | 自定义渲染的方法 | ((arg?: any) => JSX.Element) | JSX.Element  | -  | -  |
| type     | 可编辑的单元格的类型 | number ｜ input ｜ trimInput ｜ textArea ｜ radio ｜ checkbox ｜ select ｜ datePicker  | -  | trimInput  |
| onChange | 数据变化的回调 | CbFnParamsType  | -  | -  |
| onSave   | 数据保存的回调，保存时机：失去焦点或者回车 | CbFnParamsType  | -  | -  |
| ...      | 不同表单元素的props，不再列举 | -  | -  | -  |

### 回调函数参数 CbFnParamsType

### 可编辑单元格的配置参数 ColumnEditOption
| 参数     | 说明         | 类型     | 是否可选(可选值) | 默认值 |
| -------- | ----------- | ------- | -------------- | ------ |
| value    | 表单值  | any  | -  | -  |
| record   | 当前表格行的数据 | object  | -  | -  |
| index    | 表格行的位置索引 | number  | -  | -  |
| option   | 当前列的配置选项 | object  | -  | -  |
| resolve  | 保存或者数据改变的成功回调，调用后会重置表单为不可编辑状态 | () => void  | -  | -  |
| reject   | 保存或者数据改变的失败回调，调用后会重置表单为可编辑状态   | () => void  | -  | -  |
