window.hm = {};

let index = 0;

const common = {
  judge (val) {
    return 'undefined' === typeof val || null === val
  }
}

const bindFuncs = {
  setProxy (val) {
    console.log(val)
  },
  getProxy () {

  },
  bindAttr (rawObj, tarObj = window.hm, key) {
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
  // TODO 递归
  /**
   * bing obj to toObj[key]
   * @param {*} obj the obj to bind
   * @param {window.hm} toObj the obj to be bind on
   * @param {undefined} key the key of the obj, if toObj is not window.hm, this params is needed
   */
  bind (rawObj, tarObj = window.hm, key) {
    if (tarObj !== window.hm && common.judge(key)) {
      // TODO throw error
      return
    }

    if (tarObj === window.hm) {
      // TODO if not object?
      for (const key in rawObj) {
        if (rawObj.hasOwnProperty(key)) {
          bindFuncs.bindAttr(rawObj, tarObj, key)
        }
      }  
    } else {
      
    }

    return window.hm;
  },
};

module.exports = bindFuncs;