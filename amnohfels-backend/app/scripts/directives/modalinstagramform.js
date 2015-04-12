'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalInstagramForm
 * @description
 * # modalInstagramForm
 */

//TODO validation (required)
//TODO get real page

angular.module('amnohfelsBackendApp')
  .directive('modalInstagramForm', function () {
    return {
        templateUrl: 'views/modalinstagramform.html',
        restrict: 'E',
        controller: function ($scope) {
            if ($scope.modalVars.action === 'new') {
                $scope.modalVars.data.title = '';
                $scope.modalVars.data.maxPhotos = 10;
                $scope.modalVars.data.filterOutTags = true;
                $scope.modalVars.data.filterForTags = true;
                $scope.modalVars.data.tags = [];
            }
            $scope.modalVars.route = '/instagram';
            $scope.modalVars.data.page = 'cafe';

            $scope.showTagsInput = function(){
                return $scope.modalVars.data.filterForTags;
            };
        }
    };
  });
