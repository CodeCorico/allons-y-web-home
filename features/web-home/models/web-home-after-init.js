'use strict';

module.exports = function($done) {
  function _updateUrl() {
    var $WebService = DependencyInjection.injector.controller.get('$WebService');

    $WebService.updateUrl('/');

    setTimeout(_updateUrl, 12 * 3600 * 1000); // 12h
  }

  setTimeout(_updateUrl, 60000 * 2); // 2min

  $done();
};
