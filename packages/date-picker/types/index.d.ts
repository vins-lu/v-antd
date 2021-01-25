/// <reference types="react" />
import { DatePickerProps } from 'antd/sun/dist/date-picker';
import { Moment } from 'moment';
export declare type DateValueType = number | null;
export interface DateFormatPickerProps extends Omit<DatePickerProps, 'defaultValue' | 'value' | 'onChange' | 'picker'> {
    defaultValue?: DateValueType;
    value?: DateValueType;
    onChange?: (value: DateValueType, moment: Moment, dateString: string) => void;
}
declare function DateFormatPicker(props: DateFormatPickerProps): JSX.Element;
export default DateFormatPicker;
