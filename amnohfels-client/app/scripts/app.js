'use strict';

/**
 * @ngdoc overview
 * @name webappApp
 * @description
 * # webappApp
 *
 * Main module of the application.
 */

//TODO don't stuff everything in the same module
//TODO protect dep injection against minification https://thinkster.io/egghead/scope-vs-scope at ~5:10
//TODO route change fade?
//TODO 1px white margin at bottom?
//TODO uniform module margins

angular
    .module('amnohfelsClientApp', ['ngRoute', 'ngAnimate'])
        .config(function($routeProvider) {
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
                    templateUrl: 'views/notfound.html',
                    controller: 'NotfoundCtrl'
            });
        })
    .value('phpServerRoot','http://amnohfels.local');