import { DescItemType } from '../../src/index'

const baseDescItems1: DescItemType[] = [
  {
    label: '姓名',
    name: 'name',
  },
  {
    label: '年龄',
    name: 'age',
  },
  {
    label: '职业',
    name: 'work',
  },
]

const baseDescItems1Value = {
  name: 'vins',
  age: 24,
  work: '搬砖',
}

const baseDescItems2: DescItemType[] = [
  {
    label: '籍贯',
    name: 'addr',
  },
  {
    label: '爱好',
    name: 'hobby',
    hide: true,
  },
]

const baseDescItems2Value = {
  addr: '河南',
  hobby: '动漫',
}

const groupDescItems: DescItemType[] = [
  {
    groupOption: { title: '基本信息' },
    name: 'basicInfo',
    groups: baseDescItems1,
  },
  {
    groupOption: { title: '其他信息' },
    name: 'otherInfo',
    groups: baseDescItems2,
  },
]

const groupHideDescItems: DescItemType[] = [
  {
    groupOption: { title: '基本信息' },
    name: 'basicInfo',
    hide: true,
    groups: baseDescItems1,
  },
  {
    groupOption: { title: '其他信息' },
    name: 'otherInfo',
    groups: baseDescItems2,
  },
]

const groupDescItemsValue = {
  basicInfo: baseDescItems1Value,
  otherInfo: baseDescItems2Value,
}

const configDescItems: DescItemType[] = [
  {
    label: '姓名',
    name: 'name',
    span: 2,
    // fullLine: true,
  },
  {
    label: '年龄',
    name: 'age',
    fullLine: true,
  },
  {
    label: '职业',
    name: 'work',
    span: 2,
    fullLine: true,
  },
]

const configDescItemsValue = {
  name: 'vins',
  age: 24,
  work: '搬砖',
}

export {
  baseDescItems1,
  baseDescItems1Value,
  baseDescItems2,
  baseDescItems2Value,
  groupDescItems,
  groupHideDescItems,
  groupDescItemsValue,
  configDescItems,
  configDescItemsValue,
}
