import React, { useContext } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { Tooltip, Dropdown } from 'antd/sun'
import DragWrap, { DragWrapProps } from './drag-wrap'
import SettingMenu from './setting-menu'
import TableWrapperCtx from '../../table-wrapper-ctx'
import { useIntl } from '../intl'
import { DefaultColumnType } from '../../table-wrapper'

function Setting(): JSX.Element {
  const intl = useIntl()
  const toolBar = useContext(TableWrapperCtx)
  const title = intl.getMessage('tableToolBar.columnSetting', '列设置')
  const onDrop: DragWrapProps['onDrop'] = (drag, drop) => {
    if (typeof toolBar.updateColumns === 'function') {
      toolBar.updateColumns((columns: DefaultColumnType[]) => {
        const newColumns = [...columns]
        // 删除当前拖动的列
        const dragIndex = newColumns.findIndex((i) => i.dataIndexFlat === drag.dataIndexFlat)
        const dragColumn = newColumns.splice(dragIndex, 1)[0]
        // 当前拖动的列放置在放置区的列后面
        const dropIndex = newColumns.findIndex((i) => i.dataIndexFlat === drop.dataIndexFlat)
        dragColumn.fixed = drop.fixed
        newColumns.splice(dropIndex + 1, 0, dragColumn)
        return newColumns
      })
    }
  }
  const ColumnsMenu = (
    <DragWrap onDrop={onDrop}>
      <SettingMenu columns={toolBar.columns} />
    </DragWrap>
  )
  return toolBar.fullscreen ? null : (
    <Dropdown key="columns-setting" overlay={ColumnsMenu} trigger={['click']}>
      <Tooltip key="setting" title={title}>
        <SettingOutlined />
      </Tooltip>
    </Dropdown>
  )
}

export default Setting
