'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:ImprintCtrl
 * @description
 * # ImprintCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
    .controller('ImprintCtrl', function ($scope, util) {
        util.compilePage('imprint', $scope);
    });
