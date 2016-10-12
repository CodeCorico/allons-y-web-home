'use strict';

module.exports = function($done) {
  var path = require('path');

  require(path.resolve(__dirname, 'web-home-service-back.js'))();

  DependencyInjection.injector.controller.get('$WebHomeService').init();

  $done();
};
