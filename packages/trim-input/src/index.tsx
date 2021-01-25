import React from 'react'
import { Input } from 'antd/sun'
import { InputProps } from 'antd/sun/dist/input'

export interface TrimInputProps extends Omit<InputProps, 'onChange' | 'onBlur'> {
  onChange?: (v: string) => void
  onBlur?: (v: string) => void
}

function TrimInput(props: TrimInputProps): JSX.Element {
  const inputRef = React.createRef<any>()
  const { onChange, onBlur, ...prop } = props

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const v = e.target.value
    typeof onChange === 'function' && onChange(v)
  }

  const blurHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const v = e.target.value
    const trimValue = v.trim()
    if (v !== trimValue) {
      typeof onChange === 'function' && onChange(trimValue)
      inputRef.current.setValue(trimValue)
    }
    typeof onBlur === 'function' && onBlur(trimValue)
  }

  return <Input ref={inputRef} {...prop} onChange={changeHandle} onBlur={blurHandle} />
}
export default TrimInput
