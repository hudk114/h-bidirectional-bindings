var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true');
hotClient.subscribe(function (event) {
  console.log(event);

  // client端，通过event事件触发，类型为reload时触发页面刷新
  if (event.action === 'reload') {
    window.location.reload();
  }
});