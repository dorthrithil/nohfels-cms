'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */
angular
    .module('amnohfelsClientApp', ['ngRoute'])
        .config(function($routeProvider) {
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
                    redirectTo: '/cafe'
            });
        })
    .value('phpServerRoot','http://amnohfels.local');