'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalYoutubeForm
 * @description
 * # modalYoutubeForm
 */

//TODO (1.0.0) transform youtube url to embed url

angular.module('amnohfelsBackendApp')
  .directive('modalYoutubeForm', function () {
    return {
      templateUrl: 'views/modalyoutubeform.html',
      restrict: 'E',
      controller: function ($scope) {
        if ($scope.modalVars.action === 'create') {
          $scope.modalVars.data.title = '';
          $scope.modalVars.data.url = '';
        }
        $scope.modalVars.route = '/youtube';
        $scope.modalVars.data.pageTopic = $scope.pageTopic;
      }
    };
  });
