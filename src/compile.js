import { debug } from "util";

const convertProp = function convertProp (val) {
  return val.trim().split('.')
}

const getDepthProps = function getDepthProps (obj, props) {
  // TODO
  if (props.length <= 1) {
    return {
      obj,
      prop: props[0]
    }
  }

  let o = obj
  let key = null
  while (props.length > 1) {
    key = props.shift()
    o = o[key]
  }

  return {
    obj: o,
    prop: props[0]
  }
}

const transEleToFragment = function transEleToFragment (ele) {
  const fragment = document.createDocumentFragment()

  Array.from(ele.childNodes).forEach(node => {
    fragment.appendChild(node)
  })
  // let child = ele.firstChild
  // while (child) {
  //   fragment.appendChild(child)
  //   child = ele.firstChild
  // }
  return fragment
}

const compileText = function compileText (ele) {
  const pattern = /\{\{(.*)\}\}/
  const childNodes = ele.childNodes

  Array.from(childNodes).forEach((node) => {
    if (node.nodeType === 3 && pattern.test(node.nodeValue)) {
      // TODO 没有处理算术
      // TODO 只有一个绑定值
      const match = pattern.exec(node.nodeValue)
      const rawVal = node.nodeValue
      const props = convertProp(match[1])
      // get proper obj and prop
      const o = getDepthProps(window.hm, props)
      window.hm.target = (val) => {
        node.nodeValue = rawVal.replace(pattern, val)
      }
      node.nodeValue = rawVal.replace(pattern, o.obj[o.prop])
      window.hm.target = null
      return
    }

    if (node.childNodes && node.childNodes.length) {
      compileText(node)
    }
  })
}

const compile = function compile (ele) {
  // TODO judge ele

  let fragment = transEleToFragment(ele)

  compileText(fragment)

  ele.appendChild(fragment)
}

export default compile
