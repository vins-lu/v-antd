import React from 'react'
import { Button } from 'antd/sun'
import { ButtonProps } from 'antd/sun/dist/button'

// 更多按钮
export interface ActionButtons extends ButtonProps {
  label: string
  key: string
}

export interface ButtonsCompProps {
  // 是否展示搜索按钮
  showSearchButton?: boolean
  // 搜索按钮props
  searchButtonProps?: ButtonProps
  // 是否展示重置按钮
  showResetButton?: boolean
  // 重置按钮props
  resetButtonProps?: ButtonProps
  // 自定义按钮列表
  actionButtons?: ActionButtons[]
  // 自定义按钮回调
  actionButtonClick?: (key: string) => void
  // 重置按钮回调
  handleReset?: () => void
}

type ButtonsCompTypes = (props: ButtonsCompProps) => JSX.Element

const ButtonsComp: ButtonsCompTypes = ({
  showSearchButton = true,
  searchButtonProps = {},
  showResetButton = true,
  resetButtonProps = {},
  handleReset,
  actionButtons = [],
  actionButtonClick = (): void => {
    throw new Error('自定义按钮回调函数【actionButtonClick】未定义')
  },
}: ButtonsCompProps) => {
  return (
    <>
      {actionButtons.length
        ? actionButtons.map((item) => {
            return (
              <Button
                {...item}
                key={item.key}
                onClick={(): void => actionButtonClick(item.key)}
                style={{
                  marginRight: '8px',
                }}
              >
                {item.label}
              </Button>
            )
          })
        : null}
      {showSearchButton ? (
        <Button type="primary" htmlType="submit" {...searchButtonProps}>
          搜索
        </Button>
      ) : (
        ''
      )}
      {showResetButton ? (
        <Button
          style={{
            marginLeft: '8px',
          }}
          {...resetButtonProps}
          onClick={handleReset}
        >
          重置
        </Button>
      ) : (
        ''
      )}
    </>
  )
}

export default ButtonsComp
