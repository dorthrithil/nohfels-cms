'use strict';

/**
 * @ngdoc function
 * @name amnohfelsClientApp.controller:404Ctrl
 * @description
 * # 404Ctrl
 * Controller of the amnohfelsClientApp
 */
angular.module('amnohfelsClientApp')
    .controller('404Ctrl', function ($scope, config) {
        $scope.data = {};
        $scope.data.errorMessage = '';
        $scope.adminMail = config.admin.mail;
    });
