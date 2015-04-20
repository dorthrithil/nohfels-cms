'use strict';

/**
 * @ngdoc overview
 * @name amnohfelsBackendApp
 * @description
 * # amnohfelsBackendApp
 *
 * Main module of the application.
 */

//TODO update rangy to get rid of error

//TODO (1.0.1) improvement: use ng resource vor rest communication

angular
    .module('amnohfelsBackendApp', ['ngRoute', 'textAngular', 'ui.bootstrap-slider', 'ngTagsInput', 'angularFileUpload'])
    .config(function ($routeProvider, $provide) {
        //config textAngular
        $provide.decorator('taOptions', ['$delegate', function (taOptions) {
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                ['insertLink']
            ];
            return taOptions;
        }]);

        //config ngRoute
        $routeProvider
            .when('/:topic', {
                controller: 'PageCtrl',
                templateUrl: 'views/page.html'
            })
            .otherwise({
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeCtrl'
            });
    })
    .value('phpServerRoot', 'http://schruemel.de/testnohfels')
    .value('adminMail', 'felix@feblog.de');