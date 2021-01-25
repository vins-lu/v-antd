/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer, Dispatch, RefObject, useRef, useEffect, useMemo, useCallback } from 'react'
import { Table, Checkbox, Input, InputNumber, Radio } from 'antd/sun'
import { LoadingOutlined } from '@ant-design/icons'
import { TableProps, ColumnProps } from 'antd/sun/dist/table'
import TrimInput from '@vins-rc/trim-input'
import BaseSelect from '@vins-rc/base-select'
import DatePicker from '@vins-rc/date-picker'

type EventType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any

type EditCellTypes = ['number', 'input', 'trimInput', 'textArea', 'radio', 'checkbox', 'select', 'datePicker'][number]
// 回调函数的参数类型
export interface CbFnParamsType {
  value: unknown
  record: Record<string, unknown>
  index: number
  option?: Record<string, unknown>
  resolve?: (arg?: unknown) => void
  reject?: (arg?: unknown) => void
  customArgs?: unknown
}

export interface ColumnEditOption {
  editable?: (text?: string, recode?: any, index?: number) => boolean | boolean // 可以编辑的判断条件
  render?: ((arg?: any, option?: any) => JSX.Element) | JSX.Element // 自定义渲染的方法
  type?: EditCellTypes // 可编辑的单元格的类型
  onChange?: (value?: CbFnParamsType) => void
  onSave?: (value?: CbFnParamsType) => void
  // 以下是表单元素的props
  [field: string]: any
}

export interface EditColumnProps extends ColumnProps<Record<string, any>> {
  editOption?: ColumnEditOption
}

export interface EditTableProps extends TableProps<Record<string, any>> {
  columns: Array<EditColumnProps>
  blurSaveAble?: boolean
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
}

function getDefaultValuePropName(type: string): 'defaultChecked' | 'defaultValue' {
  return ['switch', 'radio', 'checkbox'].includes(type) ? 'defaultChecked' : 'defaultValue'
}

interface EditTableCellState {
  editing: boolean
  submitting: boolean
}

type ActionType = keyof EditTableCellState | 'dispatchMulti'

type EditTableCellAction = { type: ActionType; payload: any }

// 单元格内部的状态处理函数
function editTableCellReducer<S extends EditTableCellState = EditTableCellState>(
  state: S,
  action: EditTableCellAction,
): S {
  if (action.type === 'dispatchMulti') {
    return { ...state, ...action.payload }
  } else {
    const type: keyof EditTableCellState = action.type
    if (state[type] !== action.payload) {
      return { ...state, [type]: action.payload }
    } else {
      return state
    }
  }
}

// 获取编辑表格的列中定义的最小宽度，只计算数字，百分比会出现问题
function getColumnsWidth(columnList: Array<EditColumnProps>): number {
  return columnList.reduce((a: number, b) => {
    a = a + ((b.width as number) * 1 || 0)
    return a
  }, 0)
}

// 生成表格渲染列
function generatorMergedColumns(columnList: EditColumnProps[]): Array<any> {
  return columnList.map((col: EditColumnProps) => {
    const { editOption, ...restCol } = col
    if (!editOption) {
      return col
    }

    return {
      ...restCol,
      onCell: (record: object, index: number): object => {
        return {
          record,
          index,
          dataIndex: col.dataIndex,
          title: col.title,
          editOption,
        }
      },
    }
  })
}

// 渲染可编辑的单元格内容
function renderEditCell(
  option: any,
  cellRef: RefObject<any>,
  dispatch: Dispatch<EditTableCellAction>,
): JSX.Element | null {
  if (!option.editOption) {
    return option.children
  }
  const { type, editable, render, onSave, onChange, ...cellProps } = option.editOption

  let editCellType: ColumnEditOption['type'] = type

  const valuePropName = getDefaultValuePropName(type)
  cellProps[valuePropName] = option.record[option.dataIndex]

  const ctx = {
    blurHandle(e: EventType): void {
      const v = e.target ? e.target.value : e
      // 未改变值，直接取消编辑状态
      if (v === cellProps[valuePropName] || (editCellType === 'number' && v === cellProps[valuePropName].toString())) {
        dispatch({
          type: 'dispatchMulti',
          payload: {
            editing: false,
            submitting: false,
          },
        })
      } else {
        ctx.emitSave(v)
      }
    },
    saveHandle(e: EventType): void {
      const v = e.target ? e.target.value : e
      ctx.emitSave(v)
    },
    emitSave(val: any): void {
      if (typeof onSave === 'function') {
        // 设置不可编辑状态
        dispatch({
          type: 'submitting',
          payload: true,
        })
        new Promise((resolve, reject) => {
          onSave({
            value: val,
            record: option.record,
            index: option.index,
            option,
            resolve,
            reject,
          })
        })
          .then(() => {
            dispatch({
              type: 'dispatchMulti',
              payload: {
                editing: false,
                submitting: false,
              },
            })
          })
          .catch(() => {
            dispatch({
              type: 'dispatchMulti',
              payload: {
                editing: true,
                submitting: false,
              },
            })
            if (typeof cellRef.current.focus === 'function') {
              cellRef.current.focus()
            }
          })
      } else {
        dispatch({
          type: 'editing',
          payload: false,
        })
      }
    },
  }

  if (onChange && typeof onChange === 'function') {
    cellProps.onChange = (e: EventType, customArgs?: unknown): void => {
      const value = e.target ? e.target.value : e
      onChange({
        value,
        record: option.record,
        index: option.index,
        option,
        resolve() {
          dispatch({
            type: 'editing',
            payload: false,
          })
        },
        reject() {
          dispatch({
            type: 'editing',
            payload: true,
          })
        },
        customArgs,
      })
    }
  }

  const inputCellProps: Record<string, any> = {
    ref: cellRef,
  }

  if (['datePicker', 'select'].includes(editCellType)) {
    delete inputCellProps.ref
  }

  if (option.blurSaveAble !== false) {
    inputCellProps.onBlur = ctx.blurHandle
  }

  // 自定义渲染
  if (render) {
    if (typeof render === 'function') {
      delete cellProps.suffix
      return render.call(
        null,
        {
          ...inputCellProps,
          ...cellProps,
          ref: null,
        },
        option,
      )
    }
    return render
  }

  if (!editCellType) {
    editCellType = 'trimInput'
  }

  // 输入框，保存时添加loading的标示
  if (editCellType === 'input') {
    inputCellProps.onPressEnter = ctx.saveHandle
    cellProps.suffix = option.editOption.disabled ? <LoadingOutlined style={{ color: '#1890ff' }} spin /> : <span />
  }

  const CellType: any = editTypeMap[editCellType] || TrimInput

  return <CellType {...inputCellProps} {...cellProps} />
}

// 覆盖可编辑单元格的内容
const EditTableCell = (cellProps: Record<string, any>): JSX.Element => {
  const [state, dispatch] = useReducer(editTableCellReducer, {
    editing: false,
    submitting: false,
  })

  const cellRef = useRef({ focus: (): void => void 0 })

  useEffect(() => {
    if (state.editing) {
      if (typeof cellRef.current.focus === 'function') {
        cellRef.current.focus()
      }
    }
  }, [state.editing])

  const { title, record, index, editOption, dataIndex, children, ...restProps } = cellProps

  if (cellProps.editOption) {
    cellProps.editOption.disabled = state.submitting
  }

  let canEdit = true
  if (editOption && editOption.editable !== undefined) {
    if (typeof editOption.editable === 'boolean') {
      canEdit = editOption.editable
    }
    if (typeof editOption.editable === 'function') {
      canEdit = editOption.editable(record[dataIndex], record, index)
    }
  }

  const toggleEdit = useCallback(() => {
    canEdit &&
      dispatch({
        type: 'editing',
        payload: true,
      })
  }, [dispatch, canEdit])

  return (
    <td {...restProps}>
      {cellProps.editOption ? (
        state.editing && canEdit ? (
          renderEditCell(cellProps, cellRef, dispatch)
        ) : (
          <div className={canEdit ? 'editable-cell' : 'not-edit-cell'} onClick={toggleEdit}>
            {children}
          </div>
        )
      ) : (
        children
      )}
    </td>
  )
}

function EditTable(props: EditTableProps): JSX.Element {
  const { columns, blurSaveAble, pagination = false, ...tableProps } = props
  const editColumns = useMemo(() => {
    return generatorMergedColumns(columns)
  }, [columns])
  const scrollX = useMemo(() => {
    return getColumnsWidth(columns)
  }, [columns])
  return (
    <>
      <style>{`
        .editable-cell,
        .not-edit-cell {
          display: block;
          min-height: 32px;
          padding: 4px 11px;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .not-edit-cell {
          cursor: auto;
        }

        .editable-cell:hover {
          border: 1px solid #d9d9d9;
          border-radius: 4px;
        }
        .ant-select,
        .ant-input-number {
          width: 100%;
        }
      `}</style>
      <Table
        bordered
        components={{
          body: {
            cell: EditTableCell,
          },
        }}
        pagination={pagination}
        columns={editColumns}
        scroll={{ x: scrollX }}
        {...tableProps}
      />
    </>
  )
}

export default EditTable
