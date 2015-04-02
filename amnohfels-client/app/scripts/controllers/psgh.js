'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:PsghCtrl
 * @description
 * # PsghCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
    .controller('PsghCtrl', function ($scope, util) {
        util.compilePage('psgh', $scope);
    });
