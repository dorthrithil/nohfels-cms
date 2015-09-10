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
    // root: 'https://amnohfels.de/server/',
    // api: 'https://amnohfels.de/server/api/'
    // <!-- endcomments -->
  },
  admin: {
    mail: 'felix@feblog.de'
  },
  instagram: {
    accessToken: '1693418525.1fb234f.fc30d26a0f214e83a5378cb56be78617'
  },
  analytics: {
    id: 'UA-64482637-1'
  },
  company:{
    name: 'Am Nohfels'
  }
});

