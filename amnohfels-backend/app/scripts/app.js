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

angular
    .module('amnohfelsBackendApp', ['ngRoute', 'textAngular', 'ui.bootstrap-slider', 'ngTagsInput', 'angularFileUpload'])
    .config(function ($routeProvider, $provide) {
        //config textAngular
        $provide.decorator('taOptions', ['$delegate', function(taOptions){
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                ['insertLink']
            ];
            return taOptions;
        }]);

        //config ngRoute
        $routeProvider
            .when('/cafe', {
                templateUrl: 'views/cafe.html',
                controller: 'CafeCtrl'
            })
            .when('/minigolf', {
                templateUrl: 'views/minigolf.html',
                controller: 'MinigolfCtrl'
            })
            .when('/reisemobilstellplatz', {
                templateUrl: 'views/reisemobilstellplatz.html',
                controller: 'ReisemobilstellplatzCtrl'
            })
            .when('/psgh', {
                templateUrl: 'views/psgh.html',
                controller: 'PsghCtrl'
            })
            .when('/nachtigallental', {
                templateUrl: 'views/nachtigallental.html',
                controller: 'NachtigallentalCtrl'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactCtrl'
            })
            .when('/imprint', {
                templateUrl: 'views/imprint.html',
                controller: 'ImprintCtrl'
            })
            .otherwise({
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeCtrl'
            });
    })
    .value('phpServerRoot', 'http://schruemel.de/testnohfels');