'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsBackendApp.directive:modalInstagramForm
 * @description
 * # modalInstagramForm
 */

//TODO (1.0.0) validation (required)

angular.module('amnohfelsBackendApp')
    .directive('modalInstagramForm', function () {
        return {
            templateUrl: 'views/modalinstagramform.html',
            restrict: 'E',
            controller: function ($scope) {
                $scope.tags = []; //for storing the text in ngTagsInput Object representation
                if ($scope.modalVars.action === 'create') {
                    $scope.modalVars.data.title = '';
                    $scope.modalVars.data.maxPhotos = 10;
                    $scope.modalVars.data.filterOutTags = true;
                    $scope.modalVars.data.filterForTags = true;
                    $scope.modalVars.data.tags = [];
                }
                if ($scope.modalVars.action === 'update') {
                    $scope.modalVars.data.maxPhotos = parseInt($scope.modalVars.data.maxPhotos);
                    angular.forEach($scope.modalVars.data.tags, function (value) {
                        $scope.tags.push({text: value});
                    });
                }
                $scope.modalVars.route = '/instagram';
                $scope.modalVars.data.pageTopic = $scope.pageTopic;

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

                //data for popovers
                $scope.popovers = {
                    removeHashtags : {
                        title: 'Was ist das?',
                        content: 'Mit dieser Funktion kannst du aus dem Bildtext die Hashtags entfernen. Lautet der Text auf Instagram z.B. "Leckeren Eisbecher genießen #eis #foodporn", wird auf der Website nur "Leckeren Eisbecher genießen" angezeigt.'
                    },
                    filterForHashtags : {
                        title: 'Was ist das?',
                        content: 'Mit dieser Funktion kannst du nur Fotos mit einem oder mehreren bestimmten Hashtags anzeigen lassen. Lässt du die Option deaktiviert, werden alle Fotos aus deinem Account angezeigt.'
                    }
                };
            }
        };
    });
