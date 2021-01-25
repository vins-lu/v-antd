import React, { useContext } from 'react'
import { useIntl } from './intl'
import { PageHeader } from 'antd/sun'
import TableWrapperCtx from '../table-wrapper-ctx'
import ToolBar, { ToolBarProps } from './tool-bar'
import { TableWrapperProps } from '../table-wrapper'

type WrapHeaderProps = Omit<TableWrapperProps, 'locale' | 'minHeight' | 'cacheUserHabit' | 'children'>

function WrapHeader(props: WrapHeaderProps): JSX.Element {
  const intl = useIntl()
  const defaultTitle = intl.getMessage('tableToolBar.defaultTitle', '查询表格')
  const toolBar = useContext(TableWrapperCtx)

  const ToolBarOption: ToolBarProps = Object.assign(props.toolBarOptions || {}, {
    refresh: {
      hide: typeof props.onRefresh !== 'function',
    },
  })
  const PageHeaderExtra: React.ReactNode = [
    toolBar.fullscreen ? null : props.extra,
    props.hideToolBar ? null : ((<ToolBar key="toolBar" {...ToolBarOption} />) as React.ReactNode),
  ]

  return <PageHeader ghost={false} className="tool-bar" title={props.title || defaultTitle} extra={PageHeaderExtra} />
}

export default WrapHeader
