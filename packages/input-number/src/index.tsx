import React, { useState } from 'react'
import { Input } from 'antd/sun'
import { InputProps } from 'antd/sun/dist/input'

const limitFloat = (val: string, decimal = 2, minus = false): string => {
  let sNum: string = val.toString() // 先转换成字符串类型
  sNum = sNum.replace(/。/g, '.') // 中文的句号替换为.
  if (sNum.indexOf('.') === 0) {
    // 第一位就是 .
    sNum = '0' + sNum
  }
  if (minus) {
    sNum = sNum.replace(/[^\d.-]/g, '') // 清除“数字”、“.”和“-”以外的字符
    sNum = sNum.replace(/-{2,}/g, '-') // 只保留第一个“-” 清除多余的
    sNum = sNum.replace('-', '$#$').replace(/-/g, '').replace('$#$', '-')
  } else {
    sNum = sNum.replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
  }
  sNum = sNum.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
  sNum = sNum.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
  if (decimal > 0) {
    sNum = sNum.replace(new RegExp(`^(\\-)*(\\d+)\\.(${Array(decimal).fill('\\d').join('')}).*$`), '$1$2.$3') // 只能输入{decimal}个小数
  } else {
    sNum = sNum.replace(new RegExp(`^(\\-)*(\\d+).*$`), '$1$2')
  }
  // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (sNum.indexOf('.') < 0 && sNum != '' && sNum !== '-') {
    sNum = parseFloat(sNum) + ''
  }
  return sNum
}

interface BaseInputNumberProps extends InputProps {
  onChange?: (target: string | number | React.ChangeEvent<HTMLInputElement>) => void
  // 支持几位小数，传0时为整数
  decimal?: number
  // 最大值
  max?: number
  // 最小值
  min?: number
  // 是否可输入负数
  minus?: boolean
}

type BaseInputNumberTypes = (props: BaseInputNumberProps) => JSX.Element

const BaseInputNumber: BaseInputNumberTypes = ({
  onChange = () => undefined,
  decimal = 2,
  max,
  min,
  minus = false,
  ...props
}: BaseInputNumberProps) => {
  const [value, setValue] = useState<string | number>()

  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 初始化value
    let value = event.target.value
    value = limitFloat(value, decimal, minus)
    setValue(value)
    onChange(value)
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value
    if (value === '-' || value === '') {
      setValue('')
      onChange('')
      return
    }
    value = +value
    if (min !== undefined && value < min) {
      value = min
    }
    if (max !== undefined && value > max) {
      value = max
    }
    setValue(value)
    onChange(value)
  }

  return (
    <Input
      value={value}
      onChange={onInput}
      onPressEnter={(event) => {
        event.currentTarget.blur()
      }}
      onBlur={onBlur}
      {...props}
    />
  )
}

export default BaseInputNumber
