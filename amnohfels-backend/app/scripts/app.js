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

//TODO is there a need for each a directive & view for all the pages? they basically do nothing but pass in the page name. i could create a "page" directive & view instead

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
    .value('phpServerRoot', 'http://schruemel.de/testnohfels');