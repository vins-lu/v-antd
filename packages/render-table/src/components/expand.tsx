import React, { useContext } from 'react'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd/sun'
import TableWrapperCtx from '../table-wrapper-ctx'
import { useIntl } from './intl'

function Expand(): JSX.Element {
  const intl = useIntl()
  const toolBar = useContext(TableWrapperCtx)
  const expand = toolBar.expand
  const Icon = expand ? ShrinkOutlined : ArrowsAltOutlined
  const title = intl.getMessage(expand ? 'tableToolBar.notExpand' : 'tableToolBar.expand', expand ? '收起' : '展开')
  return (
    <Tooltip title={title}>
      <Icon onClick={toolBar.toggleExpand} />
    </Tooltip>
  )
}

export default Expand
