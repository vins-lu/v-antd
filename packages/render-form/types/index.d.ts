import React from 'react';
import { HookForm } from 'antd/sun';
import { SelectOptionType } from '@vins-rc/base-select';
import Form, { FormProps, FormItemProps, FormInstance } from 'antd/sun/dist/hook-form';
import { RowProps } from 'antd/sun/dist/row';
import { ColProps } from 'antd/sun/dist/col';
declare type extendElementType = (arg?: unknown) => JSX.Element | React.Component | React.FC<unknown>;
export declare type extendType<T extends extendElementType = extendElementType> = (key: string, v: T) => void;
export declare type NamePath = string | number | Array<string | number>;
declare type EditType = ['input', 'trimInput', 'textArea', 'radio', 'number', 'checkbox', 'select', 'datePicker'][number];
interface RenderFormPropsExtend {
    disabled?: boolean;
    rowProps?: RowProps;
    column?: number;
    mode?: 'text' | 'form';
}
export interface RenderFormProps extends FormProps, RenderFormPropsExtend {
    items: RenderFormItemProps<any>[];
}
declare type formValueType = Record<string, unknown>;
declare type RenderJSXFnType = ((arg?: formValueType, form?: FormInstance) => JSX.Element) | JSX.Element;
declare type ReturnArrayType<T> = T extends Array<infer R> ? R : never;
declare type FormListProps = React.ComponentProps<HookForm['List']>;
declare type Operation = Parameters<FormListProps['children']>['1'];
declare type FieldData = ReturnArrayType<Parameters<FormListProps['children']>['0']>;
export interface RenderFormItemProps<ET extends string[] = []> extends Omit<FormItemProps, 'render' | 'children' | 'hidden'> {
    type?: EditType | 'group' | ET[number] | 'list';
    name?: NamePath;
    wrapper?: (children: React.ReactChild, operation?: Operation) => JSX.Element;
    listItemWrapper?: (children: React.ReactChild, field: FieldData, operation: Operation) => JSX.Element;
    groups?: RenderFormItemProps<ET>[];
    groupColumn?: number;
    useGroupName?: boolean;
    hide?: ((arg?: formValueType, form?: FormInstance) => boolean) | boolean;
    hidden?: ((arg?: formValueType, form?: FormInstance) => boolean) | boolean;
    render?: RenderJSXFnType;
    beforeSlot?: RenderJSXFnType;
    afterSlot?: RenderJSXFnType;
    colProps?: ColProps;
    itemProps?: {
        disabled?: boolean;
        options?: SelectOptionType[];
        onChange?: (value?: any) => void;
        [field: string]: any;
    };
}
export interface RenderFormType {
    (props: RenderFormProps): JSX.Element;
    useForm?: () => [FormInstance];
    Item?: Form['Item'];
    extendType?: extendType;
}
export declare const defaultColumn = 3;
export declare const defaultGrid: {
    labelCol: {
        sm: {
            span: number;
        };
        lg: {
            span: number;
        };
    };
    wrapperCol: {
        sm: {
            span: number;
        };
        lg: {
            span: number;
        };
    };
};
declare const RenderForm: RenderFormType;
export default RenderForm;
