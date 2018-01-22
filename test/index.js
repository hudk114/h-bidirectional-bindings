import bind from '../src/hijack-bind'
import exec from '../src/dom-helper'

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

window.tm = exec()
console.log(window.tm)
