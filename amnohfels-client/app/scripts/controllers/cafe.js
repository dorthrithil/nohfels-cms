'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:CafeCtrl
 * @description
 * # CafeCtrl
 * Controller of the webappApp
 */
angular.module('amnohfelsClientApp')
    .controller('CafeCtrl', function ($scope, util) {
        util.compilePage('cafe', $scope);
    });
