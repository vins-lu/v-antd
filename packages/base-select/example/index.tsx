import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Demo from '../dist/index'
import { HookForm } from 'antd/sun'
import 'antd/dist/antd.css'

const options = [
  {
    aliasLabel: '男',
    aliasValue: '1',
    field: 'field',
  },
  {
    aliasLabel: '女',
    aliasValue: '0',
    children: <div>女-custom</div>,
  },
  {
    aliasLabel: '-',
    aliasValue: '-1',
    disabled: true,
  },
]

const onChange = (v, o) => {
  console.log(v, o)
}

function SingleDemo() {
  return <Demo optionLabelProp="label" options={options} defaultValue={'1'} onChange={onChange} />
}

function AliasDemo() {
  return (
    <>
      <Demo
        optionLabelProp="label"
        optionLabelAlias="aliasLabel"
        optionValueAlias="aliasValue"
        options={options}
        defaultValue={'1'}
        onChange={onChange}
      />
    </>
  )
}

function FormDemo() {
  const [form] = HookForm.useForm()
  const [op, setO] = useState([])
  form.setFieldsValue({
    select: '0',
  })
  useEffect(() => {
    setO(options)
  }, [])
  return (
    <HookForm form={form}>
      <HookForm.Item name="select">
        <Demo options={op} onChange={onChange} />
      </HookForm.Item>
    </HookForm>
  )
}

ReactDOM.render(<AliasDemo />, document.getElementById('app'))
