'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:NachtigallentalCtrl
 * @description
 * # NachtigallentalCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
    .controller('NachtigallentalCtrl', function ($scope, util) {
        util.compilePage('nachtigallental', $scope);
    });
