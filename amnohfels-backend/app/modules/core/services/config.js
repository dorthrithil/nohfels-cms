'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.config
 * @description
 * # config
 * Constant in the amnohfelsBackendApp.
 */
angular.module('coreModule')
  .constant('config', {
    server: {
      root: 'http://amnohfels.de/server/',//'http://schruemel.de/dev/',
      api: 'http://amnohfels.de/server/api/'//'http://schruemel.de/dev/api/'
    },
    admin: {
      mail: 'felix@feblog.de'
    }
  });
