import React, { useState } from 'react'
import { Row, Col, Divider } from 'antd/sun'
import FormFields, { SearchFormField } from './formFields'
import FormExpand from './formExpand'

export interface SearchFormGroup {
  // 筛选组名称
  groupName: string | JSX.Element
  // 输入框列表
  searchFormFields: SearchFormField[]
}

export interface MultiFormFieldsProps {
  // 筛选框组
  searchFormGroups?: SearchFormGroup[]
  // 规定默认展示几行
  rows?: number
  // 规定一行有多少列
  columns?: number
}

type MultiFormFieldsTypes = (props: MultiFormFieldsProps) => JSX.Element[]

const MultiFormFields: MultiFormFieldsTypes = ({
  searchFormGroups = [],
  rows = 1,
  columns = 3,
}: MultiFormFieldsProps) => {
  const elements = []

  for (let idx = 0, len = searchFormGroups.length; idx < len; idx++) {
    const item = searchFormGroups[idx]

    const [expand, setExpand] = useState(false)

    const formFieldsOps = {
      searchFormFields: item.searchFormFields,
      rows,
      columns,
      expand,
    }

    elements.push(
      <Row key={idx}>
        <Col span={24} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '16px' }}>{item.groupName}</div>
          {item.searchFormFields.length > rows * columns ? <FormExpand expand={expand} setExpand={setExpand} /> : ''}
        </Col>
        {FormFields(formFieldsOps)}
        {idx + 1 !== len ? (
          <Divider
            dashed
            style={{
              marginTop: '0',
              marginBottom: '8px',
            }}
          />
        ) : (
          ''
        )}
      </Row>,
    )
  }

  return elements
}

export default MultiFormFields
