const bind = require('../bind');

let val = 0;

window.onload = function () {
  init();
};

function init() {
  document.getElementById('test').value = bind.bind(val);
  document.getElementById('test').addEventListener('input', e => {
    console.log(e.target);
    console.log(e.target.value);
  })
};