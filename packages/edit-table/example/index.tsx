import React from 'react'
import ReactDOM from 'react-dom'
import EditTable from '../dist/index'
import { EditColumnProps } from '../types/index'
import { Button, message, Popconfirm } from 'antd/sun'
import { useAutoReducer } from '@vins-rc/react-hooks'
import AsyncButton from '@vins-rc/async-button'

const list = [
  { code: '1', name: '1' },
  { code: '2', name: '2' },
  { code: '3', name: '3' },
  { code: '4', name: '4' },
]
const initialState = {
  dataLoading: false, // 数据是否正在加载
  editingKey: '', // 当前编辑的表格行的表示，和rowkey保持一致
  list,
}

function TableRowDemo(): JSX.Element {
  const [state, dispatch] = useAutoReducer(initialState)
  const [form] = EditTable.useForm()
  const rowKey = 'code'

  const ctx = {
    isEditing(record: any, col?: any) {
      if (!!record.isNewField) {
        return true
      }
      if (record[rowKey] === state.editingKey) {
        if (!col) {
          return true
        } else if (col && col.dataIndex !== 'code') {
          return true
        }
      }
    },
    edit(record: any) {
      // 重置表单编辑数据
      form.setFieldsValue({ ...record })
      dispatch({
        type: 'editingKey',
        payload: record[rowKey],
      })
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
      width: 160,
    },
    {
      title: '名称',
      dataIndex: 'name',
      editOption: {
        formProps: {
          rules: [{ required: true, message: '请填写名称' }],
        },
      },
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 280,
      render(text: string, record: any): JSX.Element {
        const editable = ctx.isEditing(record)
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
    <EditTable
      form={form}
      data={state.list}
      rowKey={rowKey}
      toggleEditFn={ctx.isEditing}
      columns={columns}
      loading={state.dataLoading}
    />
  )
}

function TableDemo(): JSX.Element {
  const [state, dispatch] = useAutoReducer(initialState)
  const [form] = EditTable.useForm()
  const rowKey = 'code'

  const columns: EditColumnProps[] = [
    {
      title: '编码',
      dataIndex: 'code',
      editOption: {
        formProps: {
          rules: [{ required: true, message: '请填写编码' }],
        },
      },
      width: 160,
    },
    {
      title: '名称',
      dataIndex: 'name',
      editOption: {
        rowSpan(a, b, i) {
          if (i === 0) {
            return 2
          } else if (i === 1) {
            return 0
          }
        },
        formProps: {
          rules: [{ required: true, message: '请填写名称' }],
        },
      },
      width: 160,
    },

    {
      title: '名称1',
      dataIndex: 'name',
      editOption: {
        rowSpan(a, b, i) {
          if (i === 2) {
            return 2
          } else if (i === 3) {
            return 0
          }
        },
        formProps: {
          rules: [{ required: true, message: '请填写名称' }],
        },
      },
      width: 160,
    },
  ]

  const ctx = {
    isEditing() {
      return true
    },
    async save() {
      try {
        const formData = await form.validateFields()
        console.log('formData', formData)
      } catch (errInfo) {
        const errors = errInfo.errorFields
        if (errors && errors.length > 0) {
          const firstError = errInfo.errorFields[0].errors[0]
          firstError && message.warning(firstError)
        }
      }
    },
  }
  return (
    <div>
      <EditTable
        editType="table"
        form={form}
        data={state.list}
        rowKey={rowKey}
        scrollY={200}
        toggleEditFn={ctx.isEditing}
        columns={columns}
        loading={state.dataLoading}
      />
      <Button onClick={ctx.save}>提交</Button>
    </div>
  )
}

ReactDOM.render(<TableDemo />, document.getElementById('app'))
