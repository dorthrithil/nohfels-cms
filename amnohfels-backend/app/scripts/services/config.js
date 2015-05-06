'use strict';

/**
 * @ngdoc service
 * @name amnohfelsBackendApp.config
 * @description
 * # config
 * Constant in the amnohfelsBackendApp.
 */
angular.module('amnohfelsBackendApp')
    .constant('config', {
        server: {
            root: 'http://schruemel.de/dev/',
            api: 'http://schruemel.de/dev/api/'
        },
        admin: {
            mail: 'felix@feblog.de'
        }
    });
