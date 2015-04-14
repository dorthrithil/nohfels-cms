'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalStaffForm
 * @description
 * # modalStaffForm
 */
angular.module('amnohfelsBackendApp')
    .directive('modalStaffForm', function () {
        return {
            templateUrl: 'views/modalstaffform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'new') {
                    $scope.modalVars.data.title = '';
                }
                $scope.modalVars.route = '/staff';
                $scope.modalVars.data.page = 'cafe';

                $scope.employees = [];
                $scope.addEmployee = function () {
                    $scope.employees.push({
                        name: ''
                    });
                };

            }
        };
    });
