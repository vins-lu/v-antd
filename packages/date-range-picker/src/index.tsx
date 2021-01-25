import React, { useCallback } from 'react'
import { DatePicker, HookForm } from 'antd/sun'
import { RangePickerProps } from 'antd/sun/dist/date-picker'
import { FormInstance } from 'rc-field-form'
import { NamePath } from 'rc-field-form/lib/interface'
import moment from 'moment'

export declare type EventValue<DateType> = DateType | null
export declare type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null

export type RangeDateValueType = RangeValue<number>
export type RangeDateMomentValueType = RangeValue<moment.Moment>
export type RangeDateStringType = [string, string]
export type dateModeType = 'start' | 'end' | 'now'

export interface DateRangeFormatPickerProps
  extends Omit<RangePickerProps, 'defaultValue' | 'onChange' | 'value' | 'picker'> {
  defaultValue?: RangeDateValueType
  value?: RangeDateValueType
  startDateAlias?: string
  endDateAlias?: string
  formitemname?: NamePath
  dateMode?: [dateModeType, dateModeType]
  onChange?: (dateTs: RangeDateValueType, date: RangeDateMomentValueType, dateString: RangeDateStringType) => void
}

type formValueType = Record<string, unknown>

function deepGet(object: formValueType, path: NamePath): React.ReactNode {
  if (!path) {
    return ''
  }
  return (Array.isArray(path) ? path : path.toString().replace(/\[/g, '.').replace(/\]/g, '').split('.')).reduce(
    (o: formValueType, k) => (o || {})[k] as any,
    object,
  )
}

function formatMomentByMode(m: moment.Moment, mode: dateModeType): number {
  if (m == null) {
    return null
  }
  switch (mode) {
    case 'start':
      return m.startOf('day').valueOf()
    case 'end':
      return m.endOf('day').valueOf()
    case 'now':
    default:
      return m.valueOf()
  }
}

function momentToNumber(
  ms: RangeDateMomentValueType,
  mode?: DateRangeFormatPickerProps['dateMode'],
): RangeDateValueType {
  if (Array.isArray(ms)) {
    return [formatMomentByMode(ms[0], mode[0]), formatMomentByMode(ms[1], mode[1])]
  }
  return null
}

function numberToMoment(ns: RangeDateValueType): RangeDateMomentValueType {
  if (Array.isArray(ns)) {
    return ns.map((n) => {
      return n == null ? null : moment(n * 1)
    }) as RangeDateMomentValueType
  }
  return null
}

function DateRangeFormatPicker(props: DateRangeFormatPickerProps): JSX.Element {
  const {
    defaultValue,
    value,
    onChange,
    startDateAlias,
    endDateAlias,
    formitemname,
    dateMode = ['start', 'end'],
    ...restProps
  } = props
  const dateProps: RangePickerProps = restProps

  const isFormMode = !!startDateAlias

  // 别名必须同时标示出来
  if (!((startDateAlias && endDateAlias) || (!startDateAlias && !endDateAlias))) {
    throw '请保证 startDateAlias 和 endDateAlias 字段同时指定'
  }

  if (typeof defaultValue !== 'undefined') {
    dateProps.defaultValue = numberToMoment(defaultValue) as RangeDateMomentValueType
  }
  if (typeof value !== 'undefined') {
    dateProps.value = numberToMoment(value)
  }

  const shouldUpdate = useCallback(
    (prev, cur) => {
      if (formitemname) {
        return deepGet(prev, formitemname) !== deepGet(cur, formitemname)
      }
      return true
    },
    [formitemname],
  )

  // 设置扩展字段的name，兼容嵌套模式
  const setExtendFieldName = useCallback(
    (name: NamePath): NamePath => {
      return Array.isArray(formitemname) ? ([...formitemname.slice(0, -1), name] as NamePath) : name
    },
    [formitemname],
  )

  // 设置扩展字段的value
  const setExtendFieldValue = useCallback(
    (rangeData: RangeDateValueType, formInstance?: FormInstance): void => {
      formInstance &&
        formInstance.setFields([
          {
            name: setExtendFieldName(startDateAlias),
            value: rangeData ? rangeData[0] * 1 : null,
          },
          {
            name: setExtendFieldName(endDateAlias),
            value: rangeData ? rangeData[1] * 1 : null,
          },
        ])
    },
    [startDateAlias, endDateAlias],
  )

  function dateChange(
    date: RangeDateMomentValueType,
    dateString: RangeDateStringType,
    formInstance?: FormInstance,
  ): void {
    if (typeof onChange === 'function') {
      const dateTs = momentToNumber(date, dateMode)
      setExtendFieldValue(dateTs, formInstance)
      onChange(dateTs, date, dateString)
    }
  }

  const setDefaultValue = useCallback(
    (formInstance: FormInstance) => {
      if (formitemname) {
        const curFormItemValue = formInstance.getFieldValue(formitemname)
        if (!curFormItemValue) {
          const formItemValue: RangeDateValueType = [
            formInstance.getFieldValue(setExtendFieldName(startDateAlias)) as number,
            formInstance.getFieldValue(setExtendFieldName(endDateAlias)) as number,
          ]
          dateProps.value = numberToMoment(formItemValue)
          formInstance.setFields([
            {
              name: formitemname,
              value: formItemValue,
            },
          ])
        } else {
          setExtendFieldValue(curFormItemValue, formInstance)
        }
      }
    },
    [formitemname, startDateAlias, endDateAlias],
  )

  if (isFormMode) {
    return (
      <HookForm.Item noStyle shouldUpdate={shouldUpdate}>
        {(formInstance) => {
          setDefaultValue(formInstance)
          return (
            <>
              <DatePicker.RangePicker onChange={(v, s) => dateChange(v, s, formInstance)} {...dateProps} />
              <HookForm.Item noStyle name={setExtendFieldName(startDateAlias)}>
                <div />
              </HookForm.Item>
              <HookForm.Item noStyle name={setExtendFieldName(endDateAlias)}>
                <div />
              </HookForm.Item>
            </>
          )
        }}
      </HookForm.Item>
    )
  } else {
    return <DatePicker.RangePicker onChange={dateChange} {...dateProps} />
  }
}

export default DateRangeFormatPicker
