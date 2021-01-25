import React from 'react'
import RenderForm from '@vins-rc/render-form'
import { RenderFormItemProps } from '@vins-rc/render-form'
import DateRangePicker from '../../dist'

RenderForm.extendType('dateRange', DateRangePicker)

export default function ExtendFormTypeDemo() {
  const [form] = RenderForm.useForm()

  const formItems: RenderFormItemProps<['dateRange']>[] = [
    {
      type: 'dateRange',
      label: '扩展日期类型',
      name: 'dateRange',
      itemProps: {
        startDateAlias: 'start',
        endDateAlias: 'end',
        dateMode: ['start', 'start']
      }
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
    <RenderForm
      form={form}
      items={formItems}
      initialValues={{
        dateRange: [1589960172570, 1606381657223],
        // start: 1606381657223,
        // end: 1606381657223,
      }}
      onValuesChange={onChange}
    />
  )
}
