/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react'
import { Button, Menu, Dropdown, Popconfirm, Modal } from 'antd/sun'
import { ExclamationCircleOutlined, DownOutlined } from '@ant-design/icons'
import { ButtonProps } from 'antd/sun/dist/button'
import { MenuProps } from 'antd/sun/dist/menu'
import { PopconfirmProps } from 'antd/sun/dist/popconfirm'

export interface ButtonItemProps extends ButtonProps {
  text?: React.ReactNode
  key: string
  hidden?: boolean
  disabled?: boolean
  confirm?: boolean
  confirmTitle?: PopconfirmProps['title']
  confirmProps?: Partial<PopconfirmProps>
}

export interface ButtonGroupProps {
  max?: number
  type?: 'link' | 'button'
  items: ButtonItemProps[]
  onClick?: (key?: string) => void
}

// 默认最多显示三个按钮
const defaultShowNum = 3

function ButtonItem(props: ButtonItemProps): JSX.Element {
  const { confirm, confirmTitle, confirmProps, text, ...buttonProps } = props
  return <Button {...buttonProps}>{text}</Button>
}

function ButtonGroup(props: ButtonGroupProps): JSX.Element {
  const { max = defaultShowNum, type = 'link', items = [], onClick } = props
  const buttonList = items.filter((i) => !i.hidden)
  let MainButtons = []
  let menu: JSX.Element | null = null
  const showNum = max > 0 ? max : defaultShowNum

  const clickHandle = useCallback((k: string): void => {
    typeof onClick === 'function' && onClick.call(null, k)
  }, [onClick])

  const menuClickHandle: MenuProps['onClick'] = useCallback((menuOptions): void => {
    const k = menuOptions.key
    const options = buttonList.find((i) => i.key === k)
    if (options && options.confirm) {
      const confirmProps = options.confirmProps
      Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: options.confirmTitle,
        onOk() {
          typeof onClick === 'function' && onClick.call(null, k)
        },
        ...confirmProps,
      })
    } else {
      typeof onClick === 'function' && onClick.call(null, k)
    }
  }, [onClick])

  MainButtons = buttonList.slice(0, showNum).map((i) => {
    const { confirm, confirmTitle, confirmProps, ...buttonItemProps } = i
    if (type === 'link') {
      buttonItemProps.type = 'link'
      buttonItemProps.size = 'small'
    }
    return confirm ? (
      <Popconfirm
        key={i.key}
        title={confirmTitle}
        onConfirm={(): void => clickHandle(i.key)}
        getPopupContainer={() => (document.fullscreenElement || document.body) as HTMLElement}
        {...confirmProps}
      >
        <ButtonItem {...buttonItemProps} />
      </Popconfirm>
    ) : (
      <ButtonItem {...buttonItemProps} key={i.key} onClick={(): void => clickHandle(i.key)} />
    )
  })

  const otherButtons = buttonList.slice(showNum)
  if (otherButtons.length > 0) {
    menu = (
      <Menu onClick={menuClickHandle}>
        {otherButtons.map((i) => {
          return (
            <Menu.Item disabled={i.disabled} key={i.key}>
              <ButtonItem {...i} size="small" type="link" />
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }

  return (
    <>
      <style>{`.extra-handle {color: #1890ff;margin-left: 8px;cursor: pointer;}.ant-btn + .ant-btn {margin-left: 8px;}.ant-btn.ant-btn-link {padding: 0;}`}</style>
      {MainButtons}
      {menu ? (
        <Dropdown overlay={menu}>
          {type === 'link' ? (
            <span className="extra-handle">
              更多 <DownOutlined />
            </span>
          ) : (
            <Button>
              更多 <DownOutlined />
            </Button>
          )}
        </Dropdown>
      ) : null}
    </>
  )
}

export default ButtonGroup
