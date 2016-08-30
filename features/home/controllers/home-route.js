'use strict';

module.exports = [{
  url: '/',

  enter: [
    '$FaviconService', '$BodyDataService', '$i18nService', '$Layout',
  function($FaviconService, $BodyDataService, $i18nService, $Layout) {
    document.title = $i18nService._('Home') + ' - ' + $BodyDataService.data('web').brand;

    $FaviconService.update('/public/home/favicon.png');

    $Layout.selectApp('Home', false);

    setTimeout(function() {
      $Layout.require('home-layout');
    });
  }],

  exit: ['$Layout', '$next', function($Layout, $next) {
    var Home = $Layout.findChild('name', 'home-layout');

    if (!Home) {
      return $next();
    }

    Home.teardown().then($next);
  }]
}];
