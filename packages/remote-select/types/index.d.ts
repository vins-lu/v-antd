import React from 'react';
import { SelectValue, SelectProps } from 'antd/sun/dist/Select';
interface SelectOptionType {
    value: string | number;
    label?: string;
    disabled?: boolean;
    children?: React.ReactChild;
    [key: string]: unknown;
}
export declare const cachePrefix = "remote-select";
export interface RemoteSelectProps<VT> extends SelectProps<VT> {
    name?: string;
    optionsClear?: boolean;
    initOptions?: SelectOptionType[];
    waitTime?: number;
    fetchFn(query: string): Promise<unknown>;
    cache?: boolean;
}
declare function RemoteSelect<VT extends SelectValue = SelectValue>(props: RemoteSelectProps<VT>): JSX.Element;
export default RemoteSelect;
