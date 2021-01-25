/// <reference types="react" />
import { TableProps, ColumnProps } from 'antd/sun/dist/table';
declare type EditCellTypes = ['number', 'input', 'trimInput', 'textArea', 'radio', 'checkbox', 'select', 'datePicker'][number];
export interface CbFnParamsType {
    value: unknown;
    record: Record<string, unknown>;
    index: number;
    option?: Record<string, unknown>;
    resolve?: (arg?: unknown) => void;
    reject?: (arg?: unknown) => void;
    customArgs?: unknown;
}
export interface ColumnEditOption {
    editable?: (text?: string, recode?: any, index?: number) => boolean | boolean;
    render?: ((arg?: any, option?: any) => JSX.Element) | JSX.Element;
    type?: EditCellTypes;
    onChange?: (value?: CbFnParamsType) => void;
    onSave?: (value?: CbFnParamsType) => void;
    [field: string]: any;
}
export interface EditColumnProps extends ColumnProps<Record<string, any>> {
    editOption?: ColumnEditOption;
}
export interface EditTableProps extends TableProps<Record<string, any>> {
    columns: Array<EditColumnProps>;
    blurSaveAble?: boolean;
}
declare function EditTable(props: EditTableProps): JSX.Element;
export default EditTable;
