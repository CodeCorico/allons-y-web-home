(function() {
  'use strict';

  window.bootstrap(['$Page', '$i18nService', '$done', function($Page, $i18nService, $done) {

    $Page.remember(/^\/?$/);

    $Page.set('apps', [{
      name: $i18nService._('Home'),
      selected: true,
      select: function() {
        window.page('/');
      }
    }]);

    $done();
  }]);

})();
