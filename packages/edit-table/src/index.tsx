import React, { useMemo } from 'react'
import { ColumnProps, TableProps } from 'antd/sun/dist/table'
import { FormProps, FormItemProps, FormInstance } from 'antd/sun/dist/hook-form'
import { Table, HookForm, Checkbox, Input, InputNumber, Radio } from 'antd/sun'
import TrimInput from '@vins-rc/trim-input'
import BaseSelect from '@vins-rc/base-select'
import DatePicker from '@vins-rc/date-picker'

type EditCellTypes = [
  'number',
  'input',
  'trimInput',
  'textArea',
  'radio',
  'checkbox',
  'select',
  'datePicker',
  'text',
][number]

export type NamePath = string | Array<string>
export type NamePathArray = Array<string>
type DefaultRecordType = Record<string, unknown>

export interface ColumnEditOption {
  hide?: ((text?: string, arg?: DefaultRecordType, index?: number) => boolean) | boolean // 是否隐藏
  render?: ((option?: EditTableCellProps, cellOption?: ColumnEditOption) => JSX.Element) | JSX.Element // 自定义渲染的方法
  rowSpan?: ((text?: string, arg?: DefaultRecordType, index?: number) => number) | number // 单元格合并，放在EditOption字段中是为了可以拿到数据
  colSpan?: ((text?: string, arg?: DefaultRecordType, index?: number) => number) | number // 单元格合并，放在EditOption字段中是为了可以拿到数据
  type?: EditCellTypes // 可编辑的单元格的类型
  retain?: boolean // 不可编辑的时候，是否保留表单的disabled的形式
  formProps?: Omit<FormItemProps, 'itemProps' | 'name' | 'children'> & {
    asWrap?: boolean // 是否作为包裹容器
    wrapName?: NamePath
    name?: NamePath
  } // form.item组件上对应的props
  // 以下都是可编辑单元格props
  disabled?: boolean
  onChange?: (value?: unknown) => void
  [field: string]: unknown
}

// 可编辑列的属性
export interface EditColumnProps<RecordType = DefaultRecordType>
  extends Omit<ColumnProps<RecordType>, 'dataIndex' | 'render' | 'children'> {
  fixed?: 'left' | 'right' | boolean
  hideColumn?: boolean
  dataIndex: NamePath
  editOption?: ColumnEditOption
  render?: ((text?: string, record?: RecordType, index?: number) => React.ReactChild) | React.ReactChild // 自定义渲染的方法
}

// 可编辑表格的属性
export interface EditTableProps<RecordType> extends Omit<TableProps<RecordType>, 'columns'> {
  columns: Array<EditColumnProps<RecordType>>
  data?: RecordType[]
  editType?: 'table' | 'row' | 'detail'
  form?: FormInstance
  formDataKey?: string
  scrollY?: number
  toggleEditFn?: (record?: RecordType, col?: EditColumnProps<unknown>) => boolean
}

type GeneratorColumnsOptionsType<RecordType> = Pick<
  EditTableProps<RecordType>,
  'editType' | 'formDataKey' | 'toggleEditFn'
>

interface EditTableCellProps<RecordType = DefaultRecordType>
  extends Pick<ColumnEditOption, 'formProps'>,
    Pick<EditColumnProps<RecordType>, 'title' | 'editOption'> {
  cellRender: EditColumnProps<RecordType>['render']
  editType: EditTableProps<RecordType>['editType']
  editing: boolean
  index: number
  dataIndex: NamePathArray
  formDataKey: string
  record: RecordType
  children?: React.ReactChild
}

// 表单元素类型和组件的映射
const editTypeMap = {
  input: Input,
  trimInput: TrimInput,
  textArea: Input.TextArea,
  radio: Radio,
  number: InputNumber,
  checkbox: Checkbox,
  select: BaseSelect,
  datePicker: DatePicker,
} as const

// 代理到EditTable组件上的HookForm组件上的方法
const proxyFormFn = ['useForm'] as const

// 整体表格编辑的时候，需要数据包裹，这样才会生成数组形式，FormDataKey表示数据包裹的key
export const defaultFormDataKey = 'formData'

export const defaultToggleEditFn = (): boolean => true

// 获取不同的组件对应的form.item中的value值
function getValuePropName(type: string) {
  return ['switch', 'radio', 'checkbox'].includes(type) ? 'checked' : 'value'
}

// 格式化dataIndex为数组格式
function formatDataIndex(dataIndex: NamePath): NamePathArray {
  return Array.isArray(dataIndex) ? dataIndex : [dataIndex]
}

function deepGet(object: DefaultRecordType, path: NamePath) {
  return (Array.isArray(path) ? path : path.replace(/\[/g, '.').replace(/\]/g, '').split('.')).reduce(
    (o, k) => (o || {})[k],
    object,
  )
}

// 格式化可编辑表格的数据，添加自定义的索引前缀
function formatTableWithCustomIndex<RecordType>(list: RecordType[], childrenColumnName = 'children') {
  const newList = [...list]
  function walkList(arr: RecordType[], parentIndex: number[] = []) {
    arr.forEach((item: any, index) => {
      item.prefixIndex = [...parentIndex, index]
      if (item[childrenColumnName] && item[childrenColumnName].length > 0) {
        walkList(item[childrenColumnName], [...item.prefixIndex, childrenColumnName])
      }
    })
  }
  walkList(list)
  return newList
}

// 获取编辑表格的列中定义的最小宽度，只计算数字，百分比会出现问题
function getColumnsWidth<RecordType>(columnList: Array<EditColumnProps<RecordType>>) {
  return columnList.reduce((a: number, b) => {
    a = a + ((b.width as number) * 1 || 0)
    return a
  }, 0)
}

// 生成表格渲染列
function generatorMergedColumns<RecordType>(
  columnList: EditColumnProps<RecordType>[],
  options: GeneratorColumnsOptionsType<RecordType>,
) {
  const { editType, formDataKey, toggleEditFn } = options
  return columnList
    .map((col) => {
      if (col.hideColumn) {
        return false
      }
      const { editOption, ...restCol } = col
      if (!editOption) {
        return col
      }

      // 格式化为namePath[]数组格式
      const dataIndex = formatDataIndex(col.dataIndex)

      return {
        ...restCol,
        onCell: (record: RecordType, index: number): EditTableCellProps<RecordType> => {
          return {
            title: col.title,
            cellRender: col.render,
            editType,
            editing: toggleEditFn(record, col),
            editOption,
            index,
            dataIndex,
            formDataKey,
            formProps: {
              name: editType === 'row' ? dataIndex : ([formDataKey, index, ...dataIndex] as NamePathArray),
              valuePropName: getValuePropName(editOption.type),
              ...editOption.formProps,
            },
            record,
          }
        },
      }
    })
    .filter((i) => !!i)
}

// 调用表格列定义的元素渲染方法
function callCellRender(option: EditTableCellProps): React.ReactChild {
  const cellRender = option.cellRender
  if (typeof cellRender === 'function') {
    const text = deepGet(option.record, option.dataIndex)
    return cellRender.call(null, text, option.record, option.index)
  } else {
    return cellRender
  }
}

// 渲染可编辑的单元格内容
function renderEditCell(option: EditTableCellProps): React.ReactChild {
  if (!option.editOption) {
    if (option.cellRender) {
      return callCellRender(option)
    }
    return option.children
  }
  const { type, retain, formProps, render, rowSpan, colSpan, ...restProps } = option.editOption
  const cellProps = Object.assign({}, restProps)
  // 文本形式，保留表单的数据
  if (type === 'text') {
    const text = deepGet(option.record, option.dataIndex)
    if (option.cellRender) {
      return callCellRender(option)
    } else {
      return <span>{text}</span>
    }
  }

  // 详情模式，未配置编辑状态的置为不可编辑
  if (option.editType === 'detail') {
    if (cellProps.disabled === undefined) {
      cellProps.disabled = true
    }
  }

  if (render) {
    if (typeof render === 'function') {
      return render.call(null, option, cellProps)
    }
    return render
  }
  const CellType: any = editTypeMap[type] || TrimInput
  return <CellType {...cellProps} />
}

// 渲染不可编辑的单元格的内容
function renderRetainCell(option: EditTableCellProps) {
  if (!option.editOption) {
    if (option.cellRender) {
      return callCellRender(option)
    }
    return option.children
  }
  const { type, retain, render } = option.editOption

  if (retain && type !== 'text') {
    if (render) {
      if (typeof render === 'function') {
        return render.call(null, option)
      }
      return render
    }
    const valueProp = getValuePropName(type)
    const cellProps = {
      disabled: true,
      [valueProp]: deepGet(option.record, option.dataIndex),
    }
    const CellType: any = editTypeMap[type] || TrimInput
    return <CellType {...cellProps} />
  } else {
    return option.children
  }
}

// 覆盖可编辑单元格的内容
function EditTableCell(cellProps: EditTableCellProps): React.ReactChild {
  const {
    title,
    editing,
    editType,
    editOption,
    formDataKey,
    index,
    cellRender,
    dataIndex,
    record,
    children,
    formProps = {} as ColumnEditOption['formProps'],
    ...restProps
  } = cellProps
  const tdProps: {
    rowSpan?: number
    colSpan?: number
  } = restProps

  if ((editType === 'table' || editType === 'detail') && record.prefixIndex) {
    formProps.name = [formDataKey, ...(record.prefixIndex as NamePathArray), ...dataIndex]
  }

  if (editOption) {
    const text = deepGet(record, dataIndex)
    let rowSpan = editOption.rowSpan
    if (rowSpan !== undefined) {
      if (typeof rowSpan === 'function') {
        rowSpan = rowSpan.call(null, text, record, index)
      }
      if (rowSpan === 0) {
        return null
      }
      tdProps.rowSpan = rowSpan as number
    }

    let colSpan = editOption.colSpan
    if (colSpan !== undefined) {
      if (typeof colSpan === 'function') {
        colSpan = colSpan.call(null, text, record, index)
      }
      if (colSpan === 0) {
        return null
      }
      tdProps.colSpan = colSpan as number
    }

    const hide = editOption.hide
    if (hide === true || (typeof hide === 'function' && hide.call(null, text, record, index))) {
      return <td {...tdProps} />
    }
  }

  if (formProps.asWrap) {
    formProps.wrapName = formProps.name
    delete formProps.name
    delete formProps.asWrap
    formProps.noStyle = true
  }
  return (
    <td {...tdProps}>
      {editing ? (
        <HookForm.Item
          style={{
            margin: 0,
          }}
          {...formProps}
        >
          {renderEditCell(cellProps)}
        </HookForm.Item>
      ) : (
        renderRetainCell(cellProps)
      )}
    </td>
  )
}

interface EditTableType {
  <RecordType extends Record<string, unknown> = any>(props: EditTableProps<RecordType>): JSX.Element
  useForm?: () => [FormInstance]
}

const EditTable: EditTableType = function <RecordType>(props: EditTableProps<RecordType>): JSX.Element {
  const {
    columns,
    data,
    dataSource,
    editType = 'row',
    formDataKey = defaultFormDataKey,
    form,
    pagination = false,
    rowKey,
    scrollY,
    toggleEditFn = defaultToggleEditFn,
    ...tableProps
  } = props
  const editColumns = useMemo(() => {
    return generatorMergedColumns<RecordType>(columns, {
      editType,
      formDataKey,
      toggleEditFn,
    })
  }, [columns])
  const scrollX = useMemo(() => {
    return getColumnsWidth(columns)
  }, [columns])

  const formProps: FormProps = {
    form,
    component: false,
  }

  let tableData = data || dataSource || []

  if (editType === 'table' || editType === 'detail') {
    const childrenColumnName =
      tableProps && tableProps.expandable && tableProps.expandable.childrenColumnName
        ? tableProps.expandable.childrenColumnName
        : 'children'
    tableData = formatTableWithCustomIndex<RecordType>(tableData, childrenColumnName)
    formProps.initialValues = { [formDataKey]: tableData }
  }

  return (
    <HookForm {...formProps}>
      <Table
        bordered
        rowKey={rowKey}
        components={{
          body: {
            cell: EditTableCell,
          },
        }}
        pagination={pagination}
        columns={editColumns}
        dataSource={tableData}
        rowClassName="editable-row"
        {...tableProps}
        scroll={{ x: scrollX, y: scrollY }}
      />
    </HookForm>
  )
}

// 代理到EditTable组件上的HookForm组件上的方法
proxyFormFn.forEach((fnName: typeof proxyFormFn[number]) => {
  EditTable[fnName] = HookForm[fnName]
})

export default EditTable
