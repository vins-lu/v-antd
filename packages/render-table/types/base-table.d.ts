/// <reference types="react" />
import { TableProps } from 'antd/sun/dist/table';
import { DefaultColumnType } from './table-wrapper';
export declare type BaseTableColumnType<T> = DefaultColumnType<T>;
export interface BaseTableProps<RT> extends Omit<TableProps<RT>, 'columns' | 'scroll'> {
    name?: string;
    scrollY?: number;
    resizable?: boolean;
    resizeMinWidth?: number;
    resizeMaxWidth?: number;
    cacheColumnSize?: boolean;
    columns: Array<BaseTableColumnType<RT>>;
    pageOptions?: {
        total: number;
        pageSize?: number;
        page?: number;
        pageSizeOptions?: string[];
        onPageSizeChange?: (current?: number, pageSize?: number) => void;
        onPageChange?: (page?: number) => void;
    };
}
declare function BaseTable<RT>(props: BaseTableProps<RT>): JSX.Element;
export default BaseTable;
