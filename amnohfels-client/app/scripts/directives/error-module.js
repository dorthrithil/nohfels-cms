'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:errorModule
 * @description
 * # errorModule
 */
angular.module('amnohfelsClientApp')
    .directive('errorModule', function () {
        return {
            templateUrl: 'views/error-module.html',
            restrict: 'E',
            transclude: true,
            scope: {
                data: '='
            },
            controller: function($scope, $sce){
                $scope.isDefined = function(){
                    return $scope.data !== undefined;
                };
                if($scope.isDefined()){
                    $scope.data.errorMessage = $sce.trustAsHtml($scope.data.errorMessage);
                }
            }
        };
    });
