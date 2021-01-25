import React from 'react'
import { HookForm, Input, InputNumber, Radio, Checkbox, Row, Col } from 'antd/sun'
import BaseSelect, { SelectOptionType } from '@vins-rc/base-select'
import TrimInput from '@vins-rc/trim-input'
import DatePicker from '@vins-rc/date-picker'
import Form, { FormProps, FormItemProps, FormInstance } from 'antd/sun/dist/hook-form'

import { RowProps } from 'antd/sun/dist/row'
import { ColProps } from 'antd/sun/dist/col'

type extendElementType = (arg?: unknown) => JSX.Element | React.Component | React.FC<unknown>

export type extendType<T extends extendElementType = extendElementType> = (key: string, v: T) => void

export type NamePath = string | number | Array<string | number>
type NamePathArray = Array<string | number>

const editTypeMap: { [field: string]: any } = {
  input: Input,
  trimInput: TrimInput,
  textArea: Input.TextArea,
  radio: Radio,
  number: InputNumber,
  checkbox: Checkbox,
  select: BaseSelect,
  datePicker: DatePicker,
}

type EditType = ['input', 'trimInput', 'textArea', 'radio', 'number', 'checkbox', 'select', 'datePicker'][number]

interface RenderFormPropsExtend {
  disabled?: boolean
  rowProps?: RowProps
  column?: number
  mode?: 'text' | 'form'
}
export interface RenderFormProps extends FormProps, RenderFormPropsExtend {
  items: RenderFormItemProps<any>[]
}

type formValueType = Record<string, unknown>
type GlobalOptionType = Required<RenderFormPropsExtend> & {
  form?: FormInstance
  formValue?: formValueType
}

type RenderJSXFnType = ((arg?: formValueType, form?: FormInstance) => JSX.Element) | JSX.Element
type ReturnArrayType<T> = T extends Array<infer R> ? R : never
type FormListProps = React.ComponentProps<HookForm['List']>
type Operation = Parameters<FormListProps['children']>['1']
type FieldData = ReturnArrayType<Parameters<FormListProps['children']>['0']>

export interface RenderFormItemProps<ET extends string[] = []>
  extends Omit<FormItemProps, 'render' | 'children' | 'hidden'> {
  type?: EditType | 'group' | ET[number] | 'list' // 表单的类型
  name?: NamePath
  wrapper?: (children: React.ReactChild, operation?: Operation) => JSX.Element // 包裹容器
  listItemWrapper?: (children: React.ReactChild, field: FieldData, operation: Operation) => JSX.Element // list包裹容器
  groups?: RenderFormItemProps<ET>[] // 分组的内容listWrapper
  groupColumn?: number // 分组的内容是否分列，只作用于分组的项目
  useGroupName?: boolean // 是否使用分组的name，默认使用
  hide?: ((arg?: formValueType, form?: FormInstance) => boolean) | boolean // 是否隐藏
  hidden?: ((arg?: formValueType, form?: FormInstance) => boolean) | boolean // 是否隐藏，但依旧保存form数据和校验
  render?: RenderJSXFnType // 自定义渲染的方法
  beforeSlot?: RenderJSXFnType // 前置插槽
  afterSlot?: RenderJSXFnType // 后置插槽
  colProps?: ColProps // Col包裹容器的属性
  itemProps?: {
    // 表单元素的属性
    disabled?: boolean
    options?: SelectOptionType[]
    onChange?: (value?: any) => void
    [field: string]: any
  }
}

export interface RenderFormType {
  (props: RenderFormProps): JSX.Element
  useForm?: () => [FormInstance]
  Item?: Form['Item']
  extendType?: extendType
}

function deepGet(object: formValueType, path: NamePath): React.ReactNode {
  if (!path) {
    return ''
  }
  return (Array.isArray(path) ? path : path.toString().replace(/\[/g, '.').replace(/\]/g, '').split('.')).reduce(
    (o: formValueType, k) => (o || {})[k] as any,
    object,
  )
}

// 代理到EditTable组件上的HookForm组件上的方法
const proxyFormFn = ['useForm', 'Item'] as const

// 默认的分列数量
export const defaultColumn = 3

// 默认的栅格布局
export const defaultGrid = {
  labelCol: {
    sm: { span: 8 },
    lg: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 16 },
    lg: { span: 18 },
  },
}

function renderFormItem(
  renderFormItemProps: RenderFormItemProps,
  option: GlobalOptionType,
  itemIndex: string,
): React.ReactNode {
  const {
    type = 'trimInput',
    render,
    beforeSlot,
    afterSlot,
    hide,
    hidden,
    colProps,
    itemProps = {},
    ...formItemProps
  } = renderFormItemProps

  const listFieldFullName = (formItemProps as any).listFieldFullName
  const cellItemProps = Object.assign({}, itemProps, {
    formitemname: listFieldFullName || formItemProps.name
  })

  if (listFieldFullName) {
    delete (formItemProps as any).listFieldFullName
  }

  if (option.disabled === true) {
    cellItemProps.disabled = option.disabled
  }

  // 暂不支持嵌套
  if (type === 'group' || type === 'list') {
    return null
  }

  let FormItemElement: JSX.Element

  if (hide === true || (typeof hide === 'function' && hide.call(null, cellItemProps, option.form))) {
    return null
  }

  // 当前基于 antd 4.1.5版本，暂未支持hidden属性，因此自模拟该功能
  if (hidden === true || (typeof hidden === 'function' && hidden.call(null, cellItemProps, option.form))) {
    return (
      <HookForm.Item {...formItemProps} key={'item' + itemIndex} noStyle>
        <div />
      </HookForm.Item>
    )
  }

  // 如果有render，render优先
  if (render) {
    if (typeof render === 'function') {
      FormItemElement = render.call(null, cellItemProps, option.form)
    } else {
      FormItemElement = render
    }
  } else {
    // 详情模式，只展示文本
    if (option.mode === 'text') {
      const formItemText = deepGet(option.formValue || {}, formItemProps.name || '')
      FormItemElement = <span>{formItemText}</span>
    } else {
      const CellType: any = editTypeMap[type] || TrimInput
      FormItemElement = <CellType {...cellItemProps} />
    }
  }

  let beforeSlotElement = beforeSlot
  if (typeof beforeSlot === 'function') {
    beforeSlotElement = beforeSlot.call(null, cellItemProps, option.form)
  }

  let afterSlotElement = afterSlot
  if (typeof afterSlot === 'function') {
    afterSlotElement = afterSlot.call(null, cellItemProps, option.form)
  }

  const colKey: string = (formItemProps.name || itemIndex).toString()
  return (
    <Col span={24 / option.column} {...colProps} key={colKey}>
      {beforeSlotElement}
      <HookForm.Item {...formItemProps} key={'item' + colKey}>
        {FormItemElement}
      </HookForm.Item>
      {afterSlotElement}
    </Col>
  )
}

// 格式化为分组的表单数据
function generatorGroupItems<T extends RenderFormItemProps>(items: T[]): Array<T | T[]> {
  const itemGroups: Array<T | T[]> = []
  let groupIndex = 0
  items.forEach((item) => {
    const i = { ...item }
    // 分组表单
    if (i.type === 'group' || i.type === 'list') {
      // 分组的name属性同步关联到子表单
      if (i.type === 'group' && i.name != undefined && i.groups) {
        i.groups = i.groups.map((cItem) => {
          const c = { ...cItem }
          if (c.name != undefined && c.useGroupName !== false) {
            const cName = Array.isArray(c.name) ? c.name : [c.name]
            const pName = Array.isArray(i.name) ? i.name : [i.name]
            c.name = [...pName, ...cName].filter((i) => i != undefined) as NamePath
          }
          return c
        })
      }
      itemGroups.push(i)
      groupIndex = itemGroups.length
    } else {
      if (!itemGroups[groupIndex]) {
        itemGroups[groupIndex] = []
      }
      ; (itemGroups[groupIndex] as RenderFormItemProps[]).push(i)
    }
  })
  return itemGroups
}

function generatorFormItemElement({ rowProps, groupIndex, groupName, groupHidden, groupItems, globalOption, listField }: any) {
  return (
    <Row gutter={[16, 0]} {...rowProps} key={'form-group' + groupIndex} style={groupHidden ? { display: 'none' } : {}}>
      {groupItems.map((i: any, index: number) => {
        const itemProps = Object.assign({}, i)
        if (listField && listField.name != undefined) {
          const listName = Array.isArray(listField.name) ? listField.name : [listField.name]
          const itemName = Array.isArray(itemProps.name) ? itemProps.name : [itemProps.name]
          itemProps.name = [...listName, ...itemName].filter((i) => i != undefined) as NamePath
          if (groupName) {
            itemProps.listFieldFullName = Array.isArray(groupName) ? [...groupName, ...itemProps.name] : [groupName, ...itemProps.name]
          }
          itemProps.fieldKey = listField.fieldKey
          itemProps.key = listField.key
        }
        return renderFormItem(itemProps, globalOption, [groupIndex, index].join('-'))
      })}
    </Row>
  )
}
// 生成分组表单元素
function generatorGroupItemsElement<T extends RenderFormItemProps>(
  itemGroups: Array<T | T[]>,
  option: GlobalOptionType,
): Array<JSX.Element> {
  const { column, rowProps } = option
  const groupElements: Array<JSX.Element> = []
  itemGroups.forEach((group, groupIndex) => {
    const columnNum = Array.isArray(group) ? column : group.groupColumn || column
    const groupItems = Array.isArray(group) ? group : group.groups
    let groupHidden = false

    if (!groupItems || groupItems.length === 0) {
      return null
    }

    // group-hide || group-hidden
    if (!Array.isArray(group)) {
      if (group.hide === true || (typeof group.hide === 'function' && group.hide.call(null, {}, option.form))) {
        return null
      }
      if (group.hidden === true || (typeof group.hidden === 'function' && group.hidden.call(null, {}, option.form))) {
        groupHidden = true
      }
    }

    const globalOption: GlobalOptionType = {
      ...option,
      column: columnNum,
    }
    let formItemElement: JSX.Element = generatorFormItemElement({ rowProps, groupIndex, groupHidden, groupItems, globalOption, listField: null })

    if (!Array.isArray(group)) {
      // list 模式，使用HookForm.List包裹即可
      if (group.type === 'list') {
        group.wrapper = group.wrapper || function (c: any) { return c }
        formItemElement = (
          <HookForm.Item key={'form-list' + group.name} noStyle={!groupHidden} style={groupHidden ? { display: 'none' } : {}}>
            <HookForm.List name={group.name as NamePath}>
              {(fields, operation) => (
                typeof group.wrapper === 'function' && group.wrapper.call(null, (<React.Fragment>
                  {fields.map(field => {
                    const groupIndexKey = groupIndex + field.fieldKey
                    const fieldElement = generatorFormItemElement({ rowProps, groupIndex: groupIndexKey, groupName: group.name, groupHidden, groupItems, globalOption, listField: field })
                    if (typeof group.listItemWrapper === 'function') {
                      const wrapperElement: JSX.Element = group.listItemWrapper.call(null, fieldElement, field, operation)
                      return React.cloneElement(wrapperElement, {
                        key: 'form-list-field-wrap' + groupIndexKey,
                      })
                    } else {
                      return fieldElement
                    }
                  })}
                </React.Fragment>), operation)
              )}
            </HookForm.List>
          </HookForm.Item>
        )
        groupElements.push(formItemElement)
      } else if (typeof group.wrapper === 'function') {
        const wrapperElement: JSX.Element = group.wrapper.call(null, formItemElement)
        const wrapperElementProps = {
          key: 'form-group-wrap' + groupIndex,
          style: { ...wrapperElement.props.style }
        }
        if (groupHidden) {
          wrapperElementProps.style.display = 'none'
        }
        groupElements.push(React.cloneElement(wrapperElement, wrapperElementProps))
      } else {
        groupElements.push(formItemElement)
      }
    } else {
      groupElements.push(formItemElement)
    }
  })
  return groupElements
}

const RenderForm: RenderFormType = (props: RenderFormProps): JSX.Element => {
  const {
    column = defaultColumn,
    disabled = false,
    rowProps = {},
    mode = 'form',
    items,
    children,
    ...formProps
  } = props

  const itemGroups = generatorGroupItems(items)
  const groupElements = generatorGroupItemsElement(itemGroups, {
    disabled,
    column,
    rowProps,
    mode,
    form: formProps.form,
    formValue: formProps.initialValues || {},
  })

  return (
    <HookForm {...defaultGrid} {...formProps} className="render-form">
      {groupElements}
      {children}
    </HookForm>
  )
}

// 代理到RenderForm组件上的HookForm组件上的方法
proxyFormFn.forEach((fnName: typeof proxyFormFn[number]) => {
  RenderForm[fnName] = HookForm[fnName] as any
})

// 扩展RenderForm对应的类型
RenderForm['extendType'] = (key: string, v: extendElementType): void => {
  editTypeMap[key] = v
}

export default RenderForm
