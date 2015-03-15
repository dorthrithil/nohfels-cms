'use strict';

/**
 * @ngdoc directive
 * @name amnohfelsClientApp.directive:instagramModule
 * @description
 * # instagramModule
 */

//TODO heading
//TODO $http error handling
//TODO check for token free photo fetching
//TODO comment & document data object (filterForTag)
//TODO html tries to get rendered before http request happens which throws an error

angular.module('amnohfelsClientApp')
    .directive('instagramModule', function ($http, util) {
        return {
            templateUrl: 'views/instagram-module.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function postLink() {
            },
            controller: function ($scope, $element) {
                //conditionally set defaults
                if (typeof $scope.data.maxPhotos === 'undefined') {
                    $scope.data.maxPhotos = 10;
                }
                if (typeof $scope.data.filterForTag === 'undefined') {
                    $scope.data.filterForTag = false;
                }
                if (typeof $scope.data.filterOutTags === 'undefined') {
                    $scope.data.filterOutTags = true;
                }

                var accessToken = '1693418525.1fb234f.fc30d26a0f214e83a5378cb56be78617&callback=JSON_CALLBACK';
                var requestUrl = 'https://api.instagram.com/v1/users/self/feed?access_token=' + accessToken;
                $scope.images = [];
                $http.jsonp(requestUrl)
                    .success(function (response) {
                        console.log(response);
                        var push;
                        for (var i = 0; i < response.data.length; i++) {
                            push = false;
                            if ($scope.data.filterForTag !== false && util.inArray(response.data[i].tags, $scope.data.filterForTag)) {
                                push = true;
                            } else if ($scope.data.filterForTag === false) {
                                push = true;
                            }
                            if (push) {
                                $scope.images.push({
                                    url: response.data[i].images.standard_resolution.url, //jshint ignore:line
                                    caption: ($scope.data.filterOutTags) ? util.filterOutHashTags(response.data[i].caption.text) : response.data[i].caption.text,
                                    link: response.data[i].link,
                                    dimensions : {
                                        height : response.data[i].images.standard_resolution.height, //jshint ignore:line
                                        width : response.data[i].images.standard_resolution.width //jshint ignore:line
                                    }
                                });
                                if($scope.data.maxPhotos === $scope.images.length){
                                    break;
                                }
                            }
                        }
                        console.log($scope.images);
                    });

                $scope.next = function () {
                    $element.children().children().children().carousel('next');
                };
                $scope.previous = function () {
                    $element.children().children().children().carousel('prev');
                };
            }
        };
    });