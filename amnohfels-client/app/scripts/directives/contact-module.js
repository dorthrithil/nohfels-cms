'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:contactModule
 * @description
 * # contactModule
 */
angular.module('amnohfelsClientApp')
  .directive('contactModule', function () {
        return {
            templateUrl: 'views/contact-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            controller: function($scope){
                $scope.email = {
                    text: 'tests'
                };
            }
        };
  });
