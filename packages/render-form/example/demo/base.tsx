import React from 'react'
import Demo from '../../dist/index'
import { RenderFormItemProps } from '../../types/index'
import { Input, Button } from 'antd/sun'

export default function BaseDemo() {
  const [form] = Demo.useForm()
  const selectOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
  ]

  const formItems: RenderFormItemProps<['date']>[] = [
    {
      label: 'ID',
      name: 'id',
      labelCol: {
        span: 2,
      },
      wrapperCol: {
        span: 22,
      },
      colProps: {
        span: 24,
      },
      itemProps: {
        disabled: true,
        placeholder: '提交后系统自动生成',
      },
    },
    {
      type: 'datePicker',
      label: '日期',
      name: 'datePicker',
    },
    {
      label: '类型',
      name: 'type',
      type: 'select',
      rules: [{ required: true, message: '请选择类型' }],
      itemProps: {
        disabled: false,
        options: selectOptions,
      },
    },
    {
      label: 'form wrap',
      noStyle: true,
      render(options, form) {
        return (
          <>
            <Demo.Item label="name1" name="vins1">
              <Input />
            </Demo.Item>
            <Demo.Item label="name2" name="vins2">
              <Input />
            </Demo.Item>
          </>
        )
      },
    },
  ]

  const onChange = (v, allValues) => {
    console.log(v, allValues)
  }

  const onClick = () => {
    console.log(form.getFieldsValue())
  }

  return (
    <>
      <Demo
        form={form}
        initialValues={{
          id: 1,
        }}
        items={formItems}
        onValuesChange={onChange}
      />
      <Button onClick={onClick}>打印form值</Button>
    </>
  )
}
