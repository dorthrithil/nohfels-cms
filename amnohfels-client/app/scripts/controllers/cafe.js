'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:CafeCtrl
 * @description
 * # CafeCtrl
 * Controller of the webappApp
 */
angular.module('amnohfelsClientApp')
    .controller('CafeCtrl', function ($scope) {
        $scope.response = [];
        $scope.response[0] = {};
        $scope.response[1] = {};
        $scope.response[1].data = {};
        $scope.response[1].type = 'this schoulndt exist';
    });
