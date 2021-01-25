import React from 'react'
import RenderForm from '@vins-rc/render-form'
import { RenderFormItemProps } from '@vins-rc/render-form'
import DateRangePicker from '../../dist'
import { Card, Button } from 'antd/sun'

RenderForm.extendType('dateRange', DateRangePicker)

export default function GroupDemo() {
  const [form] = RenderForm.useForm()

  const formItems: RenderFormItemProps<['dateRange']>[] = [
    {
      type: 'group',
      name: 'group1',
      wrapper(c) {
        return (
          <Card title="hello" className="wrapper">
            {c}
          </Card>
        )
      },
      groups: [
        {
          type: 'number',
          label: '数量',
          name: 'num',
          afterSlot: <button>123</button>,
        },
        {
          type: 'dateRange',
          label: '日期',
          name: 'dateRange',
          itemProps: {
            startDateAlias: 'start',
            endDateAlias: 'end',
            dateMode: ['start', 'start']
          }
        },
      ],
    },
    {
      type: 'group',
      name: 'group2',
      hidden: true,
      groups: [
        {
          type: 'dateRange',
          label: '日期',
          name: 'dateRange',
          itemProps: {
            startDateAlias: 'start',
            endDateAlias: 'end',
            dateMode: ['start', 'start']
          }
        },
      ],
    },
  ]

  const onChange = (v, allValues) => {
    console.log(v, allValues)
  }

  const onClick = () => {
    console.log(form.validateFields())
  }

  return (
    <>
      <RenderForm
        form={form}
        initialValues={{
          group1: {
            num: 0,
            dateRange: [1589960172570, 1606381657223],
            // start: 1606381657223,
            // end: 1606381657223,
          },
          group2: {
            dateRange: [1589960172570, 1606381657223],
          },
        }}
        items={formItems}
        onValuesChange={onChange}
      />
      <Button onClick={onClick}>打印form值</Button>
    </>
  )
}
