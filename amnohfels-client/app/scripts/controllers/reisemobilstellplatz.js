'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:ReisemobilstellplatzCtrl
 * @description
 * # ReisemobilstellplatzCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
    .controller('ReisemobilstellplatzCtrl', function ($scope, util) {
        util.compilePage('reisemobilstellplatz', $scope);
    });
