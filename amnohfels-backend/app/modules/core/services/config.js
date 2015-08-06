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
      root: 'http://schruemel.de/dev/',
      api: 'http://schruemel.de/dev/api/'
    },
    admin: {
      mail: 'felix@feblog.de'
    },
    settings: {
      // set the maximal filesize of uploaded images & files in bytes. set to zero to allow any filesize.
      // !! make sure to set this on the server too to prevent inconsistencies !!
      maxFilesize: 0,
      maxImageFilesize: 0
    }
  });
