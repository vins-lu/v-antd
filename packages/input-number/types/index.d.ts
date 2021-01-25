import React from 'react';
import { InputProps } from 'antd/sun/dist/input';
interface BaseInputNumberProps extends InputProps {
    onChange?: (target: string | number | React.ChangeEvent<HTMLInputElement>) => void;
    decimal?: number;
    max?: number;
    min?: number;
    minus?: boolean;
}
declare type BaseInputNumberTypes = (props: BaseInputNumberProps) => JSX.Element;
declare const BaseInputNumber: BaseInputNumberTypes;
export default BaseInputNumber;
