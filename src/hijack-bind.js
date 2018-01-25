import Model from './model'

const domModel = new Model()

window.hm = {}
window.hm.dm = domModel

const isObj = function isObj (val) {
  if (val === null) {
    return false
  }
  return typeof val === 'object'
}

/**
 * hijack property key of obj
 * @param {Object} obj the obj to be hijcked
 * @param {string} key the key of the obj to be hijacked
 * @param {*} val actually the obj[key], cause hijack would overwrite obj[key]
 */
const hijackProperty = function hijackProperty (obj, key, val) {
  // 每一个property都有一个model
  const model = new Model()

  // TODO the property can't be config?
  Object.defineProperty(obj, key, {
    configurable: false,
    get () {
      // 利用全局变量传递cb进来
      if (window.hm.target) {
        model.on('val-change', window.hm.target)
      }
      return val
    },
    set (nVal) {
      model.trigger('val-change', nVal)
      val = nVal; // eslint-disable-line
    }
  })
}

/**
 * hijack obj function
 * @param {Object} obj the obj to be hijcked
 */
const hijackObj = function hijackObj (obj) {
  if (isObj(obj)) {
    Object.keys(obj).forEach((key) => {
      // if hijack property first, would trigger getter several times!
      if (isObj(obj[key])) {
        // TODO recursion?
        hijackObj(obj[key])
      }
      hijackProperty(obj, key, obj[key])
    })
  } else {
    // TODO
  }
}

const bind = function bind (obj) {
  // bind to window.hm, need one domain only
  Object.keys(obj).forEach((key) => {
    Object.defineProperty(window.hm, key, {
      configurable: false,
      get () {
        return obj[key]
      },
      set (nVal) {
        obj[key] = nVal; // eslint-disable-line
      }
    })
  })

  // property hijacking
  hijackObj(obj)
}

export default bind
