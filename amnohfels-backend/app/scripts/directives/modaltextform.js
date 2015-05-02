'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalTextForm
 * @description
 * # modalTextForm
 */

//TODO validation (required)
//TODO file upload (pdf) to link in text

angular.module('amnohfelsBackendApp')
    .directive('modalTextForm', function () {
        return {
            templateUrl: 'views/modaltextform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'new') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.content = '';
                }
                $scope.modalVars.route = '/text';
                $scope.modalVars.data.page = $scope.topic;
            }
        };
    });
