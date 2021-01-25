import React from 'react'
import RenderTable, { enUSIntl } from '../../dist/index'
import '../../dist/css/main.css'
import { columns, data } from './data'

const TableDemo = (props): JSX.Element => {
  const renderTableOps = {
    dataSource: data,
    columns: columns,
    rowKey: 'name',
  }

  return <RenderTable locale={enUSIntl} tableOptions={renderTableOps} />
}

export default TableDemo
