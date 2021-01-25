/* eslint-disable @typescript-eslint/unbound-method */
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { Input, InputNumber, message, Select } from 'antd/sun'
import EditTableCell from '../dist/index'
import { CbFnParamsType } from '../types/index'

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

function CustomInput(props: { onChange: (value?: CbFnParamsType, arg?: any) => void }): JSX.Element {
  const onChange = (e: any) => {
    const customArgs = { vins: 1 }
    props.onChange(e.target.value, customArgs)
  }
  return <Input onChange={onChange} />
}

const Demo = (): JSX.Element => {
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
      title: '日期',
      dataIndex: 'date',
      editOption: {
        type: 'datePicker',
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
        onChange({ value, index, option, resolve, cus }): void {
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
    {
      title: '自定义元素的事件参数',
      dataIndex: 'custom1',
      editOption: {
        onChange({ value, index, option, resolve, customArgs }): void {
          const newData = [...data]
          newData[index][option.dataIndex] = value
          setData(newData)
          // resolve()
          console.log('onChange', value, customArgs)
        },
        render(option): JSX.Element {
          // 自定义参数
          return <CustomInput {...option} />
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

ReactDOM.render(<Demo />, document.getElementById('app'))
