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
                $scope.deleteEmployee = function(){
                    //TODO implement + UI
                };
                $scope.employeeUp = function(){
                    //TODO implement + UI
                };
                $scope.employeeDown = function(){
                    //TODO implement + UI
                };

            }
        };
    });
