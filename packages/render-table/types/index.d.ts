/// <reference types="react" />
import TableWrapper, { TableWrapperProps, DefaultColumnType } from './table-wrapper';
import BaseTable, { BaseTableProps, BaseTableColumnType } from './base-table';
import { IntlConsumer, IntlProvider, createIntl, IntlType, zhCNIntl, enUSIntl } from './components/intl';
import './style/index.less';
export interface RenderTableProps<RT> extends Omit<TableWrapperProps, 'children'> {
    tableOptions?: BaseTableProps<RT>;
}
declare function RenderTable<RT>(props: RenderTableProps<RT>): JSX.Element;
export { BaseTableProps, BaseTableColumnType, IntlConsumer, IntlProvider, createIntl, IntlType, zhCNIntl, enUSIntl, BaseTable, TableWrapper, TableWrapperProps, DefaultColumnType, };
export default RenderTable;
