'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalTextForm
 * @description
 * # modalTextForm
 */

//TODO validation (required)

angular.module('amnohfelsBackendApp')
    .directive('modalTextForm', function () {
        return {
            templateUrl: 'views/modaltextform.html',
            restrict: 'E',
            link: function postLink() {
            },
            controller: function ($scope) {
                $scope.data = {
                    page: 'cafe', //TODO set real page
                    content: '',
                    title: ''
                };
            }
        };
    });
