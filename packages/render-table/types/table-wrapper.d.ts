import React from 'react';
import { ColumnType } from 'antd/sun/dist/table';
import { IntlType } from './components/intl';
import { DensitySize } from './components/density';
import { PageHeaderProps } from 'antd/sun/dist/page-header';
import { ToolBarProps } from './components/tool-bar';
export declare type extendColumnType = {
    fixed?: 'left' | 'right';
    fixedDisable?: boolean;
    dataIndexFlat?: string;
    hideColumn?: boolean;
    hideColumnDisable?: boolean;
    minWidth?: number;
    maxWidth?: number;
    resizable?: boolean;
};
export declare type DefaultColumnType<RT = unknown> = ColumnType<RT> & extendColumnType;
export declare type cacheOptionType = 'columnOrder' | 'columnHide' | 'columnFixed' | 'density';
export interface TableWrapperProps extends Partial<Pick<PageHeaderProps, 'title' | 'extra'>> {
    name?: string;
    locale?: IntlType;
    tableSize?: DensitySize;
    expand?: boolean;
    onRefresh?: (fn?: () => void) => void;
    onTableSizeChange?: (size?: DensitySize) => void;
    hideToolBar?: boolean;
    toolBarOptions?: ToolBarProps;
    minHeight?: number;
    maxHeight?: number;
    cacheUserHabit?: boolean;
    cacheOptions?: cacheOptionType[];
    children: React.ReactElement;
}
declare function TableWrapper<CT>(props: TableWrapperProps): JSX.Element;
export default TableWrapper;
