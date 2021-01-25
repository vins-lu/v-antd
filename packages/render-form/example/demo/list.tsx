import React from 'react'
// import Demo, { RenderFormItemProps } from '../../src/index'
import Demo from '../../dist/index'
import { RenderFormItemProps } from '../../types/index'
import { Card, Button } from 'antd/sun'

export default function TestDemo() {
  const [form] = Demo.useForm()

  const formItems: RenderFormItemProps<['date']>[] = [
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
          type: 'number',
          label: '年龄',
          name: 'age',
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
          list1: [{ name: '123', age: 23 }],
        }}
        items={formItems}
        onValuesChange={onChange}
      />
      <Button onClick={onClick}>打印form值</Button>
    </>
  )
}
