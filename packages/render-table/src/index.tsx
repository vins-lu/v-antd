import React from 'react'
import TableWrapper, { TableWrapperProps, DefaultColumnType } from './table-wrapper'
import BaseTable, { BaseTableProps, BaseTableColumnType } from './base-table'
import { IntlConsumer, IntlProvider, createIntl, IntlType, zhCNIntl, enUSIntl } from './components/intl'
import './style/index.less'

export interface RenderTableProps<RT> extends Omit<TableWrapperProps, 'children'> {
  tableOptions?: BaseTableProps<RT>
}
function RenderTable<RT>(props: RenderTableProps<RT>): JSX.Element {
  const { tableOptions, ...WrapProps } = props
  return (
    <TableWrapper<BaseTableColumnType<RT>> {...WrapProps}>
      <BaseTable {...tableOptions} name={props.name} />
    </TableWrapper>
  )
}

export {
  BaseTableProps,
  BaseTableColumnType,
  IntlConsumer,
  IntlProvider,
  createIntl,
  IntlType,
  zhCNIntl,
  enUSIntl,
  BaseTable,
  TableWrapper,
  TableWrapperProps,
  DefaultColumnType,
}
export default RenderTable
