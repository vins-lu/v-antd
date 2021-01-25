/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react'
import RenderFrom, { RenderFormProps } from '@vins-rc/render-form'
import ExpandWrap from './expand-wrap'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface SearchFormProps extends RenderFormProps {
  hideExpand?: boolean
  maxHeight?: number | string
  groupMaxHeight?: number | string
}
function SearchForm(props: SearchFormProps): JSX.Element {
  const { children, items, hideExpand, maxHeight, groupMaxHeight, ...restProps } = props
  const [expand, setExpand] = useState<boolean>(false)
  const searchItems = useMemo(() => {
    return items.map((item) => {
      const i = Object.assign({}, item)
      i.itemProps = Object.assign({ allowClear: true }, i.itemProps)
      if (i.type === 'group' && i.wrapper === undefined) {
        const maxHeight = i.itemProps ? i.itemProps.maxHeight || groupMaxHeight : groupMaxHeight
        i.wrapper = function wrapper(children: React.ReactChild): JSX.Element {
          return (
            <ExpandWrap
              title={i.label}
              maxHeight={maxHeight}
              hideExpand={!i.groups || i.groups.length < (i.groupColumn || restProps.column || 3)}
              parentExpand={expand}
              toggleParentExpand={setExpand}
            >
              {children}
            </ExpandWrap>
          )
        }
      }
      return i
    })
  }, [expand, items])
  return (
    <div className="search-form">
      <div className={'search-form_list'} style={{ maxHeight: hideExpand || expand ? 'none' : maxHeight }}>
        <RenderFrom items={searchItems} {...restProps} />
      </div>
      <div className="search-form_handle">
        {children}
        {hideExpand ? null : (
          <span className="expand-icon" onClick={() => setExpand((a) => !a)}>
            {expand ? '收起' : '展开'}
            {expand ? <UpOutlined /> : <DownOutlined />}
          </span>
        )}
      </div>
    </div>
  )
}

export default SearchForm
