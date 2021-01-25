/// <reference types="react" />
import { RangePickerProps } from 'antd/sun/dist/date-picker';
import { NamePath } from 'rc-field-form/lib/interface';
import moment from 'moment';
export declare type EventValue<DateType> = DateType | null;
export declare type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;
export declare type RangeDateValueType = RangeValue<number>;
export declare type RangeDateMomentValueType = RangeValue<moment.Moment>;
export declare type RangeDateStringType = [string, string];
export declare type dateModeType = 'start' | 'end' | 'now';
export interface DateRangeFormatPickerProps extends Omit<RangePickerProps, 'defaultValue' | 'onChange' | 'value' | 'picker'> {
    defaultValue?: RangeDateValueType;
    value?: RangeDateValueType;
    startDateAlias?: string;
    endDateAlias?: string;
    formitemname?: NamePath;
    dateMode?: [dateModeType, dateModeType];
    onChange?: (dateTs: RangeDateValueType, date: RangeDateMomentValueType, dateString: RangeDateStringType) => void;
}
declare function DateRangeFormatPicker(props: DateRangeFormatPickerProps): JSX.Element;
export default DateRangeFormatPicker;
