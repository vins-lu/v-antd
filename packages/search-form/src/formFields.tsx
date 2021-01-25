import React from 'react'
import { Col, HookForm } from 'antd/sun'

// 搜索项
export interface SearchFormField {
  name: string
  label: string
  renderElement: JSX.Element | (() => JSX.Element)
}

export interface FormFieldsProps {
  // 搜索表单字段
  searchFormFields?: SearchFormField[]
  // 规定默认展示几行
  rows?: number
  // 规定一行有多少列
  columns?: number
  // 展开收起样式控制
  expand?: boolean
}

type FormFieldsTypes = (props: FormFieldsProps) => JSX.Element[]

const horizontalGutter = 24

const FormFields: FormFieldsTypes = ({
  searchFormFields = [],
  rows = 1,
  columns = 3,
  expand = false,
}: FormFieldsProps) => {
  const elements = []
  for (let idx = 0, len = searchFormFields.length; idx < len; idx++) {
    const item = searchFormFields[idx]
    elements.push(
      <Col
        span={horizontalGutter / columns}
        key={item.name}
        style={{ display: !expand && idx + 1 > rows * columns ? 'none' : 'block' }}
      >
        <HookForm.Item name={item.name} label={item.label} style={{ marginBottom: '16px' }}>
          {typeof item.renderElement === 'function' ? item.renderElement() : item.renderElement}
        </HookForm.Item>
      </Col>,
    )
  }

  // return elements
  return elements
}

export default FormFields
