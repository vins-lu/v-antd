import React from 'react'
import RenderTable from '../../src/index'
import '../../dist/css/main.css'
import { columns, data } from './data'

const TableDemo = (props): JSX.Element => {
  const renderTableOps = {
    dataSource: data,
    columns: columns,
    rowKey: 'name',
  }

  return (
    <>
      <RenderTable name="1" tableOptions={renderTableOps} />
      <RenderTable name="2" tableOptions={renderTableOps} />
    </>
  )
}

export default TableDemo
