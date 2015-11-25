'use strict';

/**
 * @ngdoc service
 * @name amnohfelsClientApp.config
 * @description
 * # config
 * Constant in the amnohfelsClientApp.
 */
angular.module('amnohfelsClientApp')
  .constant('config', {
    server: {
      // <!-- comments:toggle // -->
      root: 'http://schruemel.de/dev/',
      api: 'http://schruemel.de/dev/api/'
      //root: 'https://amnohfels.de/server/',
      //api: 'https://amnohfels.de/server/api/'
      // <!-- endcomments -->
    },
    admin: {
      // <!-- comments:toggle // -->
      mail: 'felix@feblog.de'
      //mail: 'am_nohfels@web.de'
      // <!-- endcomments -->
    },
    instagram: {
      userId: '1693418525'
    },
    analytics: {
      // <!-- comments:toggle // -->
      id: 'UA-64482637-1'
      //id: 'UA-64482637-3'
      // <!-- endcomments -->
    },
    company: {
      name: 'Am Nohfels'
    }
  });

