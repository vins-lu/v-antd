import React from 'react';
import { DescriptionsProps } from 'antd/sun/dist/descriptions';
declare type DescItemValueType = React.ReactNode;
export declare type RenderJSXFnType = ((value?: DescItemValueType, data?: Record<string, unknown>) => JSX.Element) | JSX.Element;
export declare type WrapperFnType = (children?: React.ReactChild, groupOption?: Record<string, unknown>, itemValue?: unknown) => JSX.Element;
export interface DescItemType {
    label?: React.ReactNode;
    name?: string | string[];
    value?: DescItemValueType;
    span?: number;
    fullLine?: boolean;
    wrapper?: WrapperFnType;
    groups?: DescItemType[];
    groupOption?: DescriptionsProps;
    useGroupName?: boolean;
    hide?: ((value?: DescItemValueType, data?: Record<string, unknown>) => boolean) | boolean;
    render?: RenderJSXFnType;
}
export interface DescListProps extends DescriptionsProps {
    items?: DescItemType[];
    data?: Record<string, DescItemValueType>;
    groupWrapper?: WrapperFnType;
    hideTitle?: boolean;
}
export declare const defaultColumn = 3;
export declare const CardWrapper: WrapperFnType;
export default function DescList(props: DescListProps): JSX.Element;
export {};
