window.hm = {}

// let index = 0;

const common = {
  // TODO
  isObject (val) {
    if (Array.isArray(val)) {
      return false
    }
    return val instanceof Object
  }
}

const bindFuncs = {
  setProxy (val) {
    console.log(val)
  },
  getProxy () {
    console.log('get sth here')
  },
  bindProperty (rawObj, key, tarObj = window.hm) {
    Object.defineProperty(tarObj, key, {
      set (val) {
        bindFuncs.setProxy(val)
        // TODO dom here
        rawObj[key] = val
      },
      get () {
        bindFuncs.getProxy()
        return rawObj[key]
      }
    })
  },
  bindObj (rawObj, key, tarObj = window.hm) {
    // FIXME first bind toObj.key then bind rawObj to toObj.key

    const obj = rawObj[key]
    // const tObj = tarObj[key]
    // FIXME then bind rawObj[key] to toObj
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        // TODO
        const ele = obj[k]
        if (common.isObject(ele)) {
          // bindFuncs.bindObj(obj, k, tObj)
        } else {
          // TODO array?
          // bindFuncs.bindAttr(obj, k, tObj)
          Object.defineProperty(tarObj[key], k, {
            set (val) {
              obj[k] = val
            },
            get () {
              return obj[k]
            }
          })
        }
      }
    }
    bindFuncs.bindAttr(rawObj, key, tarObj)
  },
  bind (obj) {
    // bind to window.hm

    // property hijacking
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const ele = obj[key]
        if (common.isObject(ele)) {
          bindFuncs.bindObj(obj, key)
        } else {
          // TODO array?
          bindFuncs.bindProperty(obj, key)
        }
      }
    }
    return window.hm
  },
  observe (data) {
    if (typeof data !== 'object') {
      return
    }

    Object.keys(data).forEach(key => {
      bindFuncs.defineReactive(data, key, data[key])
    })
  },
  defineReactive (data, key, val = data[key]) {
    // TODO 最外层绑定一次
    // bind()
    console.log('1')
    bindFuncs.observe(val)
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get () {
        return val
      },
      set (nVal) {
        console.log('set')
        val = nVal
      }
    })
  }
}

module.exports = bindFuncs
