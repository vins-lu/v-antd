import React from 'react'
import ReactDOM from 'react-dom'
import Demo from '../dist/index'
import 'antd/dist/antd.css'

import { HookForm } from 'antd/sun'

const onChange = (v, m, s) => {
  console.log(v, m, s)
}

function Demo1(props) {
  const [form] = HookForm.useForm()
  const onChange = (v, vs) => {
    console.log(v, vs)
    console.log(form.getFieldsValue())
  }
  return (
    <HookForm initialValues={{ date: 1589960172570 }} form={form} onFieldsChange={onChange}>
      <HookForm.Item name="date" label="date">
        <Demo allowClear />
      </HookForm.Item>
    </HookForm>
  )
}

function TestDemo() {
  return (
    <div>
      <Demo onChange={onChange} />
      <Demo1 />
    </div>
  )
}

ReactDOM.render(<TestDemo />, document.getElementById('app'))
