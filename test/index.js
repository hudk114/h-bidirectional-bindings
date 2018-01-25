import bind from '../src/hijack-bind'
import ttt from '../src/dom-helper'
// TODO why not work
// import {
//   exec,
//   transElement
// } from '../src/dom-helper'
import Model from '../src/model'

const obj = {
  attr: {
    a: 1,
  },
  arr: [1, 2, 3],
  val: 3,
};

bind(obj);

// TODO to loader
const init = function init() {
  document.getElementById('test').value = obj.val;
  document.getElementById('test').addEventListener('input', (e) => {
    obj.val = e.target.value;
  });
};

window.onload = () => {
  init();
};

// TODO 根据值找到对应的数据
window.tm = ttt.exec()

ttt.transElement(document.body)

// hm.target = (val) => {
//   window.tm[0].ele.nodeValue = val
// }
// window.tm[0].ele.nodeValue = hm.val
// hm.target = null

// hm.target = (val) => {
//   window.tm[1].ele.nodeValue = val
// }
// window.tm[1].ele.nodeValue = hm.attr.a
// hm.target = null