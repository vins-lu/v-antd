import { Col, HookForm, Row } from 'antd/sun'
import React, { useState } from 'react'
import Form, { FormProps, FormInstance } from 'antd/sun/dist/hook-form'
import ButtonsComp, { ButtonsCompProps } from './buttons'
import FormFields, { FormFieldsProps } from './formFields'
import MultiFormFields, { MultiFormFieldsProps } from './multiFormFields'
import FormExpand from './formExpand'
// import './styles/index.less'

interface SearchFormProps extends ButtonsCompProps, FormFieldsProps, MultiFormFieldsProps, FormProps {
  // 是否为分组筛选
  multiple?: boolean
  // 点击搜索回调 (formData: 当前form表单，ifFetchData： 是否点击了搜索按钮) => void
  onFinish(formData: object, ifFetchData?: boolean): void
  // form hooks
  form?: FormInstance
}

export interface SearchFormTypes {
  (props: SearchFormProps): JSX.Element
  useForm?: () => [FormInstance]
  Item?: Form['Item']
}

// type SearchFormTypes = (props: Readonly<SearchFormProps>) => JSX.Element

const horizontalGutter = 24

const SearchForm: SearchFormTypes = ({
  searchFormFields = [],
  searchFormGroups = [],
  onFinish,
  showSearchButton,
  searchButtonProps,
  showResetButton,
  resetButtonProps,
  rows = 1,
  columns = 3,
  actionButtons,
  actionButtonClick,

  multiple = false,
  form,
  ...formProps
}: SearchFormProps) => {
  if (!form) {
    const [insideForm] = HookForm.useForm()
    form = insideForm
  }

  const [expand, setExpand] = useState(false)

  const handleReset = (): void => {
    if (form) {
      form.resetFields()
      onFinish({ ...form.getFieldsValue() }, false)
    } else {
      onFinish({}, false)
    }
  }

  const buttonsCompOps = {
    showSearchButton,
    searchButtonProps,
    showResetButton,
    resetButtonProps,
    actionButtons,
    actionButtonClick,
    handleReset,
  }

  const formFieldsOps = {
    searchFormFields,
    rows,
    columns,
    expand,
  }

  const multiFormFieldsOps = {
    searchFormGroups,
    rows,
    columns,
  }

  return (
    <section>
      <HookForm form={form} onFinish={(values): void => onFinish(values, true)} {...formProps}>
        {multiple ? (
          MultiFormFields(multiFormFieldsOps)
        ) : (
          <Row gutter={horizontalGutter}>{FormFields(formFieldsOps)}</Row>
        )}
        <Row>
          <Col span={horizontalGutter} style={{ textAlign: 'right' }}>
            <ButtonsComp {...buttonsCompOps} />
            {multiple ? '' : <FormExpand expand={expand} setExpand={setExpand} />}
          </Col>
        </Row>
      </HookForm>
    </section>
  )
}

// 代理到SearchForm组件上的HookForm组件上的方法
const proxyFormFn = ['useForm', 'Item'] as const

proxyFormFn.forEach((fnName: typeof proxyFormFn[number]) => {
  SearchForm[fnName] = HookForm[fnName] as any
})

export default SearchForm
