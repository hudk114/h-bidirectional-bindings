window.hm = {};

const isObj = function isObj(val) {
  return typeof val === 'object';
};

const setProxy = function setProxy(val) {
  console.log(val);
};
const getProxy = function getProxy() {
  console.log('get sth here');
};

const hijackProperty = function hijackProperty(obj, key, val) {
  // TODO the property can't be config?
  Object.defineProperty(obj, key, {
    configurable: false,
    get() {
      getProxy();
      return val;
    },
    set(nVal) {
      setProxy(nVal);
      val = nVal; // eslint-disable-line
    },
  });
};

const hijackObj = function hijackObj(obj) {
  if (isObj(obj)) {
    Object.keys(obj).forEach((key) => {
      // if hijack property first, would trigger get several times
      if (isObj(obj[key])) {
        hijackObj(obj[key]);
      }
      hijackProperty(obj, key, obj[key]);
    });
  } else {
    // TODO
  }
};

const bind = function bind(obj) {
  // bind to window.hm
  Object.keys(obj).forEach((key) => {
    Object.defineProperty(window.hm, key, {
      configurable: false,
      get() {
        return obj[key];
      },
      set(nVal) {
        obj[key] = nVal; // eslint-disable-line
      },
    });
  });

  // property hijacking
  hijackObj(obj);
};

module.exports = bind;
