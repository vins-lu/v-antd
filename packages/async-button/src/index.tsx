import React, { useState, useEffect } from 'react'
import { Button } from 'antd/sun'
import { ButtonProps } from 'antd/sun/dist/button'

type cbFn = (arg?: unknown) => void

export type AsyncButtonProps = Omit<ButtonProps, 'loading' | 'onClick'> & {
  onClick?: (resolve: cbFn, reject: cbFn) => void
  useLoading?: boolean
}

export default function AsyncButton(props: AsyncButtonProps): JSX.Element {
  const { onClick, useLoading = true, disabled = false, children, ...asyncProps } = props

  const [buttonStatus, setButtonStatus] = useState(disabled)

  // 处理父组件的变量控制
  useEffect(() => {
    setButtonStatus(disabled)
  }, [disabled])

  function clickHandle(): void {
    setButtonStatus(true)
    new Promise((resolve, reject) => {
      typeof onClick === 'function' && onClick.call(null, resolve, reject)
    })
      .then(() => {
        setButtonStatus(false)
      })
      .catch()
  }

  const disabledPropField = useLoading ? 'loading' : 'disabled'

  return (
    <Button {...asyncProps} {...{ [disabledPropField]: buttonStatus }} onClick={clickHandle}>
      {children}
    </Button>
  )
}
