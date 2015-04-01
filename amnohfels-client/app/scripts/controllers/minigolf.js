'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MinigolfCtrl
 * @description
 * # MinigolfCtrl
 * Controller of the webappApp
 */
angular.module('amnohfelsClientApp')
    .controller('MinigolfCtrl', function ($scope, $http, phpServerRoot) {
        var page = '/index.php?topic=cafe';
        $http.get(phpServerRoot + page)
            .success(function (response) {
                $scope.response = response;
                $scope.$broadcast('compile-modules');
            });
    });