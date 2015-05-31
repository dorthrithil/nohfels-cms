'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalTextForm
 * @description
 * # modalTextForm
 */

//TODO (1.0.0) validation (required)

angular.module('amnohfelsBackendApp')
    .directive('modalTextForm', function () {
        return {
            templateUrl: 'views/modaltextform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'create') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.content = '';
                }
                $scope.modalVars.route = '/text';
                $scope.modalVars.data.pageTopic = $scope.pageTopic;
            }
        };
    });
