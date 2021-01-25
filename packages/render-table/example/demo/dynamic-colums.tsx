import React, { useState } from 'react'
import RenderTable from '../../dist/index'
import { Button } from 'antd/sun'
import '../../dist/css/main.css'
import { columns, data } from './data'

const TableDemo = (props): JSX.Element => {
  const [columns1, setColumns] = useState(columns)
  const initialState = {
    tableSize: 'small',
    expand: false,
    hideToolBar: false,
    minHeight: 200,
    // cacheUserHabit: false,
  }
  const renderTableOps = {
    dataSource: data,
    columns: columns1,
    rowKey: 'name',
  }

  const onRefresh = (resolve: () => void): void => {
    setTimeout(() => {
      resolve()
    }, 1000)
  }

  const addColumn = () => {
    setColumns((c) => {
      return [...c, c[0]]
    })
  }

  const onTableSizeChange = (size) => {
    console.log('onTableSizeChange', size)
  }

  return (
    <div style={{ padding: 20, position: 'relative' }}>
      <Button onClick={addColumn}>addColumn</Button>
      <RenderTable
        {...initialState}
        tableSize="middle"
        onRefresh={onRefresh}
        tableOptions={renderTableOps}
        onTableSizeChange={onTableSizeChange}
        cacheOptions={['columnFixed', 'density']}
        extra={
          <Button key="button" type="primary" size="small">
            new
          </Button>
        }
      />
    </div>
  )
}

export default TableDemo
