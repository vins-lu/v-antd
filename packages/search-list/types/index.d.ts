import React from 'react';
import { BaseTableProps, RenderTableProps } from '@vins-rc/render-table';
import { RenderFormProps, RenderFormItemProps } from '@vins-rc/render-form';
import { FormInstance } from 'antd/sun/dist/hook-form';
import '@vins-rc/render-table/dist/css/main.css';
import './style/index.less';
export interface SearchDataType<RT> {
    list: RT[];
    page: number;
    total: number;
}
export declare type SearchSenseType = 'initSearch' | 'search' | 'reset' | 'page' | 'pageSize' | 'refresh' | 'refSearch';
export interface SearchListProps<RT> extends Omit<RenderTableProps<RT>, 'tableOptions'> {
    form?: FormInstance;
    onSearch: (args?: Record<string, unknown>, sense?: SearchSenseType) => SearchDataType<RT> | Promise<SearchDataType<RT>>;
    searchFields?: RenderFormItemProps[];
    searchExtra?: React.ReactNode;
    cacheSearchParams?: boolean;
    syncSearchToUrl?: boolean;
    parseUrlParams?: boolean;
    tableExtra?: React.ReactNode;
    tableColumns: BaseTableProps<RT>['columns'];
    tableOptions?: Partial<RenderTableProps<RT>['tableOptions']>;
    rowKey: BaseTableProps<RT>['rowKey'];
    pageSizeOptions?: string[];
    defaultPageSize?: number;
    formProps?: Omit<RenderFormProps, 'items'>;
    hideExpand?: boolean;
    searchMaxHeight?: number | string;
    groupMaxHeight?: number | string;
}
export interface SearchListRef {
    getSearchData: () => Record<string, unknown>;
    getTableData: () => unknown[];
    setTableData: (dataOrDataFn: unknown[] | ((data: unknown[]) => unknown[])) => void;
    search: (page?: number, pageSize?: number) => void;
    resetForm: () => void;
}
export declare type SearchListRefObject = React.RefObject<SearchListRef>;
export declare const cachePrefix = "search";
declare const _default: React.ForwardRefExoticComponent<SearchListProps<unknown> & React.RefAttributes<SearchListRef>>;
export default _default;
