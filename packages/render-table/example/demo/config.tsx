import React, { useState } from 'react'
import RenderTable from '../../dist/index'
import { Button } from 'antd/sun'
import '../../dist/css/main.css'
import { columns, data } from './data'

const TableDemo = (props): JSX.Element => {
  const [expand, setExpand] = useState(false)
  const initialState = {
    tableSize: 'small',
    expand: expand,
    hideToolBar: false,
    minHeight: 200,
    // cacheUserHabit: false,
  }
  const renderTableOps = {
    dataSource: data,
    columns: columns,
    rowKey: 'name',
  }

  const onRefresh = (resolve: () => void): void => {
    setTimeout(() => {
      resolve()
    }, 1000)
  }

  const onTableSizeChange = (size) => {
    console.log('onTableSizeChange', size)
  }

  return (
    <div style={{ padding: 20, position: 'relative' }}>
      <Button onClick={() => setExpand((v) => !v)}>setExpand</Button>
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
