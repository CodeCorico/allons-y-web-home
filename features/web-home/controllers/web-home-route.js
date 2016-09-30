'use strict';

module.exports = [{
  url: '/',

  enter: [
    '$FaviconService', '$Page', '$i18nService', '$Layout',
  function($FaviconService, $Page, $i18nService, $Layout) {
    document.title = $i18nService._('Home') + ' - ' + $Page.get('web').brand;

    $FaviconService.update('/public/web-home/favicon.png');

    $Layout.selectApp('Home', false);

    setTimeout(function() {
      $Layout.require('web-home-layout');
    });
  }],

  exit: ['$Layout', '$next', function($Layout, $next) {
    var Home = $Layout.findChild('name', 'web-home-layout');

    if (Home && (window.location.pathname && window.location.pathname != '/')) {
      return Home.teardown().then($next);
    }

    $next();
  }]
}];
