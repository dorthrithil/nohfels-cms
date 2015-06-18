'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */

//TODO (1.0.0) UI: uniform module margins
//TODO (1.0.0) google analytics
//TODO (1.0.0) improvement: dynamic page routing like in backend

//TODO (1.0.1) improvement: use ng resource vor rest communication
//TODO (1.0.1) improvement: use different angular modules for different concerns
//TODO (1.0.1) tests: add tests
//TODO (1.0.1) documentation: add descriptions and comments to all functions and files

//TODO (1.1.0) feature: let user add, delete and disable pages
//TODO (1.1.0) improvement: factor out page style elements in extra files to provide theme functionality

angular
    .module('amnohfelsClientApp', ['ngRoute', 'akoenig.deckgrid', 'angularSpinner'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/cafe.html',
                controller: 'CafeCtrl'
            })
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
                templateUrl: 'views/404.html',
                controller: '404Ctrl'
            });
    });
