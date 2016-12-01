(function() {
  'use strict';

  window.Ractive.controllerInjection('web-home-layout', [
    '$RealTimeService', '$Layout', '$BodyDataService', '$component', '$data', '$done',
  function homeLayoutController(
    $RealTimeService, $Layout, $BodyDataService, $component, $data, $done
  ) {
    var prerender = $BodyDataService.data('prerender'),
        webHomeCookie = window.Cookies.getJSON('web.home') || {},
        WebHomeLayout = $component({
          data: $.extend(true, {
            welcome: prerender || (webHomeCookie && webHomeCookie.welcome) || false,
            user: $BodyDataService.data('user'),
            headerTop: 0,
            h1Top: 0,
            headerCover: null,
            headerCopyright: null,
            headerCopyrightUrl: null,
            metrics: [],
            tiles: [],

            formatMetric: function(value) {
              value = parseInt(value || 0, 10);

              if (value > 1000000) {
                value = (Math.round(value / 1000000) / 10) + ' M';
              }
              else if (value > 1000) {
                value = (Math.round(value / 100) / 10);

                if (value.toString().length > 4) {
                  value = Math.round(value);
                }

                value += ' k';
              }

              return value;
            }
          }, $data)
        }),
        _scrolls = null,
        _$el = {
          scrolls: $($(WebHomeLayout.el).find('.pl-scrolls')[0])
        };

    _$el.scrolls.scroll(function() {
      if ($Layout.get('screen') != 'screen-mobile') {
        WebHomeLayout.set('headerTop', _$el.scrolls.scrollTop() * 0.5);
        WebHomeLayout.set('h1Top', _$el.scrolls.scrollTop() * 0.65);
      }
    });

    function _setCover(args) {
      WebHomeLayout.set('headerCover', args.cover);
      WebHomeLayout.set('headerCopyright', args.copyright);
      WebHomeLayout.set('headerCopyrightUrl', args.copyrightUrl);
    }

    function _init() {
      $RealTimeService.realtimeComponent('webHome', [{
        name: 'web-home-cover',
        update: function(event, args) {
          if (!WebHomeLayout || !args || !args.cover) {
            return;
          }

          var $img = $('<img />');
          $img.attr('src', args.cover);

          if ($img.prop('complete')) {
            _setCover(args);
          }
          else {
            $img.bind('load', function() {
              _setCover(args);
            });
          }
        }
      }, {
        name: 'web-home-metrics',
        update: function(event, args) {
          if (!WebHomeLayout || !args || !args.metrics) {
            return;
          }

          var metrics = WebHomeLayout.get('metrics');

          args.metrics.forEach(function(metric) {
            metric.oldValue = null;

            for (var i = 0; i < metrics.length; i++) {
              if (metrics[i].name == metric.name) {
                metric.show = true;
                metric.hasOldValue = metrics[i].hasOldValue || metrics[i].value != metric.value || false;

                break;
              }
            }
          });

          WebHomeLayout.set('metrics', args.metrics);

          var index = 1;

          args.metrics.forEach(function(metric, i) {
            if (!WebHomeLayout.get('metrics.' + i + '.show')) {
              setTimeout(function() {
                WebHomeLayout.set('metrics.' + i + '.show', true);
              }, index * 75);

              index++;
            }
            else if (metric.hasOldValue) {
              setTimeout(function() {
                WebHomeLayout.set('metrics.' + i + '.hasOldValue', false);
              }, 1510);
            }
          });
        }
      }, {
        name: 'web-home-tiles',
        update: function(event, args) {
          if (!WebHomeLayout || !args || !args.tiles) {
            return;
          }

          var tiles = WebHomeLayout.get('tiles');

          args.tiles.forEach(function(tile, i) {
            tile.large = tile.large || false;
            tile.show = false;

            for (var j = 0; j < tiles.length; j++) {
              if (tiles[j].url == tile.url) {
                tile.show = i < j ? false : tiles[j].show || false;

                if (tile.show) {
                  tile.animationDuration = tiles[j].animationDuration;
                  tile.animationNumber = tiles[j].animationNumber;
                }

                break;
              }
            }
          });

          WebHomeLayout.set('tiles', args.tiles);

          var index = 1;

          args.tiles.forEach(function(tile, i) {
            if (!WebHomeLayout.get('tiles.' + i + '.show')) {
              WebHomeLayout.set('tiles.' + i + '.animationDuration', Math.floor(Math.random() * 35) + 25);
              WebHomeLayout.set('tiles.' + i + '.animationNumber', Math.floor(Math.random() * 2));

              setTimeout(function() {
                if (!WebHomeLayout) {
                  return;
                }

                WebHomeLayout.set('tiles.' + i + '.show', true);
              }, index * 50);

              index++;
            }
          });

          _scrolls.update();
        }
      }], ['web-home-cover', 'web-home-metrics', 'web-home-tiles']);

      if (!WebHomeLayout.get('welcome') && !WebHomeLayout.get('welcomeShow')) {
        WebHomeLayout.set('welcomeShow', true);
      }
    }

    WebHomeLayout.on('welcomeGetIt', function() {
      webHomeCookie = window.Cookies.getJSON('web.home') || {};
      webHomeCookie.welcome = true;

      window.Cookies.set('web.home', webHomeCookie, {
        expires: 365,
        path: '/'
      });

      WebHomeLayout.set('welcomeHide', true);

      setTimeout(function() {
        if (!WebHomeLayout) {
          return;
        }

        WebHomeLayout.set('welcome', true);
      }, 350);
    });

    WebHomeLayout.on('teardown', function() {
      _scrolls = null;
      WebHomeLayout = null;
      $RealTimeService.unregisterComponent('webHome');
    });

    WebHomeLayout.require().then(function() {
      _scrolls = WebHomeLayout.findChild('name', 'pl-scrolls');

      _init();

      $done();
    });
  }]);

})();
