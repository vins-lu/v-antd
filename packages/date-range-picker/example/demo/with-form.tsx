import React from 'react'
import Demo from '../../dist/index'
import { HookForm } from 'antd/sun'

export default function() {
  const [form] = HookForm.useForm()
  const onChange = (v, vs) => {
    console.log(form.getFieldsValue())
  }
  return (
    <HookForm initialValues={{
      dateRange: [1589960172570, 1606381657223],
      // start: 1606381657223,
      // end: 1606381657223,
      }} form={form} onFieldsChange={onChange}>
      <HookForm.Item name="dateRange" label="dateRange">
        <Demo allowClear startDateAlias="start" endDateAlias="end" />
      </HookForm.Item>
    </HookForm>
  )
}
