'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalContactForm
 * @description
 * # modalContactForm
 */

//TODO validation (required, email)

angular.module('amnohfelsBackendApp')
  .directive('modalContactForm', function () {
    return {
        templateUrl: 'views/modalcontactform.html',
        restrict: 'E',
        controller: function ($scope) {
            if ($scope.modalVars.action === 'new') {
                $scope.modalVars.data.title = '';
                $scope.modalVars.data.topic = '';
                $scope.modalVars.data.address = '';
            }
            $scope.modalVars.route = '/contact';
            $scope.modalVars.data.page = $scope.topic; //TODO find a uniform logical topic/page naming
        }
    };
  });
