/// <reference types="react" />
import { ButtonProps } from 'antd/sun/dist/button';
declare type cbFn = (arg?: unknown) => void;
export declare type AsyncButtonProps = Omit<ButtonProps, 'loading' | 'onClick'> & {
    onClick?: (resolve: cbFn, reject: cbFn) => void;
    useLoading?: boolean;
};
export default function AsyncButton(props: AsyncButtonProps): JSX.Element;
export {};
