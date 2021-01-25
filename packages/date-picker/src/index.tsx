import React from 'react'
import { DatePicker } from 'antd/sun'
import { DatePickerProps } from 'antd/sun/dist/date-picker'
import moment, { Moment } from 'moment'

export type DateValueType = number | null
export interface DateFormatPickerProps extends Omit<DatePickerProps, 'defaultValue' | 'value' | 'onChange' | 'picker'> {
  defaultValue?: DateValueType
  value?: DateValueType
  onChange?: (value: DateValueType, moment: Moment, dateString: string) => void
}

function DateFormatPicker(props: DateFormatPickerProps): JSX.Element {
  const { defaultValue, value, onChange, ...restProps } = props
  const dateProps: DatePickerProps = restProps

  let dateDefaultValue: null | Moment = null
  let dateValue: null | Moment = null
  if (typeof defaultValue === 'number' || defaultValue === null) {
    dateDefaultValue = defaultValue === null ? null : moment(defaultValue)
    dateProps.defaultValue = dateDefaultValue as any
  }
  if (typeof value === 'number' || value === null) {
    dateValue = value === null ? null : moment(value)
    dateProps.value = dateValue as any
  }

  function dateChange(date: Moment | any, dateString: string): void {
    if (typeof onChange === 'function') {
      const v = date && typeof date.valueOf === 'function' ? date.valueOf() : null
      onChange(v, date, dateString)
    }
  }
  return <DatePicker onChange={dateChange} {...dateProps} />
}

export default DateFormatPicker
