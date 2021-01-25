import React, { useRef, useEffect } from 'react'
import { columnFixedType } from './setting-menu-item'

interface dragColumnOption {
  dataIndexFlat?: string
  index?: number
  fixed?: columnFixedType
}
export interface DragWrapProps {
  onDrop?: (drag?: dragColumnOption, drop?: dragColumnOption) => void
  children?: JSX.Element
}

function getDragElement(ele: HTMLElement): HTMLElement {
  let p = ele
  while (p) {
    if (p.classList.contains('drag-wrap')) {
      return null
    }
    if (p.classList.contains('setting-menu_item')) {
      return p
    } else {
      p = p.parentElement
    }
  }
}

function DragWrap(props: DragWrapProps): JSX.Element {
  const ref = useRef<HTMLElement>()
  useEffect(() => {
    const wrapEl = ref.current
    if (wrapEl) {
      wrapEl.ondragstart = (e: any): void => {
        const dataset = e.target.dataset
        e.dataTransfer.setData('dragInfo', JSON.stringify(dataset))
        e.target.style.opacity = '0.4'
      }
      wrapEl.ondragend = (e: any): void => {
        e.target.style.opacity = '1'
      }
      wrapEl.ondragover = (e: any): void => {
        const dragElement = getDragElement(e.target)
        if (dragElement) {
          e.preventDefault()
          if (!dragElement.classList.contains('drag-enter')) {
            dragElement.classList.add('drag-enter')
          }
        }
      }
      wrapEl.ondragleave = (e: any): void => {
        const dragElement = getDragElement(e.target)
        if (dragElement) {
          e.preventDefault()
          dragElement.classList.remove('drag-enter')
        }
      }
      wrapEl.ondrop = (e: any): void => {
        // 放置区的元素
        const dropElement = getDragElement(e.target)
        if (!dropElement) {
          return
        }
        const { fixed, index, name } = dropElement.dataset
        const dropIndex = parseInt(index, 10)
        // 拖动的元素
        const dragInfo = JSON.parse(e.dataTransfer.getData('dragInfo'))
        const dragIndex = parseInt(dragInfo.index, 10)
        // 清除drop元素的样式
        document.querySelectorAll('.setting-menu_item.drag-enter').forEach((ele) => {
          ele.classList.remove('drag-enter')
        })
        typeof props.onDrop === 'function' &&
          props.onDrop(
            { dataIndexFlat: dragInfo.name, index: dragIndex, fixed: dragInfo.fixed },
            { dataIndexFlat: name, index: dropIndex, fixed: fixed as columnFixedType },
          )
      }
    }
  }, [])

  return (
    <section className="drag-wrap" ref={ref}>
      {props.children}
    </section>
  )
}

export default DragWrap
