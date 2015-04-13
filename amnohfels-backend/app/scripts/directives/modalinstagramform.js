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
                $scope.tags = []; //for storing the text in ngTagsInput Object representation
                if ($scope.modalVars.action === 'new') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.maxPhotos = 10;
                    $scope.modalVars.data.filterOutTags = true;
                    $scope.modalVars.data.filterForTags = true;
                    $scope.modalVars.data.tags = [];
                }
                if ($scope.modalVars.action === 'edit') {
                    $scope.modalVars.data.maxPhotos = parseInt($scope.modalVars.data.maxPhotos);
                    angular.forEach($scope.modalVars.data.tags, function (value) {
                        $scope.tags.push({text: value});
                    });
                }
                $scope.modalVars.route = '/instagram';
                $scope.modalVars.data.page = 'cafe';

                $scope.showTagsInput = function () {
                    return $scope.modalVars.data.filterForTags;
                };

                //methods for adding/removing the tags into modalVars.data
                $scope.addTag = function ($tag) {
                    $scope.modalVars.data.tags.push($tag.text);
                };

                $scope.removeTag = function ($tag) {
                    $scope.modalVars.data.tags.splice($scope.modalVars.data.tags.indexOf($tag.text), 1);
                };
            }
        };
    });
