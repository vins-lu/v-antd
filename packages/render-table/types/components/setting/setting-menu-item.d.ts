/// <reference types="react" />
import { ColumnType } from 'antd/sun/dist/table';
import { extendColumnType } from '../../table-wrapper';
export declare type columnFixedType = extendColumnType['fixed'];
interface SettingMenuItemProps<CT extends ColumnType<unknown> = ColumnType<unknown>> {
    columns?: CT[];
    fixed?: columnFixedType;
    onMenuFixedChange?: (dataIndexFlat: extendColumnType['dataIndexFlat'], curFixed?: columnFixedType) => void;
}
export default function SettingMenuItem<CT>(props: SettingMenuItemProps<CT>): JSX.Element;
export {};
