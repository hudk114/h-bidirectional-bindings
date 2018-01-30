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

  Array.from(ele.childNodes).forEach((node) => {
    fragment.appendChild(node)
  })
  // let child = ele.firstChild
  // while (child) {
  //   fragment.appendChild(child)
  //   child = ele.firstChild
  // }
  return fragment
}

const compileEleNode = function compileEleNode (node) {
  if (!node.attributes) {
    return
  }

  const pattern = /^h-(.*)$/
  Array.from(node.attributes).forEach((attr) => {
    const name = attr.name
    const match = pattern.exec(name)
    if (match && match[1] === 'model') {
      const props = convertProp(attr.value)
      // get proper obj and prop
      const o = getDepthProps(window.hm, props)

      // bind to watcher here
      window.hm.target = (val) => {
        node.value = val
      }
      node.value = o.obj[o.prop]
      window.hm.target = null

      node.addEventListener('input', (e) => {
        o.obj[o.prop] = e.target.value
      })
    }
  })
}

const compileTextNode = function compileTextNode (node) {
  // TODO 只有一个绑定值
  // TODO 没有处理算术

  const pattern = /\{\{(.*)\}\}/
  const match = pattern.exec(node.nodeValue)
  if (!match) {
    return
  }

  const rawVal = node.nodeValue
  const props = convertProp(match[1])
  // get proper obj and prop
  const o = getDepthProps(window.hm, props)

  // bind to watcher here
  window.hm.target = (val) => {
    node.nodeValue = rawVal.replace(pattern, val)
  }
  node.nodeValue = rawVal.replace(pattern, o.obj[o.prop])
  window.hm.target = null
}

const compileNode = function compileNode (ele) {
  Array.from(ele.childNodes).forEach((node) => {
    // text node
    if (node.nodeType === 3) {
      compileTextNode(node)
      return
    } else {
      compileEleNode(node)
    }

    if (node.childNodes && node.childNodes.length) {
      compileNode(node)
    }
  })
}

const compile = function compile (ele) {
  if (!ele) {
    return
  }

  let fragment = transEleToFragment(ele)

  compileNode(fragment)

  ele.appendChild(fragment)
}

export default compile
