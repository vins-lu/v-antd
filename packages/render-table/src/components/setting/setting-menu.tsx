import React, { useContext, useMemo, useEffect } from 'react'
import { Checkbox } from 'antd/sun'
import { useIntl } from '../intl'
import { useAutoReducer } from '@vins-rc/react-hooks'
import { ColumnType } from 'antd/sun/dist/table'
import TableWrapperCtx from '../../table-wrapper-ctx'
import SettingMenuItem, { columnFixedType } from './setting-menu-item'
import { DefaultColumnType } from '../../table-wrapper'

interface settingMenuStateProps<CT extends ColumnType<unknown> = ColumnType<unknown>> {
  checkAll: boolean
  indeterminate: boolean
  checkedList: string[]
  fixedLeftList: CT[]
  fixedRightList: CT[]
  noFixedList: CT[]
}

const settingMenuState: settingMenuStateProps = {
  checkAll: false, // 是否选择全部
  indeterminate: true, // 选中全部的checkbox的展示样式控制
  checkedList: [], // 选中的数据
  fixedLeftList: [], // 固定在左边的列表
  fixedRightList: [], // 固定在左边的列表
  noFixedList: [], // 无固定的列表
}

type SettingMenuProps = {
  columns: DefaultColumnType[]
}

export default function SettingMenu(props: SettingMenuProps): JSX.Element {
  const intl = useIntl()
  const toolBar = useContext(TableWrapperCtx)
  const [state, dispatch] = useAutoReducer(settingMenuState)

  useEffect(() => {
    dispatch({
      type: 'dispatchMulti',
      payload: {
        fixedLeftList: props.columns.filter((i) => i.fixed === 'left'),
        fixedRightList: props.columns.filter((i) => i.fixed === 'right'),
        noFixedList: props.columns.filter((i) => !i.fixed),
        checkedList: props.columns
          .map((i) => {
            if (!i.hideColumn) {
              return i.dataIndexFlat
            }
          })
          .filter((i) => i),
      },
    })
  }, [props.columns])

  const ctx = useMemo(() => {
    return {
      onCheckAllChange(e: any) {
        const checked = e.target.checked
        const checkedList = checked ? props.columns.map((i) => i.dataIndexFlat) : []
        dispatch({
          type: 'dispatchMulti',
          payload: {
            checkedList,
            indeterminate: false,
            checkAll: checked,
          },
        })
        if (typeof toolBar.updateShowColumns === 'function') {
          toolBar.updateShowColumns(checkedList)
        }
      },
      onOptionsChange(v: Array<DefaultColumnType['dataIndexFlat']>) {
        dispatch({
          type: 'dispatchMulti',
          payload: {
            indeterminate: !!v.length && v.length < props.columns.length,
            checkAll: v.length === props.columns.length,
            checkedList: v,
          },
        })
        if (typeof toolBar.updateShowColumns === 'function') {
          toolBar.updateShowColumns(v)
        }
      },
      onMenuFixedChange(dataIndexFlat: DefaultColumnType['dataIndexFlat'], curFixed?: columnFixedType) {
        if (typeof toolBar.updateColumns === 'function') {
          toolBar.updateColumns((columns: DefaultColumnType[]) => {
            const newColumns = [...columns]
            const curIndex = newColumns.findIndex((i) => i.dataIndexFlat === dataIndexFlat)
            const cur = newColumns.splice(curIndex, 1)[0]
            cur.fixed = curFixed
            newColumns.splice(curIndex, 0, cur)
            return newColumns
          })
        }
      },
    }
  }, [])

  return (
    <div className="columns-setting">
      <div className="columns-setting_title">
        <Checkbox indeterminate={state.indeterminate} onChange={ctx.onCheckAllChange} checked={state.checkAll}>
          {intl.getMessage('tableToolBar.columnDisplay', '列展示')}
        </Checkbox>
        <span className="columns-setting_tip">
          {intl.getMessage('tableToolBar.columnSettingTip', '拖动可调整顺序')}
        </span>
      </div>
      <Checkbox.Group style={{ width: '100%' }} value={state.checkedList} onChange={ctx.onOptionsChange}>
        <SettingMenuItem fixed="left" columns={state.fixedLeftList} onMenuFixedChange={ctx.onMenuFixedChange} />
        <SettingMenuItem columns={state.noFixedList} onMenuFixedChange={ctx.onMenuFixedChange} />
        <SettingMenuItem fixed="right" columns={state.fixedRightList} onMenuFixedChange={ctx.onMenuFixedChange} />
      </Checkbox.Group>
    </div>
  )
}
