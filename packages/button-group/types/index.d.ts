import React from 'react';
import { ButtonProps } from 'antd/sun/dist/button';
import { PopconfirmProps } from 'antd/sun/dist/popconfirm';
export interface ButtonItemProps extends ButtonProps {
    text?: React.ReactNode;
    key: string;
    hidden?: boolean;
    disabled?: boolean;
    confirm?: boolean;
    confirmTitle?: PopconfirmProps['title'];
    confirmProps?: Partial<PopconfirmProps>;
}
export interface ButtonGroupProps {
    max?: number;
    type?: 'link' | 'button';
    items: ButtonItemProps[];
    onClick?: (key?: string) => void;
}
declare function ButtonGroup(props: ButtonGroupProps): JSX.Element;
export default ButtonGroup;
