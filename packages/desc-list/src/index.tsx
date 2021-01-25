import React, { useMemo } from 'react'
import { Descriptions, Card } from 'antd/sun'
import { DescriptionsProps } from 'antd/sun/dist/descriptions'

type DescItemValueType = React.ReactNode
export type RenderJSXFnType =
  | ((value?: DescItemValueType, data?: Record<string, unknown>) => JSX.Element)
  | JSX.Element

export type WrapperFnType = (
  children?: React.ReactChild,
  groupOption?: Record<string, unknown>,
  itemValue?: unknown,
) => JSX.Element

export interface DescItemType {
  label?: React.ReactNode
  name?: string | string[]
  value?: DescItemValueType
  span?: number
  fullLine?: boolean
  wrapper?: WrapperFnType // 包裹容器
  groups?: DescItemType[] // 分组的内容
  groupOption?: DescriptionsProps
  useGroupName?: boolean // 是否使用分组的name，默认使用
  hide?: ((value?: DescItemValueType, data?: Record<string, unknown>) => boolean) | boolean // 是否隐藏
  render?: RenderJSXFnType // 自定义渲染的方法
}

export interface DescListProps extends DescriptionsProps {
  items?: DescItemType[]
  data?: Record<string, DescItemValueType>
  groupWrapper?: WrapperFnType // 包裹容器
  hideTitle?: boolean
}

function isEmptyObj(obj: Record<string, unknown>): boolean {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

function deepGet(object: DescListProps['data'], path: DescItemType['name']): DescItemValueType {
  if (!path || isEmptyObj(object)) {
    return null
  }
  return (Array.isArray(path)
    ? path
    : path.replace(/\[/g, '.').replace(/\]/g, '').split('.')
  ).reduce((o, k) => (o || {})[k], object)
}

// 默认的分列数量
export const defaultColumn = 3

// 格式化为分组的表单数据
function generatorGroupItems<T extends DescItemType>(items: T[]): Array<T | T[]> {
  const itemGroups: Array<T | T[]> = []
  let groupIndex = 0
  items.forEach((item) => {
    const i = { ...item }
    // 分组表单
    if (i.groups && i.groups.length > 0) {
      // 分组的name属性同步关联到子元素
      if (i.name) {
        i.groups = item.groups.map((g) => {
          const c = { ...g }
          if (c.name && c.useGroupName !== false) {
            const cName = Array.isArray(c.name) ? c.name : [c.name]
            const pName = Array.isArray(i.name) ? i.name : [i.name]
            c.name = [...pName, ...cName].filter((n) => n)
          }
          return c
        })
      }
      itemGroups.push(i)
      groupIndex = itemGroups.length
    } else {
      if (!itemGroups[groupIndex]) {
        itemGroups[groupIndex] = []
      }
      ;(itemGroups[groupIndex] as T[]).push(i)
    }
  })
  return itemGroups
}

// 填充空的元素
function fillEmptyItems(num: number, key: string = 'fill'): React.ReactNode {
  return num > 0 ? Array.from({ length: num }).map((a, i) => {
    return (
      <Descriptions.Item key={key + i}>
        {null}
      </Descriptions.Item>
    )
  }) : null
}

// 生成分组表单元素
function generatorGroupItemsElement(
  itemGroups: Array<DescItemType | DescItemType[]>,
  data: DescListProps['data'],
  option: Omit<DescListProps, 'data' | 'items'>,
): JSX.Element[] {
  const groupElements: JSX.Element[] = []
  itemGroups.forEach((group, groupIndex) => {
    const groupItems = Array.isArray(group) ? group : group.groups
    if (!groupItems || groupItems.length === 0) {
      return null
    }

    if (!Array.isArray(group)) {
      if (
        group.hide === true ||
        (typeof group.hide === 'function' && group.hide.call(null, null, data))
      ) {
        return null
      }
    }

    const { hideTitle, groupWrapper, ...globalOption } = option
    const groupOption = Array.isArray(group) ? {} : group.groupOption || {}
    const descriptionProps = { ...globalOption, ...groupOption }

    if (hideTitle) {
      delete descriptionProps.title
    }
    let groupSpan = 0 // 当前分组中的span数量
    const curColumn = descriptionProps.column || defaultColumn
    const formItemElement: JSX.Element = (
      <Descriptions key={'desc-group' + groupIndex} {...descriptionProps}>
        {groupItems.map((i: DescItemType, index: number) => {
          let descElement: DescItemValueType =
            typeof i.value === 'undefined' ? (i.name ? deepGet(data, i.name) : '') : i.value
          if (
            i.hide === true ||
            (typeof i.hide === 'function' && i.hide.call(null, descElement, data))
          ) {
            return null
          }
          if (typeof i.render === 'function') {
            descElement = i.render.call(null, descElement, data)
          }
          let fillItem: React.ReactNode = []
          let curSpan = i.span || 1
          if (typeof curColumn === 'number') {
            curSpan = Math.min(Math.max(curSpan, 1), curColumn)
            const preLineNum = groupSpan % curColumn
            if (i.fullLine) {
              curSpan = curColumn
            }
            if (index > 0 && groupSpan > 0 && curSpan > 1) {
              const fillBeforeNum =
                preLineNum === 0 ? 0 : curSpan + preLineNum > curColumn ? curColumn - preLineNum : 0
              fillItem = fillEmptyItems(fillBeforeNum, groupIndex + '-fillBefore-')
              groupSpan = groupSpan + fillBeforeNum
            }
            groupSpan = groupSpan + curSpan
          }
          return (
            <React.Fragment key={'desc-item-fragment' + (i.label as string) + index}>
              {fillItem}
              <Descriptions.Item key={'desc-item' + (i.label as string) + index} label={i.label} span={curSpan}>
                {descElement}
              </Descriptions.Item>
            </React.Fragment>
          )
        })}
      </Descriptions>
    )

    if (!Array.isArray(group)) {
      const wrapperFn = group.wrapper || groupWrapper
      if (typeof wrapperFn === 'function') {
        const wrapperValue: DescItemValueType = group.name ? deepGet(data, group.name) : null
        const wrapperElement: JSX.Element = wrapperFn.call(
          null,
          formItemElement,
          groupOption,
          wrapperValue,
        )
        groupElements.push(
          React.cloneElement(wrapperElement, { key: 'desc-list-group' + groupIndex }),
        )
      } else {
        groupElements.push(formItemElement)
      }
    } else {
      groupElements.push(formItemElement)
    }
  })
  return groupElements
}

export const CardWrapper: WrapperFnType = (children, groupOption) => {
  return <Card title={groupOption.title}>{children}</Card>
}

export default function DescList(props: DescListProps): JSX.Element {
  const { items = [], data = {}, ...descriptionsProps } = props
  const itemGroups = useMemo(() => generatorGroupItems(items), [items])
  const groupElements = generatorGroupItemsElement(itemGroups, data, descriptionsProps)
  return <div className="desc-list">{groupElements}</div>
}
