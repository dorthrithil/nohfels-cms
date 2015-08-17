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
      // <!-- comments:toggle // -->
      root: 'http://schruemel.de/dev/',
      api: 'http://schruemel.de/dev/api/'
      //root: 'http://amnohfels.de/server/',
      //api: 'http://amnohfels.de/server/api/'
      // <!-- endcomments -->
    },
    admin: {
      mail: 'felix@feblog.de'
    },
    settings: {
      // set the maximal filesize of uploaded images & files in bytes. set to zero to allow any filesize.
      // !! make sure to set this on the server too to prevent inconsistencies !!
      maxFilesize: 0,
      maxImageFilesize: 0
    },
    google:{ //TODO those infos have to be fetched from server with authentication
      analyticsClientId: '446070086344-1a963b57gbms5pld1a3kicocuvier78f.apps.googleusercontent.com'
    },
    aerisapi:{ //TODO those infos have to be fetched from server with authentication
      clientId: 'YHPvotXLiMIS8ioNiOKYA',
      clientSecret: 'uGu3quJFZU9pXWvq3LqoxsmuiHNlxdyVqKNlQwyx',
      placeId: 'bad+sobernheim,ger'
    }
  });
