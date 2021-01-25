import React from 'react'
import RenderTable from '../../dist/index'
import '../../dist/css/main.css'
import { columns, data } from './data'

const TableDemo = (props): JSX.Element => {
  const renderTableOps = {
    dataSource: data,
    columns: columns,
    rowKey: 'name',
    resizable: true,
    cacheColumnSize: true,
  }

  return <RenderTable tableOptions={renderTableOps} />
}

export default TableDemo
