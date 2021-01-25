import React, { useContext } from 'react'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd/sun'
import TableWrapperCtx from '../table-wrapper-ctx'
import { useIntl } from './intl'

function FullScreen(): JSX.Element {
  const intl = useIntl()
  const toolBar = useContext(TableWrapperCtx)
  const fullscreen = toolBar.fullscreen
  const Icon = fullscreen ? FullscreenExitOutlined : FullscreenOutlined
  const title = intl.getMessage(
    fullscreen ? 'tableToolBar.exitFullScreen' : 'tableToolBar.fullScreen',
    fullscreen ? '退出全屏' : '全屏',
  )
  return (
    <Tooltip title={title}>
      <Icon onClick={toolBar.toggleFullscreen} />
    </Tooltip>
  )
}

export default FullScreen
