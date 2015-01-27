'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the webappApp
 */
angular.module('amnohfelsClientApp')
    .controller('HeaderCtrl', function () {
        $(function(){
            $(this).stellar({
                horizontalScrolling: false,
                verticalScrolling: true,
                verticalOffset: 53
            });
        });
    }).run(function($rootScope, $location) {
        $rootScope.switchHeaderimage = function(){
            switch($location.path()){
                case '/cafe':
                    $rootScope.imageUrl = 'images/header/cafe.jpg';
                    break;
                case '/minigolf':
                    $rootScope.imageUrl = 'images/header/minigolf.jpg';
                    break;
                case '/nachtigallental':
                    $rootScope.imageUrl = 'images/header/nachtigallental.jpg';
                    break;
                case '/psgh':
                    $rootScope.imageUrl = 'images/header/psgh.jpg';
                    break;
                case '/reisemobilstellplatz':
                    $rootScope.imageUrl = 'images/header/reisemobilstellplatz.jpg';
                    break;
                default:
                    $rootScope.imageUrl = 'images/header/reisemobilstellplatz.jpg';
            }
            $rootScope.headerBackground  = {
                'background-image': 'url('+$rootScope.imageUrl+')'
            };
        };
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.switchHeaderimage();
        });
    });
