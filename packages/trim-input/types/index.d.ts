/// <reference types="react" />
import { InputProps } from 'antd/sun/dist/input';
export interface TrimInputProps extends Omit<InputProps, 'onChange' | 'onBlur'> {
    onChange?: (v: string) => void;
    onBlur?: (v: string) => void;
}
declare function TrimInput(props: TrimInputProps): JSX.Element;
export default TrimInput;
