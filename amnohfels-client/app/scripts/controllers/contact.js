'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
    .controller('ContactCtrl', function ($scope, util) {
        util.compilePage('contact', $scope);
    });
