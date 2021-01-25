import React from 'react';
import { SelectProps } from 'antd/sun/dist/select';
export declare type OptionValueType = string | number;
export interface SelectOptionType {
    key?: string;
    value?: OptionValueType;
    label?: string;
    disabled?: boolean;
    children?: React.ReactChild;
    [key: string]: any;
}
export interface BaseSelectProps<VT> extends Omit<SelectProps<VT>, 'options'> {
    optionLabelAlias?: string;
    optionValueAlias?: string;
    options: SelectOptionType[];
}
declare function BaseSelect<VT extends OptionValueType = OptionValueType>(props: BaseSelectProps<VT>): JSX.Element;
export default BaseSelect;
