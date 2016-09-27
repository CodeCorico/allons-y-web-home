(function() {
  'use strict';

  window.Ractive.controllerInjection('web-home-layout', [
    '$component', '$data', '$done',
  function homeLayoutController(
    $component, $data, $done
  ) {
    var WebHomeLayout = $component({
      data: $data
    });

    WebHomeLayout.on('teardown', function() {
      WebHomeLayout = null;
    });

    $done();
  }]);

})();
