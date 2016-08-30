(function() {
  'use strict';

  window.Ractive.controllerInjection('home-layout', [
    '$component', '$data', '$done',
  function homeLayoutController(
    $component, $data, $done
  ) {
    var HomeLayout = $component({
      data: $data
    });

    HomeLayout.on('teardown', function() {
      HomeLayout = null;
    });

    $done();
  }]);

})();
