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
        var page = '/index.php';
        $http.get(phpServerRoot + page)
            .success(function(response) {
                $scope.sectionData = response;
                //$scope.test = response[1];
                //$scope.foobar = response[2];
            });
    });