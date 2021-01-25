import React from 'react'
import { TableWrapper } from '../../src/index'
import EditTable, { EditColumnProps } from '@vins-rc/edit-table'
import '../../dist/css/main.css'
import { Button, message, Popconfirm } from 'antd/sun'
import { useAutoReducer } from '@vins-rc/react-hooks'
import AsyncButton from '@vins-rc/async-button'
import BaseSelect from '@vins-rc/base-select'

const list = Array.from({ length: 5 }).map((_, i) => ({ code: i, number: i, enum: i % 2 }))
const enumOptions = [
  { label: '男', value: 0 },
  { label: '女', value: 1 },
]
const initialState = {
  editingKey: 0, // 当前编辑的表格行的表示，和rowkey保持一致即可
  list,
}

const TableDemo = (props): JSX.Element => {
  const [state, dispatch] = useAutoReducer(initialState)
  const [form] = EditTable.useForm()
  const rowKey = 'code'

  const ctx = {
    toggleEditRow(record: any, col?: any) {
      console.log('record', record, state.editingKey)
      if (record[rowKey] === state.editingKey) {
        if (!col) {
          return true
        } else if (col && col.dataIndex !== 'code') {
          // dataIndex为code的不允许编辑
          return true
        }
      }
    },
    edit(record: any) {
      dispatch({
        type: 'editingKey',
        payload: record[rowKey],
      })
      // 重置表单编辑数据
      form.setFieldsValue({ ...record })
    },
    cancel() {
      dispatch({
        type: 'editingKey',
        payload: '',
      })
    },
    async save(record: any, resolve: () => void) {
      try {
        const formData = await form.validateFields()
        const newData = [...state.list]
        const index = newData.findIndex((item) => record.code === item.code)
        const rowData = Object.assign({}, newData[index], formData)
        newData.splice(index, 1, rowData)
        dispatch({
          type: 'dispatchMulti',
          payload: {
            list: newData,
            editingKey: '',
          },
        })
        resolve()
      } catch (errInfo) {
        const errors = errInfo.errorFields
        if (errors && errors.length > 0) {
          const firstError = errInfo.errorFields[0].errors[0]
          firstError && message.warning(firstError)
        }
        resolve()
      }
    },
  }

  const columns: EditColumnProps[] = [
    {
      title: '编码',
      dataIndex: 'code',
      editOption: {
        formProps: {
          rules: [{ required: true, message: '请填写编码' }],
        },
      },
      width: 120,
    },
    {
      title: '数量',
      dataIndex: 'number',
      editOption: {
        formProps: {
          rules: [{ required: true, message: '请填写名称' }],
        },
      },
      width: 120,
    },
    {
      title: '枚举',
      dataIndex: 'enum',
      editOption: {
        render(option, cellOption) {
          return <BaseSelect options={enumOptions} />
        },
      },
      render(text, option, index) {
        return (enumOptions.find((i: any) => i.value === text) || {}).label
      },
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 280,
      render(text: string, record: any): JSX.Element {
        const editable = ctx.toggleEditRow(record)
        return (
          <div>
            {editable ? (
              <>
                <AsyncButton type="primary" size="small" onClick={(resolve) => ctx.save(record, resolve)}>
                  提交
                </AsyncButton>
                <Popconfirm title="取消会丢失当前数据，确认取消?" onConfirm={ctx.cancel}>
                  <Button style={{ marginLeft: '12px' }} size="small">
                    取消
                  </Button>
                </Popconfirm>
              </>
            ) : (
              <Button type="primary" size="small" onClick={() => ctx.edit(record)}>
                编辑
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <TableWrapper name="edit">
      <EditTable form={form} data={state.list} rowKey={rowKey} toggleEditFn={ctx.toggleEditRow} columns={columns} />
    </TableWrapper>
  )
}

export default TableDemo
