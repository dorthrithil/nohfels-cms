'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalStaffForm
 * @description
 * # modalStaffForm
 */

//TODO bug: edit - modal is not scrollable until focusing an input field

angular.module('amnohfelsBackendApp')
    .directive('modalStaffForm', function () {
        return {
            templateUrl: 'views/modalstaffform.html',
            restrict: 'E',
            controller: function ($scope) {
                if ($scope.modalVars.action === 'new') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.employees = [];
                }
                $scope.modalVars.route = '/staff';
                $scope.modalVars.data.page = 'cafe'; //TODO get real page

                $scope.addEmployee = function () {
                    $scope.modalVars.data.employees.push({
                        name: '',
                        imageSrc: ''
                    });
                };
                $scope.deleteEmployee = function(index){
                    $scope.modalVars.data.employees.splice(index, 1);
                };
                $scope.swapDownEmployee = function(index){
                    var tempEmployee = $scope.modalVars.data.employees[index];
                    $scope.modalVars.data.employees[index] = $scope.modalVars.data.employees[index + 1];
                    $scope.modalVars.data.employees[index + 1] = tempEmployee;
                };

            }
        };
    });
