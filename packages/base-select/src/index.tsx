import React from 'react'
import { Select } from 'antd/sun'
import { SelectProps } from 'antd/sun/dist/select'

export type OptionValueType = string | number
export interface SelectOptionType {
  key?: string
  value?: OptionValueType
  label?: string
  disabled?: boolean
  children?: React.ReactChild
  [key: string]: any
}

export interface BaseSelectProps<VT> extends Omit<SelectProps<VT>, 'options'> {
  optionLabelAlias?: string
  optionValueAlias?: string
  options: SelectOptionType[]
}

function BaseSelect<VT extends OptionValueType = OptionValueType>(props: BaseSelectProps<VT>): JSX.Element {
  const { options = [], optionLabelAlias = 'label', optionValueAlias = 'value', ...selectProps } = props
  return (
    <Select {...selectProps}>
      {options.map((o: SelectOptionType) => {
        const {
          key,
          label,
          value,
          disabled = false,
          children,
          [optionLabelAlias]: optionLabel,
          [optionValueAlias]: optionValue,
          ...otherProps
        } = o

        return (
          <Select.Option
            disabled={disabled}
            key={key || optionLabel || optionValue}
            label={optionLabel}
            value={optionValue}
            {...otherProps}
          >
            {children || optionLabel || optionValue}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default BaseSelect
