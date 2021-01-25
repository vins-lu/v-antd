import React, { useState, useCallback, useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

export interface ExpandWrapProps {
  hideExpand?: boolean
  maxHeight?: number | string
  title?: React.ReactNode
  children?: React.ReactNode
  parentExpand?: boolean
  toggleParentExpand?: (expand?: boolean) => void
}

function ExpandWrap(props: ExpandWrapProps): JSX.Element {
  const { hideExpand = false, maxHeight = 48, title = '', parentExpand, children } = props
  const [expand, setExpand] = useState<boolean>(false)
  const toggleExpand = useCallback(
    (expanded) => {
      setExpand((a) => !a)
      if (!expanded) {
        typeof props.toggleParentExpand === 'function' && props.toggleParentExpand(true)
      }
    },
    [setExpand],
  )
  useEffect(() => {
    if (!parentExpand) {
      setExpand(false)
    }
  }, [parentExpand])
  return (
    <div className="expand-wrap">
      <div className="expand-wrap_handle">
        <span className="expand-wrap_title">{title}</span>
        {hideExpand ? null : (
          <span className="expand-wrap_icon" onClick={() => toggleExpand(expand)}>
            {expand ? '收起' : '展开'}
            {expand ? <UpOutlined /> : <DownOutlined />}
          </span>
        )}
      </div>
      <div style={{ maxHeight: expand ? 'none' : maxHeight }}>{children}</div>
    </div>
  )
}

export default ExpandWrap
