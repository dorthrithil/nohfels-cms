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

//TODO http://localhost:9001/#/page/cafs should throw a 404

//TODO (1.0.1) improvement: use ng resource for rest communication

angular
    .module('amnohfelsBackendApp', ['ngRoute', 'textAngular', 'ui.bootstrap-slider', 'ngTagsInput', 'angularFileUpload'])

    //configuration
    .config(function ($routeProvider, $provide) {
        //configure textAngular
        $provide.decorator('taOptions', ['$delegate', function (taOptions) {
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                ['insertLink']
            ];
            return taOptions;
        }]);

        //configure ngRoute
        $routeProvider
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'views/login.html'
            })
            .when('/page/:topic', {
                controller: 'PageCtrl',
                templateUrl: 'views/page.html'
            })
            .otherwise({
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeCtrl'
            });
    })

    //check for login
    .run(function ($rootScope, $location, doorman) {
        //register listener to watch route changes
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if(!doorman.isLoggedIn()){
                //no logged user, we should be going to #login
                if (next.templateUrl === 'views/login.html') {
                    //already going to #login, no redirect needed
                } else {
                    //not going to #login, we should redirect now
                    $location.path('/login');
                }
            }
        });
    })

    //set "globals"
    .value('phpServerRoot', 'http://schruemel.de/testnohfels')
    .value('adminMail', 'felix@feblog.de');