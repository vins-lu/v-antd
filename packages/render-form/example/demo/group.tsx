import React from 'react'
import Demo from '../../dist/index'
import { RenderFormItemProps } from '../../types/index'
import { Card, Button } from 'antd/sun'

export default function GroupDemo() {
  const [form] = Demo.useForm()

  const formItems: RenderFormItemProps[] = [
    {
      label: 'ID',
      name: 'id',
    },
    {
      type: 'group',
      name: 'group',
      // hide(option, form) {
      //   return true
      // },
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
      ],
    },
    {
      type: 'group',
      name: 'group1',
      hidden: true,
      groups: [
        {
          type: 'number',
          label: 'hidden-数量',
          name: 'num',
        },
      ],
    },
    {
      type: 'group',
      name: 'group2',
      hidden: false,
      groups: [
        {
          type: 'number',
          label: '数量',
          name: 'num',
        },
      ],
    },
  ]

  const onChange = (v, allValues) => {
    console.log(v, allValues)
  }

  const onClick = () => {
    form.setFieldsValue({
      vinsHidden: '12345',
      group: {
        num: 1,
      },
    })
    console.log(form.validateFields())
  }

  return (
    <>
      <Demo
        form={form}
        initialValues={{
          id: 1,
          version: '1.2',
          group: {
            num: 0,
          },
          group1: {
            num: 0,
          },
        }}
        items={formItems}
        onValuesChange={onChange}
      />
      <Button onClick={onClick}>打印form值</Button>
    </>
  )
}
