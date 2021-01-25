/// <reference types="react" />
import { ButtonProps } from 'antd/sun/dist/button';
export interface ActionButtons extends ButtonProps {
    label: string;
    key: string;
}
export interface ButtonsCompProps {
    showSearchButton?: boolean;
    searchButtonProps?: ButtonProps;
    showResetButton?: boolean;
    resetButtonProps?: ButtonProps;
    actionButtons?: ActionButtons[];
    actionButtonClick?: (key: string) => void;
    handleReset?: () => void;
}
declare type ButtonsCompTypes = (props: ButtonsCompProps) => JSX.Element;
declare const ButtonsComp: ButtonsCompTypes;
export default ButtonsComp;
