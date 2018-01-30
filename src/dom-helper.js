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

export default exec
