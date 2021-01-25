import React from 'react'
import Demo from '../../dist/index'
import { RenderFormItemProps } from '../../types/index'
import DatePicker from '@vins-rc/date-picker'

Demo.extendType('date', DatePicker)

export default function ExtendFormTypeDemo() {
  const [form] = Demo.useForm()

  const formItems: RenderFormItemProps<['date']>[] = [
    {
      label: 'ID',
      name: 'id',
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
      type: 'date',
      label: '扩展日期类型',
      name: 'date',
    },
    {
      type: 'datePicker',
      label: '日期',
      name: 'datePicker',
    },
  ]

  const onChange = (v, allValues) => {
    console.log(v, allValues)
  }

  return (
    <Demo
      form={form}
      items={formItems}
      onValuesChange={onChange}
    />
  )
}
