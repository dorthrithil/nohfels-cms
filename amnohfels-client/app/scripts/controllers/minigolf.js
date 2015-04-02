'use strict';

/**
 * @ngdoc function
 * @name webappApp.controller:MinigolfCtrl
 * @description
 * # MinigolfCtrl
 * Controller of the webappApp
 */
angular.module('amnohfelsClientApp')
    .controller('MinigolfCtrl', function ($scope, util) {
        util.compilePage('minigolf', $scope);
    });