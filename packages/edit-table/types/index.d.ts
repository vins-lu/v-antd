import React from 'react';
import { ColumnProps, TableProps } from 'antd/sun/dist/table';
import { FormItemProps, FormInstance } from 'antd/sun/dist/hook-form';
declare type EditCellTypes = ['number', 'input', 'trimInput', 'textArea', 'radio', 'checkbox', 'select', 'datePicker', 'text'][number];
export declare type NamePath = string | Array<string>;
export declare type NamePathArray = Array<string>;
declare type DefaultRecordType = Record<string, unknown>;
export interface ColumnEditOption {
    hide?: ((text?: string, arg?: DefaultRecordType, index?: number) => boolean) | boolean;
    render?: ((option?: EditTableCellProps, cellOption?: ColumnEditOption) => JSX.Element) | JSX.Element;
    rowSpan?: ((text?: string, arg?: DefaultRecordType, index?: number) => number) | number;
    colSpan?: ((text?: string, arg?: DefaultRecordType, index?: number) => number) | number;
    type?: EditCellTypes;
    retain?: boolean;
    formProps?: Omit<FormItemProps, 'itemProps' | 'name' | 'children'> & {
        asWrap?: boolean;
        wrapName?: NamePath;
        name?: NamePath;
    };
    disabled?: boolean;
    onChange?: (value?: unknown) => void;
    [field: string]: unknown;
}
export interface EditColumnProps<RecordType = DefaultRecordType> extends Omit<ColumnProps<RecordType>, 'dataIndex' | 'render' | 'children'> {
    fixed?: 'left' | 'right' | boolean;
    hideColumn?: boolean;
    dataIndex: NamePath;
    editOption?: ColumnEditOption;
    render?: ((text?: string, record?: RecordType, index?: number) => React.ReactChild) | React.ReactChild;
}
export interface EditTableProps<RecordType> extends Omit<TableProps<RecordType>, 'columns'> {
    columns: Array<EditColumnProps<RecordType>>;
    data?: RecordType[];
    editType?: 'table' | 'row' | 'detail';
    form?: FormInstance;
    formDataKey?: string;
    scrollY?: number;
    toggleEditFn?: (record?: RecordType, col?: EditColumnProps<unknown>) => boolean;
}
interface EditTableCellProps<RecordType = DefaultRecordType> extends Pick<ColumnEditOption, 'formProps'>, Pick<EditColumnProps<RecordType>, 'title' | 'editOption'> {
    cellRender: EditColumnProps<RecordType>['render'];
    editType: EditTableProps<RecordType>['editType'];
    editing: boolean;
    index: number;
    dataIndex: NamePathArray;
    formDataKey: string;
    record: RecordType;
    children?: React.ReactChild;
}
export declare const defaultFormDataKey = "formData";
export declare const defaultToggleEditFn: () => boolean;
interface EditTableType {
    <RecordType extends Record<string, unknown> = any>(props: EditTableProps<RecordType>): JSX.Element;
    useForm?: () => [FormInstance];
}
declare const EditTable: EditTableType;
export default EditTable;
