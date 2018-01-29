const getDom = function getDom (ele, cb) {
  const judgeCB = typeof cb === 'function' ? cb : null
  // TODO iterator here
  if (!ele.childNodes) {
    return []
  }

  const childNodes = ele.childNodes
  // the last
  if (childNodes.length === 0) {
    if (judgeCB && !judgeCB(ele)) {
      return []
    } else {
      return [ele]
    }
  }

  const arr = []
  for (let index = 0; index < childNodes.length; index++) {
    const e = childNodes[index]
    Array.prototype.push.apply(arr, getDom(e, cb))
  }
  return arr
}

const getDomByType = function getDomByType (type) {
  return getDom(document.body, (ele) => ele.nodeType === type)
}

const exec = function exec () {
  const judgeValue = function judgeValue (val) {
    return /^\{\{.*\}\}$/.test(val)
  }
  const getValue = function getValue (val) {
    return /^\{\{(.*)\}\}$/.exec(val)[1]
  }

  // get all text dom and filter
  const textDom = getDomByType(3)
    .filter((ele) => judgeValue(ele.nodeValue))
    .map((ele) => ({
      ele,
      value: getValue(ele.nodeValue)
    }))

  return textDom
}

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

const transElement = function transElement (ele) {
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
      transElement(node)
    }
  })
}

export default {
  // exec,
  transElement
}
