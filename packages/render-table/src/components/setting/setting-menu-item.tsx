import React from 'react'
import { PushpinOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons'
import { Checkbox, Tooltip } from 'antd/sun'
import { useIntl } from '../intl'
import { ColumnType } from 'antd/sun/dist/table'
import { extendColumnType } from '../../table-wrapper'

export type columnFixedType = extendColumnType['fixed']
interface SettingMenuItemProps<CT extends ColumnType<unknown> = ColumnType<unknown>> {
  columns?: CT[]
  fixed?: columnFixedType
  onMenuFixedChange?: (dataIndexFlat: extendColumnType['dataIndexFlat'], curFixed?: columnFixedType) => void
}

export default function SettingMenuItem<CT>(props: SettingMenuItemProps<CT>): JSX.Element {
  const intl = useIntl()
  const leftFixedTitle = intl.getMessage('tableToolBar.leftFixedTitle', '固定到左侧')
  const noFixedTitle = intl.getMessage('tableToolBar.noFixedTitle', '无固定')
  const rightFixedTitle = intl.getMessage('tableToolBar.rightFixedTitle', '固定到右侧')
  const fixedTitle = !props.fixed ? noFixedTitle : props.fixed === 'left' ? leftFixedTitle : rightFixedTitle

  function fixedColumn(dataIndexFlat: extendColumnType['dataIndexFlat'], curFixed?: columnFixedType) {
    if (typeof props.onMenuFixedChange === 'function') {
      props.onMenuFixedChange(dataIndexFlat, curFixed)
    }
  }

  return props.columns.length > 0 ? (
    <ul className="setting-menu">
      <li className="setting-menu_title">{fixedTitle}</li>
      {props.columns.map((item: any, index) => (
        <li
          className="setting-menu_item"
          draggable={!item.fixedDisable}
          data-fixed={props.fixed}
          data-index={index}
          data-name={item.dataIndexFlat}
          key={item.dataIndexFlat + (props.fixed || '')}
        >
          <Checkbox className="setting-menu_column-title" value={item.dataIndexFlat} disabled={item.hideColumnDisable}>
            {item.title.length > 10 ? (
              <Tooltip className="column-title" title={item.title}>
                {item.title}
              </Tooltip>
            ) : (
              <span>{item.title}</span>
            )}
          </Checkbox>
          {!item.fixedDisable && props.fixed !== 'left' ? (
            <Tooltip key="leftFixedTitle" title={leftFixedTitle}>
              <PushpinOutlined
                style={{
                  transform: 'rotate(-90deg)',
                  margin: 0,
                }}
                onClick={() => fixedColumn(item.dataIndexFlat, 'left')}
              />
            </Tooltip>
          ) : null}
          {!item.fixedDisable && props.fixed ? (
            <Tooltip key="noFixedTitle" title={noFixedTitle}>
              <VerticalAlignMiddleOutlined onClick={() => fixedColumn(item.dataIndexFlat)} />
            </Tooltip>
          ) : null}
          {!item.fixedDisable && props.fixed !== 'right' ? (
            <Tooltip key="rightFixedTitle" title={rightFixedTitle}>
              <PushpinOutlined onClick={() => fixedColumn(item.dataIndexFlat, 'right')} />
            </Tooltip>
          ) : null}
        </li>
      ))}
    </ul>
  ) : null
}
