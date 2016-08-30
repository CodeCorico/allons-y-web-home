(function() {
  'use strict';

  window.bootstrap(['$Page', '$i18nService', '$done', function($Page, $i18nService, $done) {

    $Page.set('apps', [{
      name: $i18nService._('Home'),
      select: function() {
        window.page('/');
      }
    }]);

    $done();
  }]);

})();
