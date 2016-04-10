'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalBlogForm
 * @description
 * # modalBlogForm
 */
angular.module('amnohfelsBackendApp')
  .directive('modalBlogForm', function () {
    return {
      templateUrl: 'views/modalblogform.html',
      restrict: 'E',
      controller: function ($scope) {
        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data.title = '';
          $scope.modalVars.data.maxEntries = 3;
        }
        $scope.modalVars.route = '/blog';
        $scope.modalVars.data.pageTopic = $scope.pageTopic;
      }
    };
  });

