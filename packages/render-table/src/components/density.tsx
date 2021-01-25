import React, { useContext } from 'react'
import { ColumnHeightOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Tooltip } from 'antd/sun'
import TableWrapperCtx from '../table-wrapper-ctx'
import { useIntl } from './intl'

export type DensitySize = 'middle' | 'small' | 'default'

const sizeMenuList = [
  { key: 'default', intlKey: 'tableToolBar.densityDefault', text: '默认' },
  { key: 'middle', intlKey: 'tableToolBar.densityMiddle', text: '中等' },
  { key: 'small', intlKey: 'tableToolBar.densitySmall', text: '紧凑' },
]

function Density(): JSX.Element {
  const toolBar = useContext(TableWrapperCtx)
  const intl = useIntl()
  const SizeMenu = (
    <Menu
      selectedKeys={[toolBar.tableSize as string]}
      style={{ width: 80 }}
      onClick={({ key }) => {
        typeof toolBar.setTableSize === 'function' && toolBar.setTableSize(key as DensitySize)
      }}
    >
      {sizeMenuList.map((i) => {
        return <Menu.Item key={i.key}>{intl.getMessage(i.intlKey, i.text)}</Menu.Item>
      })}
    </Menu>
  )
  return toolBar.fullscreen ? null : (
    <Dropdown key="density" overlay={SizeMenu} trigger={['click']}>
      <Tooltip title={intl.getMessage('tableToolBar.density', '密度')}>
        <ColumnHeightOutlined />
      </Tooltip>
    </Dropdown>
  )
}

export default Density
