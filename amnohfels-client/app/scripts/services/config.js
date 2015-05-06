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
            root: 'http://schruemel.de/dev/',
            api: 'http://schruemel.de/dev/api/'
        },
        admin: {
            mail: 'felix@feblog.de'
        }
    });