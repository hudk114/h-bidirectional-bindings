import bind from '../src/hijack-bind'
// import exec from '../src/dom-helper'
import compile from '../src/compile'

const obj = {
  attr: {
    a: 1
  },
  arr: [1, 2, 3],
  val: 3
}

bind(obj)

// TODO 根据值找到对应的数据
// window.tm = exec()

compile(document.body)
