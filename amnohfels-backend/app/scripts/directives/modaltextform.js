'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalTextForm
 * @description
 * # modalTextForm
 */
angular.module('amnohfelsBackendApp')
  .directive('modalTextForm', function (textAngularManager, util) {
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

        $scope.dismissHook = function(){
          textAngularManager.unregisterEditor('content');
        };

        $scope.modifyHtml = util.taModifyHtml; //TODO is this defined in every editor?
      }
    };
  })
;
