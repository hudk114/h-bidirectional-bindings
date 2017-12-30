const bind = require('../bind')

let obj = {
  val: 3
}

let x = bind.bind(obj)

window.onload = function () {
  init()
}

// TODO to loader
function init () {
  document.getElementById('test').value = x.val
  document.getElementById('test').addEventListener('input', e => {
    x.val = e.target.value
  })
}
