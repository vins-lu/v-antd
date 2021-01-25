import React from 'react'
import RenderForm from '@vins-rc/render-form'
import { RenderFormItemProps } from '@vins-rc/render-form'
import DateRangePicker from '../../dist'
import { Card, Button } from 'antd/sun'

RenderForm.extendType('dateRange', DateRangePicker)

export default function TestDemo() {
  const [form] = RenderForm.useForm()

  const formItems: RenderFormItemProps<['dateRange']>[] = [
    {
      type: 'list',
      name: 'list1',
      groups: [
        {
          type: 'input',
          label: '姓名',
          name: 'name',
          rules: [{ required: true, message: '必须' }],
        },
        {
          type: 'dateRange',
          label: '日期',
          name: 'dateRange',
          itemProps: {
            startDateAlias: 'start',
            endDateAlias: 'end',
          }
        },
      ],
      wrapper(c, operation) {
        return (
          <Card title="hello" className="wrapper">
            <Button onClick={() => operation.add()}>添加</Button>
            {c}
          </Card>
        )
      },
      listItemWrapper(c, field, operation) {
        return (
          <Card extra={<Button danger type="link" onClick={() => operation.remove(field.name)}>删除</Button>}>
            {c}
          </Card>
        )
      },
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
          id: 1,
          list1: [{
            name: '123',
            age: 23,
            dateRange: [1589960172570, 1606381657223],
            // start: 1606381657223,
            // end: 1606381657223,
          }],
        }}
        items={formItems}
        onValuesChange={onChange}
      />
      <Button onClick={onClick}>打印form值</Button>
    </>
  )
}
